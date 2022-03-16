import {
    CitySuggestionFilter,
    CitySuggestionsRepository,
} from '../../../domain/models/CitySuggestionsRepository';
import { CitySuggestion } from '../../../domain/models/CitySuggestion';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../constants';
import { Pool } from 'pg';
import format from 'pg-format';

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
        const query = format(
            'select *, ((%s / cast(length(ascii_name) as decimal) ))  as score ' +
                'from cities where country_code IN (%L) ' +
                "AND population >= %s AND LOWER(ascii_name) LIKE '%%%s%%' order by score desc, ascii_name asc limit %s",
            filter.searchTerm.length,
            filter.countryCodes,
            filter.population,
            filter.searchTerm,
            filter.maxResults
        );

        const result = await this.pool.query<any>(query);

        return this.buildSuggestionResult(result.rows);
    }

    private getCountryCodeQueryFilter(countryCodes: string[]): string {
        return countryCodes.reduce((acc, val, index) => {
            acc += `'${val}'`;
            if (index !== countryCodes.length - 1) {
                acc += ',';
            }
            return acc;
        }, '');
    }

    private buildSuggestionResult(rows: any[]): CitySuggestion[] {
        return rows.map(
            (row) =>
                new CitySuggestion({
                    name: `${row.ascii_name}, ${this.getStateCode(row)}, ${
                        row.country_code
                    }`,
                    longitude: row.longitude,
                    latitude: row.latitude,
                    score: Number.parseFloat(row.score),
                })
        );
    }

    private getStateCode(row: any): string {
        if (row.country_code === 'CA') {
            const admin1: string = row.admin1;
            return (CanadaAdmin1ToStateCode as any)[admin1];
        }
        return row.admin1;
    }
}

// Hard-coded list of canadian state codes base on Geoname data
const CanadaAdmin1ToStateCode = {
    '01': 'AB',
    '02': 'BC',
    '03': 'MB',
    '04': 'NB',
    '05': 'NL',
    '07': 'NS',
    '08': 'ON',
    '09': 'PE',
    '10': 'QC',
    '11': 'SK',
    '12': 'YT',
    '13': 'NT',
    '14': 'NU',
};
