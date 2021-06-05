import { Logger } from './types';

class ConsoleLogger implements Logger {
    logError(...errors: Array<Error>): void {
        for (const error of errors) {
            console.error(`[ERROR]`, error);
        }
    }
}

export default ConsoleLogger;
