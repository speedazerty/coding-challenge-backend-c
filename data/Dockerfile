FROM   bitnami/postgresql:latest
EXPOSE 5432
ENV    POSTGRESQL_PASSWORD=busbud2022 \
       POSTGRESQL_DATABASE=geoname \
       DB_URL=postgres://postgres:busbud2022@localhost:5432/geoname?sslmode=disable
COPY   . ./docker-entrypoint-initdb.d
