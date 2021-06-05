import CsvUploadService from './CsvUploadService';
import { UploadService } from './types';

export default {
    provide: (): UploadService => new CsvUploadService(),
};
