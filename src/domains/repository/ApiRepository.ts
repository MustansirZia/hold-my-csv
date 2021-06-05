import { Data, FetchRequest, FetchResult, Repository, UploadRepository } from './types';

class ApiRepository implements Repository, UploadRepository {
    fetchData<T extends Data>(request: FetchRequest<T>): Promise<FetchResult<T>> {
        return fetch('/api/countries', {
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
        }).then((res) => res.json());
    }
    async resetData(): Promise<void> {
        await fetch('/api/countries', {
            method: 'delete',
        });
    }

    uploadFile(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export default ApiRepository;
