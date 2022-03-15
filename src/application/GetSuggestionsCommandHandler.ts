import { GetSuggestionsCommand } from './GetSuggestionsCommand';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants';
import { CitySuggestionsRepository } from '../domain/models/CitySuggestionsRepository';
import { CitySuggestion } from '../domain/models/CitySuggestion';

@injectable()
export class GetSuggestionsCommandHandler {
    constructor(
        @inject(TYPES.CitySuggestionRepository)
        private readonly repository: CitySuggestionsRepository
    ) {}

    public execute(command: GetSuggestionsCommand): Promise<CitySuggestion[]> {
        return this.repository.suggestCities({
            countries: ['CA', 'US'],
            population: 5000,
            searchTerm: command.getSearchTerm(),
            latitude: command.getLatitude(),
            longitude: command.getLongitude(),
        });
    }
}
