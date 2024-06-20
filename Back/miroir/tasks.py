from celery import shared_task
from django.utils import timezone
from .models import User

@shared_task
def disable_user():
    now = timezone.now().date() 
    users = User.objects.filter(date_fin__lte=now, is_active=True)
    users.update(is_active=False)
    print('work')