import logger from "./logger.js";
import { ReadCoilResult, ReadRegisterResult } from "modbus-serial/ModbusRTU.js";
import { PlcInputs } from "./models/PlcInputs.js";
import { PlcOutputCoils } from "./models/PlcOutputCoils.js";
import { EmsFrcFms } from "./server.js";
import { MatchMode } from "@toa-lib/models";
import ModbusRTU from "modbus-serial";
import { Socket } from "socket.io-client";

// Modbus Crash Course
// Registers: ?Counters?
// Inputs: Discrete Inputs (E-Stops)
// Coils: Outputs to PLC (Stack lights, LED Strips, Etc)

export class PlcSupport {
  private static _instance: PlcSupport;

  private modBusPort = 502;

  private client = new ModbusRTU.default();
  private plc = new PlcStatus();

  private firstConn = false;
  private lastSentHeartbeat = 0;

  private socket: Socket | null = null;

  public static getInstance(): PlcSupport {
    if (typeof PlcSupport._instance === "undefined") {
      PlcSupport._instance = new PlcSupport();
    }
    return PlcSupport._instance;
  }

  public setSocket(socket: Socket | null) {
    this.socket = socket;
  }

  public async initPlc(address: string) {
    this.plc.address = address;
    await this.client
      .connectTCP(this.plc.address, { port: this.modBusPort })
      .then(() => {
        logger.info(
          "✔ Connected to PLC at " + this.plc.address + ":" + this.modBusPort
        );
        this.sendCoils();
        this.client.setID(1);
      })
      .catch((err: any) => {
        logger.error(
          "❌ Failed to connect to PLC (" +
            this.plc.address +
            ":" +
            this.modBusPort +
            "): " +
            err
        );
        this.firstConn = true;
      });
  }

  public getEstop(station: number) {
    switch (station) {
      case 0:
        return this.plc.inputs.redEstop1;
      case 1:
        return this.plc.inputs.redEstop2;
      case 2:
        return this.plc.inputs.redEstop3;
      case 3:
        return this.plc.inputs.blueEstop1;
      case 4:
        return this.plc.inputs.blueEstop2;
      case 5:
        return this.plc.inputs.blueEstop3;
      case 99:
        return this.plc.inputs.fieldEstop;
    }
  }

  public async runPlc() {
    if (!this.client.isOpen) {
      if (this.firstConn) {
        logger.error(
          "❌ Lost connection to PLC (" +
            this.plc.address +
            ":" +
            this.modBusPort +
            "), retrying"
        );
        this.firstConn = false;
        await this.initPlc(this.plc.address);
      }
    } else {
      this.client
        .readHoldingRegisters(0, 10)
        .then((data: ReadRegisterResult) => {
          this.plc.registers = data.data;
        });

      const mState = EmsFrcFms.getInstance().matchState;
      this.plc.coils.matchStart =
        (mState === MatchMode.AUTONOMOUS ||
          mState === MatchMode.TRANSITION ||
          mState === MatchMode.TELEOPERATED ||
          mState === MatchMode.ENDGAME) &&
        !this.plc.coils.matchStart;

      this.client
        .readDiscreteInputs(0, this.plc.inputs.inputCount)
        .then((data: ReadCoilResult) => {
          this.plc.inputs.fromArray(data.data);
          if (!this.plc.inputs.equals(this.plc.oldInputs)) {
            // We have a new input, lets notify
            this.socket?.emit("frc-fms:plc-update", this.plc.inputs.toJSON());
            if (this.plc.inputs.fieldEstop) {
              logger.info("🛑 Field E-STOP Pressed! This can't be good!");
              this.socket?.emit("match:abort");
            }
            this.plc.oldInputs = new PlcInputs().fromArray(data.data);
          }
        });

      if (!this.plc.oldCoils.equals(this.plc.coils)) {
        this.plc.coils.heartbeat = true;
        this.sendCoils();
      } else if (Date.now() - this.lastSentHeartbeat > 500) {
        // If there is no update to send, send heartbeat every 500ms to prevent the plc from going into 'warning' mode
        this.client
          .writeCoil(0, true)
          .then(() => {
            this.plc.oldCoils = new PlcOutputCoils().fromCoilsArray(
              this.plc.coils.getCoilArray()
            );
            this.lastSentHeartbeat = Date.now();
          })
          .catch((err: any) => {
            logger.info("Error sending heartbeat to PLC: " + err);
          });
      }
    }
  }

