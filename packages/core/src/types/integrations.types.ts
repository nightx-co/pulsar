import type { PulsarEventsIntegrations, PulsarLoggerIntegrations } from "../integrations";
import type { PulsarCore } from "../service/PulsarBaseService";

export interface IIntegration {
    module : "API" | "EVENTS" | "LOGGER";
    main: (engine : PulsarCore) => Promise<void>;
}

export interface IntegrationMap {
    LOGGER : PulsarLoggerIntegrations;
    API : any;
    EVENTS : PulsarEventsIntegrations;
}

export type IntegrationConstructor = new (access: string) => IIntegration;

export interface HostOptions {
    integrations? : Array<IntegrationConstructor | IIntegration>;
}
