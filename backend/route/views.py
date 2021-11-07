from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse,HttpResponseBadRequest
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from .models import *
from json.decoder import JSONDecodeError

def posts(request):
    if request.method!='GET' and request.method!='POST':
        return HttpResponseNotAllowed(['GET', 'POST'])
    elif request.method=="GET":
        postlist=[]
        for post in Post.objects.all():
            comments=[]
            for comment in post.comment_set.all:
                comments.append({'content': comment.content, 'author_id':comment.author.id})
            postlist.append({'title': post.title, 'author_id': post.author.id, 'header_img': post.header_image.url, 'thumbnail_image': post.thumbnail_image.url, 
            'days': post.days, 'folder_id': post.folder.id, 'is_shared':post.is_shared, 'theme':post.theme, 'comment': comments, 'season': post.season, 
            'location': post.location, 'availableWithOutCar': post.availableWithoutCar})
        if len(postlist)==0:
            return HttpResponse(status=404)
        return JsonResponse(postlist, safe=False)
    else: #POST
        logged_user_id=request.session.get('user', None)
        if not logged_user_id:
            return HttpResponse(status=405)
        try:
            body = request.body.decode()
            post_title = json.loads(body)['title']
            post_header_image = json.loads(body)['header_img']
            post_thumbnail_image = json.loads(body)['thumbnail_img']
            post_days=json.loads(body)['days']
            post_folder_id=json.loads(body)['folder']
            post_is_shared=json.loads(body)['is_shared']
            post_theme=json.loads(body)['theme']
            post_season=json.loads(body)['season']
            post_location=json.loads(body)['location']
            post_availableWithOutCar=json.loads(body)['availableWithOutCar']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        folder=Folder.objects.get(id=post_folder_id)
        post = Post(title=post_title, author=request.user, folder=folder, header_image=post_header_img, thumbnail_image=post_thumbnail_img,days=post_days, 
        is_shared=post_is_shared,location=post_location, theme=post_theme, season=post_season, availableWithoutCar=post_availableWithOutCar)
        post.save()
        folder_id=''
        if post.folder:
            folder_id=post.folder.id
        response_dict = {'title': post.title, 'author_id': post.author.id, 'header_img': post.header_image, 'thumbnail_image': post.thumbnail_image, 
            'days': post.days, 'folder_id': folder_id, 'is_shared':post.is_shared, 'theme':post.theme, 'season': post.season, 
            'location': post.location, 'availableWithOutCar': post.availableWithoutCar}
        return JsonResponse(response_dict, status=201)

def post_spec(request, id):
    if request.method!='GET' and request.method!='PUT' and request.method!='DELETE':
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
    elif request.method=="GET":
        post = Post.objects.get(id=id)
        comments=[]
        for comment in post.comment_set.all:
            comments.append({'content': comment.content, 'author_id':comment.author.id})
        response_dict = {'title': post.title, 'author_id': post.author.id, 'header_img': post.header_image, 'thumbnail_image': post.thumbnail_image, 
            'days': post.days, 'folder_id': post.folder.id, 'is_shared':post.is_shared, 'theme':post.theme, 'comment': comments, 'season': post.season, 
            'location': post.location, 'availableWithOutCar': post.availableWithoutCar}
        return JsonResponse(response_dict, safe=False)
    elif request.method=='PUT':
        logged_user_id=request.session.get('user', None)
        if not logged_user_id:
            return HttpResponse(status=405)
        post = Post.objects.get(id=id)
        try:
            body = request.body.decode()
            post_title = json.loads(body)['title']
            post_header_image = json.loads(body)['header_img']
            post_thumbnail_image = json.loads(body)['thumbnail_img']
            post_days=json.loads(body)['days']
            post_folder_id=json.loads(body)['folder']
            post_is_shared=json.loads(body)['is_shared']
            post_theme=json.loads(body)['theme']
            post_season=json.loads(body)['season']
            post_location=json.loads(body)['location']
            post_availableWithOutCar=json.loads(body)['availableWithOutCar']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        post = Post(title=post_title, author=request.user, folder_id=post_folder, header_image=post_header_img, thumbnail_image=post_thumbnail_img,days=post_days, 
        is_shared=post_is_shared, location=post_location, theme=post_theme, season=post_season, availableWithoutCar=post_availableWithOutCar)
        post.save()
        response_dict = {'title': post.title, 'author_id': post.author.id, 'header_img': post.header_image, 'thumbnail_image': post.thumbnail_image, 
            'days': post.days, 'folder_id': post.folder.id, 'is_shared':post.is_shared, 'theme':post.theme, 'season': post.season, 
            'location': post.location, 'availableWithOutCar': post.availableWithoutCar}
        return JsonResponse(response_dict, status=201)
    else: #delete
        logged_user_id=request.session.get('user', None)
        if not logged_user_id:
            return HttpResponse(status=405)
        Post.objects.get(id=id).delete()
        return HttpResponse(status=200)

