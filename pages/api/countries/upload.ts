import type { NextApiRequest, NextApiResponse } from 'next';
import { UploadService } from '../../../src/domains/upload/types';
import UploadServiceProvider from '../../../src/domains/upload/UploadServiceProvider';
import { CountriesService } from '../../../src/domains/countries/types';
import ConfigProvider from '../../../src/domains/config/ConfigProvider';
import CountriesServiceProvider from '../../../src/domains/countries/CountriesServiceProvider';
import parseFile, { NextApiRequestWithFile } from '../../../src/domains/middlewares/parseFile';
import { Logger } from '../../../src/domains/logger/types';
import LoggerProvider from '../../../src/domains/logger/LoggerProvider';

class UploadCountriesController {
    private uploadService: UploadService;
    private countriesService: CountriesService;
    private logger: Logger;

    constructor(uploadService: UploadService, countriesService: CountriesService, logger: Logger) {
        this.uploadService = uploadService;
        this.countriesService = countriesService;
        this.logger = logger;
    }

    async get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        res.setHeader('Content-Disposition', 'attachment; filename=format.csv');
        res.setHeader('Content-Type', 'application/csv');
        this.uploadService.getFileFormat().pipe(res);
    }

    async post(req: NextApiRequestWithFile, res: NextApiResponse<{ message: string }>): Promise<void> {
        try {
            const valid = await parseFile(req, res);
            if (!valid || !req.file) {
                return;
            }
            const countries = await this.uploadService.parseFile(req.file);
            await this.countriesService.insertCountries(countries);
            res.status(200).json({ message: 'OK' });
        } catch (error) {
            this.logger.logError(error);
            res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
}
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const controller = new UploadCountriesController(
        UploadServiceProvider.provide(),
        CountriesServiceProvider.provide(ConfigProvider.provide(), LoggerProvider.provide()),
        LoggerProvider.provide(),
    );
    switch (req.method?.toUpperCase()) {
        case 'GET':
            await controller.get(req, res);
            break;
        case 'POST':
            await controller.post(req, res);
            break;
        default:
            res.status(405).send('METHOD NOT ALLOWED');
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};
