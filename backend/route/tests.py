from django.test import TestCase, Client
from django.core.files import File
from django.utils import timezone

import json
from account.models import User
from route.models import *


class RouteTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response = client.get('/user/signup/')

    def test_get_post(self):
        response = client.get('/api/post/')
        self.assertEqual(response.status_code, 404)
        
        new_article = Post(title='testTitle', author=user)
        new_article.save()
        
        response = client.get('/api/article/')
        self.assertEqual(response.status_code, 200)