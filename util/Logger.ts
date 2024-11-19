// Logger.ts
class Logger {
    private static instance: Logger;

    private constructor() {}

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(message: string): void {
        console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
    }

    public info(message: string): void {
        console.info(`[INFO] ${new Date().toISOString()}: ${message}`);
    }

    public warn(message: string): void {
        console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
    }

    public error(message: string): void {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    }
}

export default Logger;