#!/bin/bash
# Defines env vars required by other scripts (this script must be sourced using "source" or "." in
# order for exported variables to be accessible outside itself).
export DB_URL="postgres://postgres:busbud2022@localhost:5432/geoname?sslmode=disable"
