from celery import Celery


celery = Celery('tasks', broker='redis://localhost:6379')

import src.user.tasks  # noqa: F401, E402
