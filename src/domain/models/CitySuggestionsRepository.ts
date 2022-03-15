import { CitySuggestion } from './CitySuggestion';

export interface CitySuggestionsRepository {
    suggestCities(filter: CitySuggestionFilter): Promise<CitySuggestion[]>;
}

export type CitySuggestionFilter = {
    population: number;
    countryCodes: string[];
    maxResults: number;
    searchTerm: string;
    latitude?: string;
    longitude?: string;
};