def post_cart(request,id, fid):
    if request.method!='POST' and request.method!='DELETE':
        return HttpResponseNotAllowed(['POST', 'DELETE'])
    else:
        post = Post.objects.get(id=id)
        try:
            body = request.body.decode()
            post_title = json.loads(body)['title']
            post_header_image = json.loads(body)['header_img']
            post_thumbnail_image = json.loads(body)['thumbnail_img']
            post_days=json.loads(body)['days']
            post_is_shared=json.loads(body)['is_shared']
            post_theme=json.loads(body)['theme']
            post_season=json.loads(body)['season']
            post_location=json.loads(body)['location']
            post_availableWithOutCar=json.loads(body)['availableWithOutCar']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        if request.method=='POST':
            post = Post(title=post_title, author=request.user, folder_id=fid, header_image=post_header_img, thumbnail_image=post_thumbnail_img,days=post_days, 
            is_shared=post_is_shared, theme=post_theme, season=post_season, location=post_location, availableWithoutCar=post_availableWithOutCar)
            post.save()
            response_dict = {'title': post.title, 'author_id': post.author.id, 'header_img': post.header_image, 'thumbnail_image': post.thumbnail_image, 
                'days': post.days, 'folder_id': post.folder.id, 'is_shared':post.is_shared, 'theme':post.theme, 'season': post.season, 
                'location': post.location, 'availableWithOutCar': post.availableWithoutCar}
            return JsonResponse(response_dict, status=201)
        elif request.method=='DELETE':
            post = Post(title=post_title, author=request.user, folder=None, header_image=post_header_img, thumbnail_image=post_thumbnail_img,days=post_days, 
            is_shared=post_is_shared, theme=post_theme, season=post_season, location=post_location, availableWithoutCar=post_availableWithOutCar)

def post_like(reqeust, id):
    if request.method!='POST' and request.method!='DELETE':
        return HttpResponseNotAllowed(['POST', 'DELETE'])
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
            return HttpResponse(status=405)
    if request.method=='POST':
        post = Post.objects.get(id=id)
        like_list = post.like_set.filter(user_id=request.user.id)
        Like.objects.create(user=request.user, post=post)
        return JsonResponse({'postLikeUserCount': post.like_set.count()}, status=201)
    elif request.method=='DELETE':
        post.like_set.get(user=request.user).delete()
        return HttpResponse(status=200)

def post_comment(request, id):
    if request.method!='GET' and request.method!='POST':
        return HttpResponseNotAllowed(['GET', 'POST'])
    elif request.method=='GET':
        post=Post.objects.get(id=id)
        comments=[]
        for comment in post.comment_set.all:
            comments.append({'content': comment.content, 'author_id':comment.author.id})
        return JsonResponse(comments, safe=False)
    else: #POST  
        logged_user_id=request.session.get('user', None)
        if not logged_user_id:
            return HttpResponse(status=405)
        try:
            body = request.body.decode()
            content = json.loads(body)['content']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        comment=Comment.objects.create(post_id=id, content=content,  author=request.user)
        Comment.save(comment)

        return JsonResponse(
            {
                'id': comment.id,
                'content':comment.content,
                'author_id': comment.author.id,
                'created_at': comment.created_at.strftime("%Y. %m. %d. %H:%M")                
            }, status=201
        )      

