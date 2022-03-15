import { CitySuggestion } from './CitySuggestion';

export interface CitySuggestionsRepository {
    suggestCities(filter: CitySuggestionFilter): Promise<CitySuggestion[]>;
}

export type CitySuggestionFilter = {
    population: number;
    countries: string[];
    searchTerm: string;
    latitude?: string;
    longitude?: string;
};
