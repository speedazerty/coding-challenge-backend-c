import 'reflect-metadata';
import { Container } from 'inversify';
import { App } from './App';
import { TYPES } from './constants';

const kernel = new Container();

kernel.bind<App>(TYPES.App).toDynamicValue(() => new App(8080));

export { kernel };
