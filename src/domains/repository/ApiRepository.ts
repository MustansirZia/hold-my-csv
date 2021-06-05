import { Data, FetchRequest, FetchResult, Repository } from './types';

class ApiRepository implements Repository {
    async fetchData<T extends Data>(request: FetchRequest<T>): Promise<FetchResult<T>> {
        const response = await fetch('/api/countries', {
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return (await response).json();
    }
    async resetData(): Promise<void> {
        const response = await fetch('/api/countries', {
            method: 'delete',
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }
    }
}

export default ApiRepository;
