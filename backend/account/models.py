import os
from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    def date_upload_to(self, filename):
        ymd_path = timezone.now().strftime('%Y/%m/%d')
        uuid_name = uuid4().hex
        extension = os.path.splitext(filename)[-1].lower()
        return '/'.join([
            'profile_image',
            ymd_path,
            uuid_name + extension,
        ])

    profile_image = models.ImageField(upload_to=date_upload_to, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def update_date(self): 
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return self.username
