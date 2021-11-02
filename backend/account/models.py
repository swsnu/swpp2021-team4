import os
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from uuid import uuid4

# Create your models here.
class Profile(models.Model):
    def date_upload_to(instance, filename):
        ymd_path = timezone.now().strftime('%Y/%m/%d') 
        uuid_name = uuid4().hex
        extension = os.path.splitext(filename)[-1].lower()
        return '/'.join([
            'profileImage',
            ymd_path,
            uuid_name + extension,
        ])

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profileImage = models.ImageField(upload_to=date_upload_to, null=True)

    def __str__(self):
        return self.user.username
    
    @receiver(post_save, sender=User) #user가 저장된 이후(post) signal을 받는 receiver
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)
        
    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

    
