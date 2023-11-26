#!/bin/bash

cd server
poetry run celery -A src.celery_:celery beat
poetry shell