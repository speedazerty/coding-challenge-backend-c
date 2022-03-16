import 'reflect-metadata';
import { App } from '../../src/App';
import chai, { expect } from 'chai';
import sinon, { SinonStubbedInstance } from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { InversifyExpressServer } from 'inversify-express-utils';

chai.use(sinonChai);
chai.use(chaiAsPromised);

let app: App;
let expressApplicationStub: any;
let httpServerStub: SinonStubbedInstance<InversifyExpressServer>;
const port = 3001;

describe('App', () => {
    beforeEach(() => {
        expressApplicationStub = {
            listen: sinon.stub(),
        };
        httpServerStub = sinon.createStubInstance(InversifyExpressServer);
        httpServerStub.build.returns(expressApplicationStub);
        app = new App(httpServerStub, port);
    });

    it('should start the application when the http server is successfully initialized with its port', async () => {
        await app.start();

        expect(httpServerStub.build).to.have.been.calledOnce;
        expect(
            expressApplicationStub.listen
        ).to.have.been.calledOnceWithExactly(3001);
    });
});
