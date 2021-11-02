from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class PlaceInfo(models.Model):
    name = models.CharField(max_length=256)
    address = models.TextField()
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    description = models.TextField()

class Folder(models.Model):
    name = models.CharField(max_length=256)
    user = models.ForeignKey(User, null=True, on_delete= models.CASCADE)

class Theme(models.Model):
    themes = [
        ('friends', 'withFriends'),
        ('family', 'withFamily'),
        ('lover', 'withLovers'),
        ('alone', 'alone'),
    ]
    theme = models.CharField(max_length=7, choices=themes)


class Transportation(models.Model):
    transportations=[
        ('car', 'car'),
        ('pub', 'publicTransportation'),
        ('wal', 'walk'),
        ('etc', 'others')
    ]
    transportation = models.CharField(max_length=3, choices=transportations)

class Season(models.Model):
    seasons=[
        ('spr', 'spring'),
        ('sum', 'summer'),
        ('aut', 'autumn'),
        ('win', 'winter')
    ]
    season = models.CharField(max_length=3, choices=seasons)
class Post(models.Model):
    title = models.CharField(max_length=256)
    author = models.ForeignKey(User, null=True, on_delete= models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    def header_date_upload_to(instance, filename):
        ymd_path = timezone.now().strftime('%Y/%m/%d') 
        uuid_name = uuid4().hex
        extension = os.path.splitext(filename)[-1].lower()
        return '/'.join([
            'header_image',
            ymd_path,
            uuid_name + extension,
        ])
    def thumbnail_date_upload_to(instance, filename):
        ymd_path = timezone.now().strftime('%Y/%m/%d') 
        uuid_name = uuid4().hex
        extension = os.path.splitext(filename)[-1].lower()
        return '/'.join([
            'thumbnail_image',
            ymd_path,
            uuid_name + extension,
        ])
    header_image = models.ImageField(upload_to=header_date_upload_to, null=True)
    thumbnail_image = models.ImageField(upload_to=thumbnail_date_upload_to, null=True)
    days= models.IntegerField(default=1)
    like_users = models.ManyToManyField(User, related_name='like_users', blank=True)
    is_shared = models.BooleanField(blank=True)
    theme = models.ManyToManyField(Theme, blank=True)
    season = models.ManyToManyField(Season, blank=True)
    location = models.CharField(max_length=256, blank=True)
    availableWithoutCar = models.BooleanField(blank=True)

    def update_date(self): 
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return self.title

class Place(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    place = models.ForeignKey(PlaceInfo, on_delete=models.CASCADE)
    description = models.TextField()
    day = models.IntegerField()



class Comment(models.Model):
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)  
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

class Like(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    post=models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at=models.DateTimeField(default=timezone.now)

class Path(models.Model):
    from_place=models.ForeignKey(Place, related_name='from_place_path', on_delete=models.CASCADE)
    to_place=models.ForeignKey(Place,related_name='to_place_path', on_delete=models.CASCADE)
    transportation=models.ForeignKey(Transportation, on_delete=models.CASCADE)