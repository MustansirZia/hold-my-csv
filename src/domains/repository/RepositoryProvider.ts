import ApiRepository from './ApiRepository';
import { Repository, UploadRepository } from './types';

export default {
    provide: (): Repository => new ApiRepository(),
    provideUploadRepository: (): UploadRepository => new ApiRepository(),
};
