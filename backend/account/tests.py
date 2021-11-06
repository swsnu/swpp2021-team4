from django.test import TestCase, Client
from django.core.files import File
from django.utils import timezone

import json
from .models import User

class AccountTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()

    def test_user_model_str(self):
        user = User.objects.get(email="swpp@swpp.com")
        self.assertEqual(str(user), "swpp")

        old_updated_at = user.updated_at
        user.update_date()
        new_updated_at = user.updated_at
        self.assertGreater(new_updated_at, old_updated_at)

        user.profile_image = File(open("./test_img.jpeg", "rb"))
        user.save()

        path = user.profile_image.path
        self.assertIn(timezone.now().strftime('%Y/%m/%d'), path)

    def test_signup(self):
        client = Client()
        response = client.get('/user/signup/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/user/signup/', json.dumps({
            'wrong_key': 'wrong_value'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/user/signup/', json.dumps({
            'email': "swpp@swpp.com",
            'username': "swpp"
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/user/signup/', json.dumps({
            'email': 'new@email.com',
            'username': 'new_username',
            'password': 'new_password'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_signin(self):
        client = Client()
        response = client.get('/user/signin/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/user/signin/', json.dumps({
            'wrong_key': 'wrong_value'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/user/signin/', json.dumps({
            'email': 'sp@sp.com',
            'password': 'swpp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'sp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('1', response.content.decode())
        self.assertIn('swpp@swpp.com', response.content.decode())
        self.assertIn('swpp', response.content.decode())
        self.assertIn('null', response.content.decode())

        client = Client()

        user = User.objects.get(email="swpp@swpp.com")
        user.profile_image = File(open("./test_img.jpeg", "rb"))
        user.save()

        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn(user.profile_image.url, response.content.decode())
