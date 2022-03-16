import { CitySuggestion } from '../../../domain/models/CitySuggestion';

export interface SuggestionResultRepository {
    set(key: string, value: CitySuggestion[], ttl?: number): void;
    get(key: string): CitySuggestion[] | undefined;
}
