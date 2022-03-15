import { App } from './App';

const app = new App(8080);

app.start().catch((e) => {
    console.error(e);
});
