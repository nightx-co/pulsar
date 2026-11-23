import type { PulsarCore } from "../service/PulsarBaseService";
import type { ILogger } from "../subsys/LoggerService";
import type { IIntegration } from "../types/integrations.types";
import { config } from "../service/ConfigurationStore";

export class PulsarLoggerIntegrations implements IIntegration, ILogger {
    public readonly module = "LOGGER";

    constructor() {}

    public async main(engine : PulsarCore) {
        engine.logger.setProvider(this);
        console.log(`Log Provider Set to : [PulsarLoggerIntegrations]`);
    }

    public log(msg : string, payload?: unknown) {
        config.raw.logger?.log(msg, ...(payload !== undefined ? [payload] : []));
    }

    public warn(msg : string, payload?: unknown) {
        config.raw.logger?.warn(msg, ...(payload !== undefined ? [payload] : []));
    }

    public error(msg : string, payload?: unknown) {
        config.raw.logger?.error(msg, ...(payload !== undefined ? [payload] : []));
    }
}