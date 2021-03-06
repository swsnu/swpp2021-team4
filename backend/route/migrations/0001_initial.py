# Generated by Django 3.2.9 on 2021-11-20 12:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import route.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Folder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=256)),
                ('description', models.TextField()),
                ('day', models.IntegerField()),
                ('index', models.IntegerField(blank=True, null=True)),
                ('latitude', models.CharField(blank=True, max_length=256, null=True)),
                ('longitude', models.CharField(blank=True, max_length=256, null=True)),
                ('homepage', models.CharField(blank=True, max_length=256, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=256, null=True)),
                ('address', models.CharField(blank=True, max_length=256, null=True)),
                ('category', models.CharField(blank=True, max_length=256, null=True)),
                ('folder', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='route.folder')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True)),
                ('header_image', models.ImageField(blank=True, null=True, upload_to=route.models.Post.header_date_upload_to, verbose_name='Image')),
                ('thumbnail_image', models.ImageField(blank=True, null=True, upload_to=route.models.Post.thumbnail_date_upload_to, verbose_name='Image')),
                ('days', models.IntegerField(default=1)),
                ('is_shared', models.BooleanField(default=False)),
                ('season', models.CharField(blank=True, choices=[('spr', 'spring'), ('sum', 'summer'), ('aut', 'autumn'), ('win', 'winter')], max_length=10, null=True)),
                ('theme', models.CharField(blank=True, choices=[('friends', 'withFriends'), ('family', 'withFamily'), ('lover', 'withLovers'), ('alone', 'alone')], max_length=10, null=True)),
                ('location', models.CharField(blank=True, max_length=256)),
                ('availableWithoutCar', models.BooleanField(blank=True)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('folder', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='route.folder')),
                ('like_users', models.ManyToManyField(blank=True, related_name='like_posts', through='route.Like', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PostInFolder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('folder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='route.folder')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='route.post')),
            ],
        ),
        migrations.CreateModel(
            name='PlaceInFolder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('folder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='route.folder')),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='route.place')),
            ],
        ),
        migrations.AddField(
            model_name='place',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='route.post'),
        ),
        migrations.CreateModel(
            name='Path',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transportation', models.CharField(choices=[('car', 'car'), ('pub', 'publicTransportation'), ('wal', 'walk'), ('etc', 'others')], max_length=3)),
                ('from_place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_place_path', to='route.place')),
                ('to_place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_place_path', to='route.place')),
            ],
        ),
        migrations.AddField(
            model_name='like',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='route.post'),
        ),
        migrations.AddField(
            model_name='like',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='route.post')),
            ],
        ),
    ]
