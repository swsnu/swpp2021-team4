# Generated by Django 3.2.6 on 2021-11-09 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('route', '0008_alter_place_info'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='info',
            field=models.JSONField(),
        ),
    ]
