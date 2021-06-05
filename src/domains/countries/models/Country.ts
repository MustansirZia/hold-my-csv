import mongoose from 'mongoose';
import uuid from 'node-uuid';
import toJson from 'meanie-mongoose-to-json';
import { Country as CountryType } from '../../repository/types';

const { Schema } = mongoose;

const countrySchema = new Schema<CountryType>({
    _id: { type: String, default: uuid.v4 },
    id: { type: String, default: uuid.v4 },
    name: { type: String, required: true },
    president: { type: String, required: true },
    nationalLanguage: { type: String, required: true },
    population: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Adds "id" to documents using "_id" field.
countrySchema.plugin(toJson);

const Country: mongoose.Model<CountryType> =
    mongoose.models.Countries || mongoose.model<CountryType>('Countries', countrySchema);

// Country.find()
//     // .deleteMany()
//     .then(() => {
//         Country.insertMany([
//             {
//                 name: 'India',
//                 nationalLanguage: 'Hindi',
//                 president: 'Manmohan',
//                 population: 120000,
//             },
//             {
//                 name: 'US',
//                 nationalLanguage: 'English',
//                 president: 'Joe Biden',
//                 population: 100000,
//             },
//             {
//                 name: 'UK',
//                 nationalLanguage: 'English',
//                 president: 'Boris Johnson',
//                 population: 20000,
//             },
//             {
//                 name: 'Pakistan',
//                 nationalLanguage: 'Urdu',
//                 president: 'Imran Khan',
//                 population: 10000,
//             },
//             {
//                 name: 'India',
//                 nationalLanguage: 'Hindi',
//                 president: 'Manmohan',
//                 population: 120000,
//             },
//             {
//                 name: 'US',
//                 nationalLanguage: 'English',
//                 president: 'Joe Biden',
//                 population: 100000,
//             },
//             {
//                 name: 'UK',
//                 nationalLanguage: 'English',
//                 president: 'Boris Johnson',
//                 population: 20000,
//             },
//             {
//                 name: 'Pakistan',
//                 nationalLanguage: 'Urdu',
//                 president: 'Imran Khan',
//                 population: 10000,
//             },
//             {
//                 name: 'India',
//                 nationalLanguage: 'Hindi',
//                 president: 'Manmohan',
//                 population: 120000,
//             },
//             {
//                 name: 'US',
//                 nationalLanguage: 'English',
//                 president: 'Joe Biden',
//                 population: 100000,
//             },
//             {
//                 name: 'UK',
//                 nationalLanguage: 'English',
//                 president: 'Boris Johnson',
//                 population: 20000,
//             },
//             {
//                 name: 'Pakistan',
//                 nationalLanguage: 'Urdu',
//                 president: 'Imran Khan',
//                 population: 10000,
//             },
//             {
//                 name: 'India',
//                 nationalLanguage: 'Hindi',
//                 president: 'Manmohan',
//                 population: 120000,
//             },
//             {
//                 name: 'US',
//                 nationalLanguage: 'English',
//                 president: 'Joe Biden',
//                 population: 100000,
//             },
//             {
//                 name: 'UK',
//                 nationalLanguage: 'English',
//                 president: 'Boris Johnson',
//                 population: 20000,
//             },
//             {
//                 name: 'Pakistan',
//                 nationalLanguage: 'Urdu',
//                 president: 'Imran Khan',
//                 population: 10000,
//             },
//             {
//                 name: 'India',
//                 nationalLanguage: 'Hindi',
//                 president: 'Manmohan',
//                 population: 120000,
//             },
//             {
//                 name: 'US',
//                 nationalLanguage: 'English',
//                 president: 'Joe Biden',
//                 population: 100000,
//             },
//             {
//                 name: 'UK',
//                 nationalLanguage: 'English',
//                 president: 'Boris Johnson',
//                 population: 20000,
//             },
//             {
//                 name: 'Pakistan',
//                 nationalLanguage: 'Urdu',
//                 president: 'Imran Khan',
//                 population: 10000,
//             },
//         ]);
//     });

export default Country;
