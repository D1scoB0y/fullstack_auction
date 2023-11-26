#!/bin/bash

screen -XS server quit
screen -XS celery quit
screen -XS celerybeat quit
screen -XS flower quit
screen -XS client quit
screen -XS redis quit

docker stop redis

screen -ls
