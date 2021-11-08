from django.test import TestCase, Client
from account.models import User
from route.models import Place, Folder


class RouteTestCase(TestCase):
    def setUp(self):
        pass
        
    
    def test_get_post(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response = client.get('/user/signup/')
        response = client.get('/post/')
        self.assertEqual(response.status_code, 404)
        folder = Folder(name="folder1", user=user)
        folder.save()
        new_post = Post(title='testTitle', author=user, is_shared=False, folder=folder,availableWithoutCar=False,
        header_image=File(open("./test_img.jpeg", "rb")), thumbnail_image=File(open("./test_img.jpeg", "rb")))
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
        header_image=File(open("./test_img.jpeg", "rb")), thumbnail_image=File(open("./test_img.jpeg", "rb")))
        new_post.save()
        response = client.put('/post/')
        self.assertEqual(response.status_code, 405)
    
    def test_post_posting(self):
        user = User.objects.create_user(email="swpp@swpp.com", username="swpp")
        user.set_password("swpp")
        user.save()
        client = Client()
        response = client.get('/user/signup/')
        response = client.post('/post/', {
            'title': 'testTitle',
        })
        self.assertEqual(response.status_code, 405)

