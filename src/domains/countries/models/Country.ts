import mongoose from 'mongoose';
import { v4 } from 'uuid';
import toJson from '@meanie/mongoose-to-json';
import { Country as CountryType } from '../../repository/types';

const { Schema } = mongoose;

const countrySchema = new Schema<CountryType>({
    _id: { type: String, default: v4 },
    name: { type: String, required: true },
    capital: { type: String, required: true },
    president: { type: String, required: true },
    nationalLanguage: { type: String, required: true },
    population: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Adds "id" to documents using "_id" field and removes the "_id" field.
countrySchema.plugin(toJson);

const Country: mongoose.Model<CountryType> =
    mongoose.models.Countries || mongoose.model<CountryType>('Countries', countrySchema);

export default Country;
