#!/bin/bash
# Connects to database for development purposes
. ./data/vars.sh
docker-compose exec postgresql psql $DB_URL
