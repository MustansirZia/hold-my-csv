import { NextApiRequest, NextApiResponse } from 'next';
import { UploadService } from '../upload/types';
import { CountriesService } from '../countries/types';
import parseFile, { NextApiRequestWithFile } from '../middlewares/parseFile';
import { Logger } from '../logger/types';

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

export default UploadCountriesController;
