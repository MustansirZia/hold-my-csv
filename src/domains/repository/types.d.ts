export type Data = { [string]: string | number };

export type SortOrder = 'asc' | 'desc';

export type FetchRequestFilter<T extends Data> = {
    name: keyof T;
    searchString: string;
};

export type FetchRequest<T extends Data> = {
    itemsInPage: number;
    currentPage: number;
    searchString?: string;
    filters: Array<FetchRequestFilter<T>>;
    sortOrder?: SortOrder;
    sortedVia?: keyof T;
};

export type FetchResult<T extends Data> = {
    totalPages: number;
    items: Array<T>;
};

export interface Repository {
    fetchData<T extends Data>(request: FetchRequest<T>): Promise<FetchResult<T>>;
    resetData(): Promise<void>;
}

export interface UploadRepository {
    uploadFile(): Promise<void>;
}

export type Country = {
    id: string;
    name: string;
    capital: string;
    population: number;
    nationalLanguage: string;
    president: string;
};
