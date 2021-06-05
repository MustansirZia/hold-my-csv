import parse from 'csv-parse';
import { UploadService } from './types';
import { Readable } from 'stream';
import { Country } from '../repository/types';

const columns = ['Name', 'Capital', 'President', 'National Language', 'Population'];

class CsvUploadService implements UploadService {
    getFileFormat(): Readable {
        let string = `${columns.join(',')}\n`;
        new Array(20).fill(null).forEach(() => {
            string += ',,,,\n';
        });
        return Readable.from([string]);
    }
    parseFile(blob: NodeJS.ReadableStream): Promise<Array<Country>> {
        return new Promise((resolve, reject) => {
            blob.pipe(
                parse({ columns: true }, (error, records) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(
                        records
                            .map((record: Record<string, string>) => ({
                                name: record.Name,
                                capital: record.Capital,
                                president: record.President,
                                nationalLanguage: record['National Language'],
                                population: +record.Population,
                            }))
                            .filter(
                                (country: Country) =>
                                    !!country.name &&
                                    !!country.capital &&
                                    !!country.president &&
                                    !!country.nationalLanguage &&
                                    !!country.population,
                            ),
                    );
                }),
            );
        });
    }
}

export default CsvUploadService;
