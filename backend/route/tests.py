from django.test import TestCase, Client
from account.models import User
from route.models import Folder, Post, Comment, Place, PostInFolder, Like
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
        
        response = client.get('/post/1/share/')
        self.assertEqual(response.status_code, 401)

        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')


        response = client.get('/post/23243/share/')
        self.assertEqual(response.status_code, 404)
        
        response = client.get('/post/1/share/')
        self.assertEqual(response.status_code, 204)

        response = client.get('/post/1/share/')
        self.assertEqual(response.status_code, 400)

        place1 = Place(name="Place1", post=new_post, description="desc", folder=folder, day=1, index=1, latitude='2', longitude='2', address='road2')
        place1.save()
        place2 = Place(name="Korea", post=new_post, description="beautiful", folder=folder, day=1, index=2, latitude='1', longitude='1', address='road1')
        place2.save()
        comment=Comment(content="comment", post=new_post, author=user)
        comment.save()
        response = client.get('/post/1/')
        self.assertEqual(response.status_code, 200)


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
        places = json.dumps([
                {
                    'name': 'Place1',
                    'description': 'desc1',
                    'day': 1,
                    'index': 1,
                    'latitude': 1,
                    'longitude': 1,
                    'homepage': 'https://homepage1.com',
                    'phone_number': '010-000-0001',
                    'address': '서울 관악구 관악로 1',
                    'category': '학교'
                },
                {
                    'name': 'Place2',
                    'description': 'desc2',
                    'day': 1,
                    'index': 2,
                    'latitude': 2,
                    'longitude': 1,
                    'homepage': 'https://homepage2.com',
                    'phone_number': '010-000-0002',
                    'address': '서울 관악구 관악로 2',
                    'category': '학교'
                }
            ])
        response = client.post('/post/create/', ({
            'title':'testPost',
            'header_image': './grape.jpg',
            'thumbnail_image': './grape.jpg',
            'days':'1',
            'folder_id':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithoutCar': False,
            'places': places
            }), format='multipart')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(str(Post.objects.get(title='testPost')), 'testPost')

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
            'header_image': './grape.jpg',
            'thumbnail_image': './grape.jpg',
            'folder_id':'1', 
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

        places = json.dumps([
                {
                    'name': 'Place1',
                    'description': 'desc1',
                    'day': 1,
                    'index': 1,
                    'latitude': 1,
                    'longitude': 1,
                    'homepage': 'https://homepage1.com',
                    'phone_number': '010-000-0001',
                    'address': '서울 관악구 관악로 1',
                    'category': '학교'
                },
                {
                    'name': 'Place2',
                    'description': 'desc2',
                    'day': 1,
                    'index': 2,
                    'latitude': 2,
                    'longitude': 1,
                    'homepage': 'https://homepage2.com',
                    'phone_number': '010-000-0002',
                    'address': '서울 관악구 관악로 2',
                    'category': '학교'
                }
            ])

        response = client.post('/post/1/edit/', ({
            'title':'testPost',
            'header_image': './grape.jpg',
            'thumbnail_image': './grape.jpg',
            'days':'1',
            'folder_id':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithOutCar': False,
            'places': places
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
            'header_image': './grape.jpg',
            'thumbnail_image': './grape.jpg',
            'days':'1',
            'folder_id':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithOutCar': False
            }), format='multipart')
        self.assertEqual(response.status_code, 403)
        response = client.post('/post/1/edit/', ({
            'title':'testPost',
            'header_image': './grape.jpg',
            'thumbnail_image': './grape.jpg',
            'folder_id':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithOutCar': False,
            'places': places
            }), format='multipart')
        self.assertEqual(response.status_code, 400)
        response = client.post('/post/1/edit/', ({
            'title':'testPost',
            'header_image': './grape.jpg',
            'thumbnail_image': './grape.jpg',
            'days':'1',
            'folder_id':'1', 
            'is_shared':True, 
            'theme':'friends',
            'season':'sum',
            'location':'korea',
            'availableWithOutCar': False,
            'places': places
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

    def test_post_cart(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response = client.post('/post/1/cart/1/', content_type='application/json')
        self.assertEqual(response.status_code, 405)
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        response = client.post('/post/1/cart/1/', content_type='application/json')
        self.assertEqual(response.status_code, 404)
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        response = client.post('/post/1/cart/1/', content_type='application/json')
        self.assertEqual(response.status_code, 200)
        postInFolder=PostInFolder(post=new_post, folder=folder)
        postInFolder.save()
        response = client.post('/post/1/cart/1/', content_type='application/json')
        self.assertEqual(response.status_code, 204)

    def test_post_cart_delete(self):
        client = Client()
        response = client.delete('/post/1/cart/1/')
        self.assertEqual(response.status_code, 405)
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        response = client.delete('/post/1/cart/1/')
        self.assertEqual(response.status_code, 404)
        postInFolder=PostInFolder(post=new_post, folder=folder)
        postInFolder.save()
        response = client.delete('/post/1/cart/1/')
        self.assertEqual(response.status_code, 204)
    
    def test_like_post(self):
        client = Client()
        response = client.post('/post/1/like/')
        self.assertEqual(response.status_code, 405)
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        Like(user=user, post=new_post)
        response = client.get('/post/1/like/')
        self.assertEqual(response.status_code, 200)

    def test_like_delete(self):
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
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        like = Like(user=user, post=new_post)
        like.save()
        response = client.get('/post/1/like/')
        self.assertEqual(response.status_code, 200)

    def test_post_comment_get(self):
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
        comment=Comment(content="comment", post=new_post, author=user)
        comment.save()
        response = client.get('/post/1/comment/')
        self.assertEqual(response.status_code, 200)

    def test_comment_create(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response= client.post('/post/1/comment/create/',json.dumps({
            'content': 'test_comment'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 405)
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        response= client.post('/post/1/comment/create/',json.dumps({
           
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response= client.post('/post/1/comment/create/',json.dumps({
            'content': 'test_comment'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_post_comment_spec(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response= client.put('/post/1/comment/1/',json.dumps({
            'content': 'test_comment'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 405)
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        comment=Comment(content="comment", post=new_post, author=user)
        comment.save()
        response= client.put('/post/1/comment/1/',json.dumps({
           
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response= client.put('/post/1/comment/1/',json.dumps({
            'content': 'test_comment'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response= client.delete('/post/1/comment/1/')
        self.assertEqual(response.status_code, 200)


    def test_place_create(self):
        client = Client()
        response = client.post('/place/', {
            'name': 'kyeonjoo',
            'post_id':'1',
            'description': 'place',
            'day' : '1',
            'folder_id': '1',
            'latitude': '1',
            'longitude':'1',
            'homepage': 'www',
            'address': 'road1',
            'category' :'place1'
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
        new_post = Post(title='testTitle', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        response = client.post('/place/', json.dumps({
            'name': 'kyeonjoo',
            'post_id':'1',
            'description': 'place',
            'day' : '1',
            'folder_id': '1',
            'latitude': '1',
            'longitude':'1',
            'homepage': 'www',
            'phone_number':'000',
            'category' :'place1'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = client.post('/place/', json.dumps({
            'name': 'kyeonjoo',
            'post_id':'1',
            'description': 'place',
            'day' : '1',
            'folder_id': '1',
            'latitude': '1',
            'longitude':'1',
            'homepage': 'www',
            'phone_number':'000',
            'address': 'road1',
            'category' :'place1'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_place_spect(self):
        client= Client()
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        response = client.get('/place/1/')
        self.assertEqual(response.status_code, 404)
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        place = Place(name="Korea", post=new_post, description="beautiful", folder=folder, day=1, latitude='1', longitude='1', address='road1')
        place.save()
        response = client.get('/place/1/')
        self.assertEqual(response.status_code, 200)

    def test_place_spec_edit(self):
        client = Client()
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        response = client.put('/place/1/edit/', json.dumps({
            'name': 'kyeonjoo',
            'post_id':'1',
            'description': 'place',
            'day' : '1',
            'folder_id': '1',
            'latitude': '1',
            'longitude':'1',
            'homepage': 'www',
            'phone_number':'000',
            'address': 'road1',
            'category' :'place1'
            }), content_type='application/json')


        self.assertEqual(response.status_code, 401)
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        response = client.put('/place/1/edit/', json.dumps({
            'name': 'kyeonjoo',
            'post_id':'1',
            'description': 'place',
            'day' : '1',
            'folder_id': '1',
            'latitude': '1',
            'longitude':'1',
            'homepage': 'www',
            'phone_number':'000',
            'address': 'road1',
            'category' :'place1'
            }), content_type='application/json')
        self.assertEqual(response.status_code, 404)
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        response = client.put('/place/1/edit/', json.dumps({
            'name': 'kyeonjoo',
            'post_id':'1',
            'description': 'place',
            'day' : '1',
            'folder_id': '1',
            'latitude': '1',
            'longitude':'1',
            'homepage': 'www',
            'phone_number':'000',
            'address': 'road1',
            'category' :'place1'
            }), content_type='application/json')


        self.assertEqual(response.status_code, 404)
        place = Place(name="Korea", post=new_post, description="beautiful", folder=folder, day=1, latitude='1', longitude='1', address='road1')
        place.save()
        response = client.put('/place/1/edit/', json.dumps({
            'name': 'kyeonjoo',
            'post_id':'1',
            'folder_id': '1',
            'latitude': '1',
            'longitude':'1',
            'homepage': 'www',
            'address': 'road1',
            'category' :'place1'
            }), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        response = client.put('/place/1/edit/', json.dumps({
            'name': 'kyeonjoo',
            'post_id':'1',
            'description': 'place',
            'day' : '1',
            'folder_id': '1',
            'latitude': '1',
            'longitude':'1',
            'homepage': 'www',
            'phone_number':'000',
            'address': 'road1',
            'category' :'place1'
            }), content_type='application/json')


        self.assertEqual(response.status_code, 201)

    def test_place_delete(self):
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
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        place = Place(name="Korea", post=new_post, description="beautiful", folder=folder, day=1, latitude='1', longitude='1', address='road1')
        place.save()
        response = client.delete('/place/1/edit/')

        self.assertEqual(response.status_code, 204)

    def test_place_cart(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response = client.post('/place/1/cart/1/', content_type='application/json')
        self.assertEqual(response.status_code, 405)
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        response = client.post('/place/1/cart/1/', content_type='application/json')
        self.assertEqual(response.status_code, 404)
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', theme='friends', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./grape.jpg", "rb")), thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        place = Place(name="Korea", post=new_post, description="beautiful", folder=folder, day=1, latitude='1', longitude='1', address='road1')
        place.save()
        response = client.delete('/place/1/cart/1/')
        self.assertEqual(response.status_code, 404)

        response = client.post('/place/1/cart/1/', content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = client.delete('/place/1/cart/1/')
        self.assertEqual(response.status_code, 204)

    def test_search(self):
        client= Client()
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        
        response = client.post('/user/signin/', json.dumps({
            'email': 'swpp@swpp.com',
            'password': 'swpp'
            }), content_type='application/json')
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(
            title='testTitle', 
            author=user, 
            is_shared=False, 
            folder=folder,
            days=1,
            availableWithoutCar=False,
            location ="location",
            header_image=File(open("./grape.jpg", "rb")), 
            thumbnail_image=File(open("./grape.jpg", "rb")))
        new_post.save()
        place = Place(
            name="Korea", 
            post=new_post, 
            description="test", 
            folder=folder, 
            day=1, 
            latitude='1', 
            longitude='1', 
            address='road1')
        place.save()
        response = client.post('/post/search/', json.dumps({
            'keyword': 'test',
            'location' : 'location',
            'days': '1',
            'theme': '',
            'transportation':''
            }), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = client.post('/post/search/', json.dumps({
            'keyword': 'test',
            'location' : 'location',
            'season': 'spr',
            'days': '1',
            'theme': '',
            'transportation':''
            }), content_type='application/json')
        self.assertEqual(response.status_code, 200)        
        response = client.post('/post/search/', json.dumps({
            'keyword': '',
            'location' : '',
            'season': 'spr',
            'days': '1',
            'theme': '',
            'transportation':''
            }), content_type='application/json')
        self.assertEqual(response.status_code, 200)    