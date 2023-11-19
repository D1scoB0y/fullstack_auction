#!/bin/bash

cd server
poetry run uvicorn src.main:app --reload --host "0.0.0.0"
poetry shell
