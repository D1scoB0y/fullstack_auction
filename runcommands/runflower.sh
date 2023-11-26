#!/bin/bash

cd server
poetry run celery -A src.celery_.celery flower --basic-auth=admin:admin
poetry shell