def post_comment_spec(request, id, cid):
    if request.method!="PUT" and request.method!="DELETE":
        return HttpResponseNotAllowed(['PUT', 'DELETE'])
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
            return HttpResponse(status=405)
    elif request.method=="PUT":
        search_comment = Comment.objects.get(id=cid)
        try:
            body = request.body.decode()
            comment_content=json.loads(body)['content']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        search_comment.content=comment_content
        search_comment.save()
        response_dict = {'id': search_comment.id, 'post_id': id, 'content':search_comment.content, 'author':search_comment.author.id}
        return JsonResponse(response_dict, status=200)
    else: #delete
        Comment.objects.get(id=cid).delete() 
        return HttpResponse(status=200)

def place_create(request):
    if not logged_user_id:
        return HttpResponse(status=405)
    elif request.method!='POST':
        return HttpResponseNotAllowed(['POST', 'DELETE'])
    else: #POST
        try:
            body = request.body.decode()
            post_id = json.loads(body)['post_id']
            place_id = json.loads(body)['place_id']
            description = json.loads(body)['description']
            day = json.loads(body)['day']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        place=Place(post_id=post_id, place_id=place_id, description=descriptoin, day=day)
        place.save()
        response_dict = {'post': place.post.id, 'place':place.place.id, 'description': place.description, 'day': place.day}
        return JsonResponse(response_dict, status=201)

def place_spec(request, id):
    if request.method!='GET' and request.method!='PUT' and request.method!='DELETE':
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
    elif request.method=="GET":
        place = Place.objects.get(id=id)
        response_dict = {'post_id': place.post.id, 'place_id': place.place.id, 'description': place.description, 'day':place.day, 'folder_id': place.folder.id}
        return JsonResponse(response_dict, safe=False)
    elif request.method=='PUT':
        logged_user_id=request.session.get('user', None)
        if not logged_user_id:
            return HttpResponse(status=405)
        post = Post.objects.get(id=id)
        try:
            body = request.body.decode()
            post_id = json.loads(body)['post_id']
            place_id = json.loads(body)['place_id']
            description = json.loads(body)['description']
            day = json.loads(body)['day']
            folder_id = json.loads(body)['folder_id']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        place = Place( post_id = post_id, place_id = place_id, folder_id = folder_id, description= description, day= day)
        place.save()
        response_dict = {'post_id': place.post.id, 'place_id': place.place.id, 'folder_id': place.folder.id, 'description': place.description, 'day':place.day}
        return JsonResponse(response_dict, status=201)
    else: #delete
        logged_user_id=request.session.get('user', None)
        if not logged_user_id:
            return HttpResponse(status=405)
        Place.objects.get(id=id).delete()
        return HttpResponse(status=200)    

def place_cart(request,id, fid):
    if request.method!='POST' and request.method!='DELETE':
        return HttpResponseNotAllowed(['POST', 'DELETE'])
    else:
        place = Place.objects.get(id=id)
        try:
            body = request.body.decode()
            post_id = json.loads(body)['post_id']
            place_id = json.loads(body)['place_id']
            description = json.loads(body)['description']
            day = json.loads(body)['day']
            folder_id = json.loads(body)['folder_id']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        if request.method=='POST':
            place = Place(post_id=post_id, place_id=place_id, description=description, folder_id=folder_id, day=day)
            place.save()
            response_dict = {'post_id': place.post.id, 'place_id': place.place.id, 'folder_id': place.folder.id, 'description': place.description, 'day':place.day}
            return JsonResponse(response_dict, status=201)
        elif request.method=='DELETE':
            place = Place(post_id=post_id, place_id=place_id, description=description, folder=None, day=day)
            return HttpResponse(status=200) 