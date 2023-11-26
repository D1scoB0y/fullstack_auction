#!/bin/bash

sh stop.sh

screen -dmS server "./runcommands/runserver.sh"
screen -dmS celery "./runcommands/runcelery.sh"
screen -dmS celerybeat "./runcommands/runcelerybeat.sh"
screen -dmS flower "./runcommands/runflower.sh"
screen -dmS client "./runcommands/runclient.sh"
screen -dmS redis bash -c "docker run --name redis -it --rm -p 6379:6379 redis"

screen -ls
