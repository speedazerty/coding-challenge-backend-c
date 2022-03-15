import { GetSuggestionsCommand } from './GetSuggestionsCommand';
import { injectable } from 'inversify';

@injectable()
export class GetSuggestionsCommandHandler {
    public execute(command: GetSuggestionsCommand): Promise<any> {
        // TODO fetch data from database
        return Promise.resolve([
            {
                name: 'London, ON, Canada',
                latitude: '42.98339',
                longitude: '-81.23304',
                score: 0.9,
            },
            {
                name: 'London, OH, USA',
                latitude: '39.88645',
                longitude: '-83.44825',
                score: 0.5,
            },
        ]);
    }
}
