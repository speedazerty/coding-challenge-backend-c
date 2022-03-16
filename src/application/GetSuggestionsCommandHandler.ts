import { GetSuggestionsCommand } from './GetSuggestionsCommand';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants';
import { CitySuggestionsRepository } from '../domain/models/CitySuggestionsRepository';
import { CitySuggestion } from '../domain/models/CitySuggestion';
import { DistanceScoringService } from '../domain/service/DistanceScoringService';

@injectable()
export class GetSuggestionsCommandHandler {
    constructor(
        @inject(TYPES.CitySuggestionRepository)
        private readonly repository: CitySuggestionsRepository,
        @inject(TYPES.DistanceScoringService)
        private readonly distanceScoringService: DistanceScoringService
    ) {}

    public async execute(
        command: GetSuggestionsCommand
    ): Promise<CitySuggestion[]> {
        // TODO retrieve previous suggestion for the same filter from cache

        let citySuggestions = await this.repository.suggestCities({
            countryCodes: ['CA', 'US'],
            population: 5000,
            maxResults: 10,
            searchTerm: command.getSearchTerm(),
            latitude: command.getLatitude(),
            longitude: command.getLongitude(),
        });

        if (command.getLatitude() && command.getLongitude()) {
            citySuggestions =
                this.distanceScoringService.applyDistanceScoreToSuggestions(
                    citySuggestions,
                    command.getLatitude() as number,
                    command.getLongitude() as number
                );
        }

        // TODO persist to cache the result of the suggestion

        return citySuggestions;
    }
}
