from django.test import TestCase, Client
from account.models import User
from route.models import Folder, Post, Comment, Place
from django.core.files import File
import json
class RouteTestCase(TestCase):
    def setUp(self):
        pass
        
    
    def test_get_post(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response = client.get('/user/signup/')
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        comment=Comment(content="comment", post=new_post, author=user)
        comment.save()
        response = client.get('/post/')
        self.assertEqual(response.status_code, 200)
        #path = new_post.header_image.path
        #self.assertEqual(response.status_code, 200)

    def test_get_post_other(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response = client.get('/user/signup/')
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        response = client.put('/post/')
        self.assertEqual(response.status_code, 405)


    def test_get_post_spec(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response = client.get('/user/signup/')
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        place = Place(name="Korea", post=new_post, description="beautiful", folder=folder, day=1, latitude='1', longitude='1', address='road1')
        place.save()
        comment=Comment(content="comment", post=new_post, author=user)
        comment.save()
        response = client.get('/post/1/')
        self.assertEqual(response.status_code, 200)
        #path = new_post.header_image.path
        #self.assertEqual(response.status_code, 200)


    def test_create(self):
        client = Client()
        response = client.post('/post/create/', {
            'title':''
            })
        self.assertEqual(response.status_code, 401)
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        folder = Folder(name="folder1", user=user)
        folder.save()
        response = client.post('/post/create/', ({
            'title':'testPost',
            'header_img': './grape.jpg',
            'thumbnail_img': './grape.jpg',
            'days':'1',
            'folder':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithOutCar': False
            }), format='multipart')
        self.assertEqual(response.status_code, 200)

    def test_create_form_not_valid(self):
        client = Client()
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        folder = Folder(name="folder1", user=user)
        folder.save()
        response = client.post('/post/create/', ({
            'title':'testPost',
            'header_img': './grape.jpg',
            'thumbnail_img': './grape.jpg',
            'folder':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithOutCar': False
            }), format='multipart')
        self.assertEqual(response.status_code, 400)
     

    def test_get_spec_edit(self):
        client = Client()
        response = client.post('/post/1/edit/', {
            'title':''
            })
        self.assertEqual(response.status_code, 401)
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        user2 = User.objects.create_user(email="swpp1@swpp.com", username="swpp1")
        user2.set_password("swpp")
        user2.save()
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        response = client.post('/post/1/edit/', ({
            'title':'testPost',
            'header_img': './grape.jpg',
            'thumbnail_img': './grape.jpg',
            'days':'1',
            'folder':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithOutCar': False
            }), format='multipart')
        self.assertEqual(response.status_code, 401)
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()

        folder2 = Folder(name="folder1", user=user2)
        folder2.save()
        new_post2 = Post(title='testTitle', theme='friends', author=user2, is_shared=False, folder=folder2,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post2.save()
        response = client.post('/post/2/edit/', ({
            'title':'testPost',
            'header_img': './grape.jpg',
            'thumbnail_img': './grape.jpg',
            'days':'1',
            'folder':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithOutCar': False
            }), format='multipart')
        self.assertEqual(response.status_code, 403)
        response = client.post('/post/1/edit/', ({
            'title':'testPost',
            'header_img': './grape.jpg',
            'thumbnail_img': './grape.jpg',
            'folder':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithOutCar': False
            }), format='multipart')
        self.assertEqual(response.status_code, 400)
        response = client.post('/post/1/edit/', ({
            'title':'testPost',
            'header_img': './grape.jpg',
            'thumbnail_img': './grape.jpg',
            'days':'1',
            'folder':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithOutCar': False
            }), format='multipart')
        self.assertEqual(response.status_code, 200)

    def test_post_spec_delete(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        response = client.delete('/post/1/edit/')
        self.assertEqual(response.status_code, 204)