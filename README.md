# Busbud Coding Challenge

## Getting Started

### Prerequisites

- `Docker` with `Docker Compose`

### Start the application

You simply need to execute the following command to start the service:

```bash
docker-compose up city-suggestion-service
```

This command will start up the NodeJS app along with a PostgreSQL database.
Once it started successfully you should see the output: 

```bash
Server running at http://127.0.0.1:8080/suggestions
```

You can now simply try and play with this API.
Suggested test endpoint : `http://localhost:8080/suggestions?q=lond&latitude=43.70011&longitude=-79.4163`

You should be getting a response which looks like this
```text
{
  "suggestions": [
    {
      "name": "London, KY, US",
      "latitude": 37.12898,
      "longitude": -84.08326,
      "score": 1
    },
    ...
  ]
}
```

### Running the tests

The test should be run from inside the docker container
```bash
docker-compose exec city-suggestion-service bash
npm run test:unit && npm run test:functional
```

For some reason the command `npm run test` displays some NPM warnings so I suggest to stick for now the 
above command.

I have not written all my unit tests, although I added at least one so you can see how I would write them.

### Accessing the app on Heroku

The application has been deployed on Heroku and is accessible with `https://enigmatic-meadow-44068.herokuapp.com/suggestions?q=london`.

A provisioned Postgres is attached to the app as well.

### Scoring mechanism

The base score of the suggestion is depends on the number of characters of the search term against 
the number of matching characters of the results.

If coordinates are specified, I calculate a distance score. 
This distance score simply decrease the base score depending on how far the 
specified position is from each suggested cities. Then, it is this distance score 
which is used as the final score.  

### Performance

The city suggestions are fetched from PostgreSQL which contain appropriate indexes.
All results from PostgreSQL are cached for 15min in memory for improving performance.
For a production application, I would suggest using a distributed cache service such as ElasticCache (AWS).

### What I have not done but would suggest doing

- Add proper logging (e.g. tslog)
- Add more unit tests / functional tests
- Implement a graceful shutdown (if we were to use containerized apps)
