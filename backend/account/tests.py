from django.test import TestCase, Client
from django.core.files import File
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
import json
from .models import User
from .forms import UserForm

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

    def test_user_info(self):
        client = Client()
        user = User.objects.get(email="swpp@swpp.com")

        response = client.post(f'/user/{user.id}/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/user/112312/')
        self.assertEqual(response.status_code, 401)

        response = client.get(f'/user/{user.id}/')
        self.assertIn("swpp@swpp.com", response.content.decode())

        user.profile_image = File(open("./test_img.jpeg", "rb"))
        user.save()
        path = user.profile_image.path
        response = client.get(f'/user/{user.id}/')
        self.assertIn(timezone.now().strftime('%Y/%m/%d'), path)

        user.profile_image = None
        user.save()

        form_data = {'wrong_data': 'wrong'}
        form = UserForm(data=form_data)
        self.assertFalse(form.is_valid())

        # upload_file = open("./test_img.jpeg", "rb")
        # post_dict = {
        #     'username': 'edited_username',
        #     'password': 'edited_password',
        # }
        # file_dict = {'file': SimpleUploadedFile(upload_file.name, upload_file.read())}
        # form = UserForm(post_dict, file_dict)
        # self.assertTrue(form.is_valid())
