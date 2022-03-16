import { CitySuggestion } from '../../../domain/models/CitySuggestion';
import { SuggestionResultRepository } from './SuggestionResultRepository';
import { injectable } from 'inversify';
import NodeCache from 'node-cache';

@injectable()
export class InMemorySuggestionResultRepository
    implements SuggestionResultRepository
{
    private readonly cache: NodeCache;
    constructor(ttl: number) {
        this.cache = new NodeCache({ stdTTL: ttl });
    }

    public set(key: string, value: CitySuggestion[]): void {
        this.cache.set(key, value);
    }

    public get(key: string): CitySuggestion[] | undefined {
        return this.cache.get<CitySuggestion[]>(key);
    }
}
