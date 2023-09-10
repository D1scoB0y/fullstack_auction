#!/bin/bash

docker run -d -p 6379:6379 --rm --name redis_container redis

pytest -s --runslow

docker stop redis_container
