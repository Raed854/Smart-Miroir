from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'back.settings')

os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')

app = Celery('miroir')

app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

@app.task
def debug_task():
    print('Request: {0!r}'.format(debug_task.request))