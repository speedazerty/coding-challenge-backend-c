import { kernel } from './kernel';
import { App } from './App';
import { TYPES } from './constants';

// declare controllers' metadata
import './controllers/SuggestionsController';

const app = kernel.get<App>(TYPES.App);

app.start().catch((e) => {
    console.error(e);
});
