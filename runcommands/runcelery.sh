#!/bin/bash

cd server
poetry run celery -A src.celery_:celery worker --loglevel=INFO
poetry shell
