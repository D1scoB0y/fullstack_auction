#!/bin/bash

psql -c "CREATE DATABASE test_auction_db;" postgresql://postgres:postgres@localhost:5432/postgres
