import ApiRepository from './ApiRepository';
import { Repository } from './types';

export default {
    provide: (): Repository => new ApiRepository(),
};
