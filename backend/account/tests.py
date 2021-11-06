from django.test import TestCase, Client
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files import File
import tempfile
import json
from .models import User


class AccountTestCase(TestCase):
    def setUp(self):
        # Create two users
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
        self.failUnless(open(path), 'file not found')

    def test_signup(self):
        client = Client()
        response = client.get('/user/signup/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/user/signup/', json.dumps({
            'wrong_key': 'wrong_value'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post('/user/signup/', json.dumps({
            'email': 'new@email.com',
            'username': 'new_username',
            'password': 'new_password'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('new_username', response.content.decode())
