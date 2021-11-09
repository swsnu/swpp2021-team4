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

    def test_signout(self):
        client = Client()

        response = client.post('/user/signout/')
        self.assertEqual(response.status_code, 401)

        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        
        response = client.post('/user/signout/')
        self.assertEqual(response.status_code, 204)

    def test_user_folders(self):
        client = Client()

        response = client.get('/user/1/folder/')
        self.assertEqual(response.status_code, 401)

        response = client.post('/user/1/folder/new/', json.dumps({
            'folder_name': 'new_folder'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/user/1/folder/new/', json.dumps({
            'wrong_key': 'wrong_value'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/user/1/folder/new/', json.dumps({
            'folder_name': 'new_folder'
            }), content_type='application/json')
        self.assertIn("new_folder", response.content.decode())

        response = client.get('/user/1/folder/')
        self.assertIn("new_folder", response.content.decode())

    def test_user_folder(self):
        client = Client()

        response = client.get('/user/1/folder/1/')
        self.assertEqual(response.status_code, 401)

        response = client.put('/user/1/folder/1/edit/')
        self.assertEqual(response.status_code, 401)

        response = client.delete('/user/1/folder/1/delete/')
        self.assertEqual(response.status_code, 401)

        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/user/1/folder/new/', json.dumps({
            'folder_name': 'folder1'
            }), content_type='application/json')
        self.assertIn("folder1", response.content.decode())

        response = client.get('/user/1/folder/23434/')
        self.assertEqual(response.status_code, 401)

        response = client.put('/user/1/folder/23434/edit/')
        self.assertEqual(response.status_code, 401)

        response = client.delete('/user/1/folder/23434/delete/')
        self.assertEqual(response.status_code, 401)

        response = client.get('/user/1/folder/1/')
        self.assertIn("posts", response.content.decode())

        response = client.put('/user/1/folder/1/edit/', json.dumps({
            'wrong_key': 'wrong_value'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.put('/user/1/folder/1/edit/', json.dumps({
            'folder_name': 'edited_folder'
            }), content_type='application/json')
        self.assertIn("edited_folder", response.content.decode())

        response = client.delete('/user/1/folder/1/delete/')
        self.assertEqual(response.status_code, 204)

    def test_user_likes(self):
        client = Client()

        response = client.get('/user/1/like/')
        self.assertEqual(response.status_code, 401)

        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)\
        
        response = client.get('/user/1/like/')
        self.assertIn("liked_posts", response.content.decode())

    def test_user_shares(self):
        client = Client()

        response = client.get('/user/23423/share/')
        self.assertEqual(response.status_code, 401)

        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.get('/user/1/share/')
        self.assertIn("shared_posts", response.content.decode())
