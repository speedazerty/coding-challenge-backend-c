import {
    CitySuggestionFilter,
    CitySuggestionsRepository,
} from '../../../domain/models/CitySuggestionsRepository';
import { CitySuggestion } from '../../../domain/models/CitySuggestion';
import { injectable } from 'inversify';

@injectable()
export class PostgresCitySuggestionRepository
    implements CitySuggestionsRepository
{
    public async suggestCities(
        filter: CitySuggestionFilter
    ): Promise<CitySuggestion[]> {
        // TODO query the database and use the filter

        return Promise.resolve([
            new CitySuggestion({
                name: 'London, ON, Canada',
                latitude: '42.98339',
                longitude: '-81.23304',
                score: 0.9,
            }),
            new CitySuggestion({
                name: 'London, OH, USA',
                latitude: '39.88645',
                longitude: '-83.44825',
                score: 0.5,
            }),
        ]);
    }
}
