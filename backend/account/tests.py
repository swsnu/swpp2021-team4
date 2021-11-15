from django.test import TestCase, Client
from django.core.files import File
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
import json
from .models import User
from route.models import Folder
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
        
        Folder.objects.create(name="test folder", user_id=user.id)

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

    def test_edit_user_info(self):
        client = Client()
        user = User.objects.get(email="swpp@swpp.com")

        response = client.delete(f'/user/{user.id}/')
        self.assertEqual(response.status_code, 405)
        
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        
        response = client.post(f'/user/{user.id}/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/user/112312/')
        self.assertEqual(response.status_code, 401)

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

        upload_file = open("./test_img.jpeg", "rb")
        post_dict = {
            'username': 'edited_username',
            'password': 'edited_password',
        }
        file_dict = {'profile_image': SimpleUploadedFile(upload_file.name, upload_file.read())}
        form = UserForm(post_dict, file_dict)
        self.assertTrue(form.is_valid())

        stranger = User.objects.create(username='stranger', email="stranger@str.com", password='stranger')
        response = client.get(f'/user/{stranger.id}/edit/')
        self.assertEqual(response.status_code, 405)

        response = client.post(f'/user/{stranger.id}/edit/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post(f'/user/{user.id}/edit/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        response = client.post(f'/user/{user.id}/edit/', data={
            'username': 'swpp',
            'email': 'swpp@swpp.com',
            'password': 'swpp',
            'profile_image': ''
            })
        self.assertEqual(response.status_code, 200)

        # response = client.put(f'/user/{user.id}/', {
        #     'profile_image': SimpleUploadedFile(upload_file.name, upload_file.read(), content_type="image/*")
        # }, format="multipart")
        # self.assertNotEqual(response.status_code, 400)
        # self.assertIn("edited_username", response.content.decode())

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
