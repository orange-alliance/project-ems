import { WledInitParameters, WledUpdateParameters } from "@toa-lib/models";
import logger from "./Logger.js";
import { buildWledInitializationPacket, buildWledSetColorPacket } from "./WLEDHelper.js";

export class WledController {
    private static heartbeatPeriodMs = 1000;
    private static keepAliveTimeoutMs = 2000;
    private static reconnectPeriodMs = 1000;

    private socket: WebSocket | undefined;
    private initPacket: WledInitParameters;
    private keepAlive: NodeJS.Timeout | undefined;
    private heartbeat: NodeJS.Timer | undefined;
    private reinit: NodeJS.Timeout | undefined;

    private latestState: WledUpdateParameters | undefined;

    constructor(initPacket: WledInitParameters) {
        this.initPacket = initPacket;
    }

    public initialize(initPacket?: WledInitParameters): void {
        if (initPacket) {
            this.initPacket = initPacket;

            if (this.initPacket.address === this.socket?.url) {
                try {
                    this.socket?.send(buildWledInitializationPacket(this.initPacket));
                } catch {
                    logger.error(`Failed to reinitialize ${this.initPacket.address}`);
                }
                return;
            }
        }

        clearInterval(this.heartbeat);
        clearTimeout(this.reinit);
        clearTimeout(this.keepAlive);

        if (this.initPacket.address === '') return;

        try {
            this.socket = new WebSocket(this.initPacket.address);
        } catch {
            logger.error(`Failed to create websocket for ${this.initPacket.address}`);
            return;
        }

        this.socket.onopen = () => {
            logger.info(`Connected to ${this.initPacket.address}`);
            try {
                this.socket?.send(buildWledInitializationPacket(this.initPacket));
            } catch {
                logger.error(`Failed to initialize ${this.initPacket.address}`);
            }
            this.startHeartbeat();

            if (this.latestState) {
                this.update(this.latestState);
            }
        };

        this.socket.onerror = () => {
            logger.error(`Failed to connect to ${this.initPacket.address}`);

            // Attempt to reconnect
            this.reinit = setTimeout(() => {
                this.initialize();
            }, WledController.reconnectPeriodMs);
        };

        this.socket.onmessage = () => {
            clearTimeout(this.keepAlive);
        };
    }

    private startHeartbeat(): void {
        this.heartbeat = setInterval(() => {
            // Send dummy message that the controller will respond to
            try {
                this.socket?.send('{}');
            } catch {
                logger.error(`Failed to send heartbeat to ${this.initPacket.address}`);
            }

            // Start keepalive
            this.keepAlive = setTimeout(() => {
                logger.info(`Disconnected from ${this.initPacket.address}`);

                // If the keepalive is not cleared in time attempt to reinitialize
                this.initialize();
            }, WledController.keepAliveTimeoutMs);
        }, WledController.heartbeatPeriodMs);
    }

    public update(update: WledUpdateParameters): void {
        try {
            this.socket?.send(buildWledSetColorPacket(update));
        } catch {
            logger.error(`Failed to send pattern to ${this.initPacket.address}`);
        }

        if (!this.latestState) {
            this.latestState = update;
        }
        for (const newPattern of update.patterns) {
            this.latestState.patterns =
                this.latestState.patterns.filter(
                    (oldPattern) => oldPattern.segment != newPattern.segment
                ) ?? [];

            this.latestState.patterns!.push(newPattern);
        }
    }
}
