import type { NextApiRequest, NextApiResponse } from 'next';
import BusBoy from 'busboy';
import { UploadService } from '../../../src/domains/upload/types';
import UploadServiceProvider from '../../../src/domains/upload/UploadServiceProvider';
import { CountriesService } from '../../../src/domains/countries/types';
import ConfigProvider from '../../../src/domains/config/ConfigProvider';
import CountriesServiceProvider from '../../../src/domains/countries/CountriesServiceProvider';

class UploadCountriesController {
    uploadService: UploadService;
    countriesService: CountriesService;

    constructor(uploadService: UploadService, countriesService: CountriesService) {
        this.uploadService = uploadService;
        this.countriesService = countriesService;
    }

    async get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        res.setHeader('Content-Disposition', 'attachment; filename=format.csv');
        res.setHeader('Content-Type', 'application/csv');
        this.uploadService.getFileFormat().pipe(res);
    }

    async post(req: NextApiRequest, res: NextApiResponse<{ message: string }>): Promise<void> {
        const busboy = new BusBoy({ headers: req.headers });
        busboy.on('file', async (_, file) => {
            const countries = await this.uploadService.parseFile(file);
            await this.countriesService.insertCountries(countries);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send({ message: 'OK' });
        });
        req.pipe(busboy);
    }
}
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const controller = new UploadCountriesController(
        UploadServiceProvider.provide(),
        CountriesServiceProvider.provide(ConfigProvider.provide()),
    );
    switch (req.method?.toUpperCase()) {
        case 'GET':
            controller.get(req, res);
            break;
        case 'POST':
            controller.post(req, res);
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
