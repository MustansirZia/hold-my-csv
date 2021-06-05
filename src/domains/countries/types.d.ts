export interface CountriesService {
    fetchCountries(request: FetchRequest<Country>): Promise<FetchResult<Country>>;
    deleteCountries(): Promise<void>;
    insertCountries(countries: Array<Country>): Promise<void>;
}
