from django.contrib import admin
from .models import Post, Folder, Place, Comment, Like, Path, PostInFolder, PlaceInFolder
# Register your models here.

admin.site.register(Folder)
admin.site.register(Post)
admin.site.register(Place)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Path)
admin.site.register(PostInFolder)
admin.site.register(PlaceInFolder)
