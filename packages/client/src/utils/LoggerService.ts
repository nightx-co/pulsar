export interface ILogger {
    log(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    debug?(message: string, ...args: any[]): void;
}

class ConsoleLogger implements ILogger {
    log(message: string, ...args: any[]) { console.log(message, ...args); }
    warn(message: string, ...args: any[]) { console.warn(message, ...args); }
    error(message: string, ...args: any[]) { console.error(message, ...args); }
    debug(message: string, ...args: any[]) { console.debug(message, ...args); }
}

export class LoggerService implements ILogger {
    private static provider : ILogger = new ConsoleLogger();

    public setProvider(customLogger: ILogger) {
        LoggerService.provider = customLogger;
    }

    public log(message: string, ...args: any[]) {
        LoggerService.provider.log(message, ...args);
    }

    public warn(message: string, ...args: any[]) {
        LoggerService.provider.warn(message, ...args);
    }

    public error(message: string, ...args: any[]) {
        LoggerService.provider.error(message, ...args);
    }

    public debug(message: string, ...args: any[]) {
        if (LoggerService.provider.debug) {
            LoggerService.provider.debug(message, ...args);
        }
    }
}