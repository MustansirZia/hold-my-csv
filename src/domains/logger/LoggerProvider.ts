import ConsoleLogger from './ConsoleLogger';
import { Logger } from './types';

export default {
    provide: (): Logger => new ConsoleLogger(),
};