  private sendCoils() {
    this.client
      .writeCoils(0, this.plc.coils.getCoilArray())
      .then(() => {
        this.plc.oldCoils = new PlcOutputCoils().fromCoilsArray(
          this.plc.coils.getCoilArray()
        );
        this.lastSentHeartbeat = Date.now();
      })
      .catch((err: any) => {
        logger.info("Error writing coils: " + err);
      });
  }

  public setStationStack(station: number, status: boolean) {
    switch (station) {
      case 0:
        this.plc.coils.redOneConn = status;
        break;
      case 1:
        this.plc.coils.redTwoConn = status;
        break;
      case 2:
        this.plc.coils.redThreeConn = status;
        break;
      case 3:
        this.plc.coils.blueOneConn = status;
        break;
      case 4:
        this.plc.coils.blueTwoConn = status;
        break;
      case 5:
        this.plc.coils.blueThreeConn = status;
        break;
    }

    this.refreshGreen();
  }

  private refreshGreen() {
    if (
      (this.plc.coils.blueOneConn || this.plc.coils.blueOneBypass) &&
      (this.plc.coils.blueTwoConn || this.plc.coils.blueTwoBypass) &&
      (this.plc.coils.blueThreeConn || this.plc.coils.blueThreeBypass) &&
      (this.plc.coils.redOneConn || this.plc.coils.redOneBypass) &&
      (this.plc.coils.redTwoConn || this.plc.coils.redTwoBypass) &&
      (this.plc.coils.redThreeConn || this.plc.coils.redThreeBypass) &&
      EmsFrcFms.getInstance().matchState === MatchMode.PRESTART
    ) {
      this.plc.coils.stackLightGreen = true;
      this.soundBuzzer();
    }
  }

  public setAllStationStacks(status: boolean) {
    this.plc.coils.redOneConn = status;
    this.plc.coils.redTwoConn = status;
    this.plc.coils.redThreeConn = status;
    this.plc.coils.blueOneConn = status;
    this.plc.coils.blueTwoConn = status;
    this.plc.coils.blueThreeConn = status;
  }

  public soundBuzzer() {
    // Sound buzzer for 1.5 seconds
    this.plc.coils.stackLightBuzzer = true;
    setTimeout(() => {
      this.plc.coils.stackLightBuzzer = false;
    }, 1500);
  }

  public setFieldStack(
    blue: number,
    red: number,
    orange: number,
    green: number,
    buzzer: number
  ) {
    this.plc.coils.stackLightBlue = blue === STACK_LIGHT_ON;
    this.plc.coils.stackLightRed = red === STACK_LIGHT_ON;
    this.plc.coils.stackLightOrange = orange === STACK_LIGHT_ON;
    this.plc.coils.stackLightGreen = green === STACK_LIGHT_ON;
    this.plc.coils.stackLightBuzzer = buzzer === STACK_LIGHT_ON;
  }

  public onPrestart() {
    this.setAllStationStacks(ROBOT_DISCONNECTED);
    this.setFieldStack(
      STACK_LIGHT_OFF,
      STACK_LIGHT_OFF,
      STACK_LIGHT_OFF,
      STACK_LIGHT_OFF,
      STACK_LIGHT_OFF
    );
  }
}

class PlcStatus {
  public isHealthy: boolean;
  public address: string;
  public inputs: PlcInputs;
  public registers: number[];
  public coils: PlcOutputCoils;
  public oldInputs: PlcInputs;
  public oldRegisters: [];
  public oldCoils: PlcOutputCoils;
  public cycleCounter: number;
  constructor() {
    this.isHealthy = false;
    this.address = "10.0.100.10";
    this.inputs = new PlcInputs();
    this.registers = [];
    this.coils = new PlcOutputCoils();
    this.oldInputs = new PlcInputs();
    this.oldRegisters = [];
    this.oldCoils = new PlcOutputCoils();
    this.cycleCounter = -1;
  }
}

export default PlcSupport.getInstance();

export const STACK_LIGHT_OFF = 0;
export const STACK_LIGHT_ON = 1;

export const ROBOT_DISCONNECTED = false;
export const ROBOT_CONNECTED = true;
