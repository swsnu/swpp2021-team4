from .models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields= ("title","author", "folder",  "days", "is_shared", "season", "theme", "availableWithoutCar", "header_image", "thumbnail_image")


