import { Server, Socket } from 'socket.io';
import {
  defaultFieldOptions,
  FcsPackets,
  FieldControlUpdatePacket,
  FieldOptions,
  getFcsPackets,
  MatchSocketEvent,
  WledInitParameters
} from '@toa-lib/models';
import Room from './Room.js';
import Match from './Match.js';
import { WebSocket } from 'ws';
import {
  buildWledInitializationPacket,
  buildWledSetColorPacket
} from '../util/WLEDHelper.js';
import logger from '../util/Logger.js';

export default class FCS extends Room {
  private readonly latestFcsStatus: FieldControlUpdatePacket = {
    hubs: {},
    wleds: {}
  };
  private fcsPackets: FcsPackets = getFcsPackets(defaultFieldOptions);
  private wledSockets: Record<string, WebSocket> = {};

  public constructor(server: Server, matchRoom: Match) {
    super(server, 'fcs');

    // Connect to wled websocket servers if there are wleds
    Object.entries(this.fcsPackets.init.wleds).forEach((wled) => {
      this.initializeWled(wled[0], wled[1]);
    });

    matchRoom.localEmitter.on(MatchSocketEvent.TELEOPERATED, () => {
      this.broadcastFcsUpdate(this.fcsPackets.matchStart);
    });

    matchRoom.localEmitter.on(MatchSocketEvent.ENDGAME, () => {
      this.broadcastFcsUpdate(this.fcsPackets.endgame);
    });

    matchRoom.localEmitter.on(MatchSocketEvent.END, () => {
      this.broadcastFcsUpdate(this.fcsPackets.matchEnd);
    });

    matchRoom.localEmitter.on(MatchSocketEvent.ABORT, () => {
      this.broadcastFcsUpdate(this.fcsPackets.fieldFault);
    });

    // TODO(jan): Callback to process match details
    // matchRoom.localEmitter.on(MatchSocketEvent.UPDATE, (match: Match<any>) => {
    //   this.broadcastFcsUpdate(this.fcsPackets.???);
    // });
  }

  public initializeEvents(socket: Socket): void {
    socket.emit('fcs:init', this.fcsPackets.init);

    socket.on('fcs:setFieldOptions', (fieldOptions: FieldOptions) => {
      this.fcsPackets = getFcsPackets(fieldOptions);
    });

    socket.on('fcs:update', (update: FieldControlUpdatePacket) => {
      this.broadcastFcsUpdate(update);
    });

    socket.on('fcs:prepareField', () => {
      this.broadcastFcsUpdate(this.fcsPackets.prepareField);
    });

    socket.on('fcs:allClear', () => {
      this.broadcastFcsUpdate(this.fcsPackets.allClear);
    });

    socket.on('fcs:settings', (fieldOptions: FieldOptions) => {
      this.fcsPackets = getFcsPackets(fieldOptions);
      this.reinitializeWleds();
    });

    socket.on('fcs:digitalInputs', (packet) => {
      // TODO(jan): Update match data
    });

    socket.emit('fcs:update', this.latestFcsStatus);
  }

  private broadcastFcsUpdate(update: FieldControlUpdatePacket): void {
    this.broadcast().emit('fcs:update', update);

    // Handle wleds
    Object.entries(update.wleds).forEach((wled) => {
      try {
        this.wledSockets[wled[0]].send(buildWledSetColorPacket(wled[1]));
      } catch {
        logger.warn('Failed to send wled pattern update');
      }
    });

    // Update this.latestFcsStatus AFTER sending out the new update
    for (const hubNumber in update.hubs) {
      const hubFromThisUpdate = update.hubs[hubNumber];

      let latestFcsStatusHub = this.latestFcsStatus.hubs[hubNumber];
      if (!latestFcsStatusHub) {
        latestFcsStatusHub = {};
        this.latestFcsStatus.hubs[hubNumber] = latestFcsStatusHub;
      }

      const servosFromThisUpdate = hubFromThisUpdate.servos;
      const motorsFromThisUpdate = hubFromThisUpdate.motors;
      const digitalInputsFromThisUpdate = hubFromThisUpdate.digitalInputs;

      if (servosFromThisUpdate) {
        for (const newServoParams of servosFromThisUpdate) {
          // Remove any parameters from this.latestFcsStatus that are intended for the same servo as newServoParams.
          latestFcsStatusHub.servos =
            latestFcsStatusHub.servos?.filter(
              (oldServoParams) => oldServoParams.port != newServoParams.port
            ) ?? [];

          latestFcsStatusHub.servos!.push(newServoParams);
        }
      }

      if (motorsFromThisUpdate) {
        for (const newMotorParams of motorsFromThisUpdate) {
          // Remove any parameters from this.latestFcsStatus that are intended for the same motor as newMotorParams.
          latestFcsStatusHub.motors =
            latestFcsStatusHub.motors?.filter(
              (oldMotorParams) => oldMotorParams.port != newMotorParams.port
            ) ?? [];

          latestFcsStatusHub.motors!.push(newMotorParams);
        }
      }

      if (digitalInputsFromThisUpdate) {
        for (const newDigitalInputParams of digitalInputsFromThisUpdate) {
          // Remove any parameters from this.latestFcsStatus that are intended for the same channel as newDigitalInputParams.
          latestFcsStatusHub.digitalInputs =
            latestFcsStatusHub.digitalInputs?.filter(
              (oldDigitalInputParams) =>
                oldDigitalInputParams.channel != newDigitalInputParams.channel
            ) ?? [];

          latestFcsStatusHub.digitalInputs!.push(newDigitalInputParams);
        }
      }
    }
  }

  // TODO(jan): Handle disconnects? Regular websockets suck

  private initializeWled(wled: string, packet: WledInitParameters): void {
    // Don't initialize if address is the default empty string
    if (packet.address === '') return;

    this.wledSockets[wled] = new WebSocket(packet.address);

    // Send initialization packet
    this.wledSockets[wled].onopen = () => {
      logger.info(
        `Successfully connected to ${wled} wled websocket: ${packet.address}`
      );
      this.wledSockets[wled].send(buildWledInitializationPacket(packet));
    };

    // Don't end program if connection failed
    this.wledSockets[wled].onerror = () => {
      logger.error(
        `Failed to connect to ${wled} wled websocket: ${packet.address}`
      );
    };
  }

  private reinitializeWleds(): void {
    Object.entries(this.fcsPackets.init.wleds).forEach((wled) => {
      if (
        !this.wledSockets[wled[0]] ||
        this.wledSockets[wled[0]].url !== wled[1].address
      ) {
        // Address update
        this.initializeWled(wled[0], wled[1]);
      } else {
        try {
          this.wledSockets[wled[0]].send(
            buildWledInitializationPacket(wled[1])
          );
        } catch {
          logger.warn('Failed to send wled initialization packet');
        }
      }
    });
  }
}
