import { Readable } from 'stream';
import { Country } from '../repository/types';

export interface UploadService {
    getFileFormat(): Readable;
    parseFile(blob: NodeJS.ReadableStream): Promise<Array<Country>>;
}
