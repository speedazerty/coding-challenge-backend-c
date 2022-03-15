import {
    CitySuggestionFilter,
    CitySuggestionsRepository,
} from '../../../domain/models/CitySuggestionsRepository';
import { CitySuggestion } from '../../../domain/models/CitySuggestion';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../constants';
import { Pool } from 'pg';

@injectable()
export class PostgresCitySuggestionRepository
    implements CitySuggestionsRepository
{
    constructor(
        @inject(TYPES.PostgresConnectionPool) private readonly pool: Pool
    ) {}

    public async suggestCities(
        filter: CitySuggestionFilter
    ): Promise<CitySuggestion[]> {
        // TODO improve query based on ts_query
        const query =
            `select * from cities where country_code IN ( 'CA', 'US' ) ` +
            `AND population >= ${filter.population} limit ${filter.maxResults}`;
        const result = await this.pool.query<any>(query);

        return this.buildSuggestionResult(result.rows);
    }

    private buildSuggestionResult(rows: any[]): CitySuggestion[] {
        return rows.map(
            (row) =>
                new CitySuggestion({
                    name: `${row.name}, ${row.country_code}`,
                    longitude: row.longitude,
                    latitude: row.latitude,
                    score: 0,
                })
        );
    }
}
