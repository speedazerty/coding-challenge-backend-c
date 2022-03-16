import { kernel } from '../../src/kernel';
import { expect } from 'chai';
import request from 'supertest';
import { TYPES } from '../../src/constants';
import { App } from '../../src/App';

const app = kernel.get<App>(TYPES.App);

describe('GET /suggestions', () => {
    describe('with a non-existent city', () => {
        let response: any;
        before(async () => {
            response = await request(app.getExpressApp()).get(
                '/suggestions?q=SomeRandomCityInTheMiddleOfNowhere'
            );
        });

        it('returns a 404', () => {
            expect(response.statusCode).to.equal(404);
        });

        it('returns an empty array of suggestions', function () {
            expect(response.body.suggestions).to.be.instanceof(Array);
            expect(response.body.suggestions).to.have.length(0);
        });
    });

    describe('with a missing parameter', () => {
        it('returns a 400 when the q parameter is empty', async () => {
            const response = await request(app.getExpressApp()).get(
                '/suggestions?q='
            );
            expect(response.statusCode).to.equal(400);
            expect(response.text).to.equal(
                '{"error":"\\"q\\" is not allowed to be empty"}'
            );
        });

        it('returns a 400 when the latitude is specified but not the longitude', async () => {
            const response = await request(app.getExpressApp()).get(
                '/suggestions?q=Lond&latitude=123'
            );
            expect(response.statusCode).to.equal(400);
            expect(response.text).to.equal(
                '{"error":"Latitude and Longitude must be provided together or none of them"}'
            );
        });

        it('returns a 400 when the longitude is specified but not the latitude', async () => {
            const response = await request(app.getExpressApp()).get(
                '/suggestions?q=Lond&longitude=123'
            );
            expect(response.statusCode).to.equal(400);
            expect(response.text).to.equal(
                '{"error":"Latitude and Longitude must be provided together or none of them"}'
            );
        });
    });

    describe('with a valid city', function () {
        let response: any;
        before(async () => {
            response = await request(app.getExpressApp()).get(
                '/suggestions?q=Montreal'
            );
        });

        it('returns a 200', () => {
            expect(response.statusCode).to.equal(200);
        });

        it('returns an array of suggestions', () => {
            expect(response.body.suggestions).to.be.instanceof(Array);
            expect(response.body.suggestions).to.have.length.above(0);
        });

        describe('Validate the shape of the data being returned', function () {
            it('contains latitudes and longitudes', function () {
                expect(response.body.suggestions).to.satisfy(
                    (suggestions: any) => {
                        return suggestions.every((suggestion: any) => {
                            return suggestion.latitude && suggestion.longitude;
                        });
                    }
                );
            });

            it('contains scores', function () {
                expect(response.body.suggestions).to.satisfy(
                    (suggestions: any) => {
                        return suggestions.every(function (suggestion: any) {
                            return suggestion.latitude && suggestion.longitude;
                        });
                    }
                );
            });
        });

        it('contains a match', function () {
            expect(response.body.suggestions).to.satisfy((suggestions: any) => {
                return suggestions.some((suggestion: any) => {
                    return /montreal/i.test(suggestion.name);
                });
            });
        });
    });

    describe('with a valid city and latitude and longitude', () => {
        let response: any;
        before(async () => {
            response = await request(app.getExpressApp()).get(
                '/suggestions?q=lond&latitude=43.70011&longitude=-79.4163'
            );
        });

        it('returns a 200', () => {
            expect(response.statusCode).to.equal(200);
        });

        it('returns an array of suggestions', () => {
            expect(response.body.suggestions).to.be.instanceof(Array);
            expect(response.body.suggestions).to.have.length.above(0);
        });
    });
});
