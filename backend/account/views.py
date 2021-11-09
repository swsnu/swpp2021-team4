from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest, response
from django.views.decorators.http import require_http_methods
from django.contrib.auth import logout
from django.contrib.auth.hashers import check_password

import json
from json.decoder import JSONDecodeError

from .models import User
from route.models import Folder, Post, Comment, Like

@require_http_methods(["POST"])
def signup(request):
    try:
        body = request.body.decode()
        email = json.loads(body)['email']
        username = json.loads(body)['username']
        password = json.loads(body)['password']

        user = User.objects.create_user(email=email, username=username)
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    
    user.set_password(password)
    user.save()
    return HttpResponse(status=201)

@require_http_methods(["POST"])
def signin(request):
    try:
        body = request.body.decode()
        email = json.loads(body)['email']
        password = json.loads(body)['password']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:   # Wrong email
        return HttpResponse(status=401)

    if check_password(password, user.password):
        request.session['user'] = user.id

        if user.profile_image:
            profile_image = user.profile_image.url
        else:
            profile_image = None

        response_dict = {
            'logged_user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'profile_image': profile_image
            }
        }

        return JsonResponse(response_dict, status=201)
    else:      # Wrong password
        return HttpResponse(status=401)

@require_http_methods(["POST"])
def signout(request):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=401)
    logout(request)
    return HttpResponse(status=204)

@require_http_methods(["GET"])
def user_folders(request, user_id):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id or logged_user_id != user_id:
        return HttpResponse(status=401)

    folders = Folder.objects.filter(user_id=user_id)

    response_dict = [ {
        'id': folder.id,
        'name': folder.name,
        'posts': [ {
            'id': post.id,
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else None,
            'title': post.title,
            'author': post.author.username,
            'like_count': post.like_users.count(), 
            'comment_count': Comment.objects.filter(post=post).count(),
            'is_shared': post.is_shared
        } for post in Post.objects.filter(folder=folder) ]
    } for folder in folders ]

    return JsonResponse(response_dict, safe=False)

def user_folder_detail(request, user_id, fid):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id or logged_user_id != user_id:
        return HttpResponse(status=401)

    try:
        folder = Folder.objects.get(id=fid)
    except Folder.DoesNotExist:   # Wrong id
        return HttpResponse(status=401)

    response_dict = {
        'posts': [ {
            'id': post.id,
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else None,
            'title': post.title,
            'author': post.author.username,
            'like_count': post.like_users.count(), 
            'comment_count': Comment.objects.filter(post=post).count(),
            'is_shared': post.is_shared
        } for post in Post.objects.filter(folder=folder) ]
    }

    return JsonResponse(response_dict, safe=False)

def user_likes(request, user_id):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id or logged_user_id != user_id:
        return HttpResponse(status=401)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:   # Wrong id
        return HttpResponse(status=401)
    
    like_post_ids = Like.objects.filter(user=user).values_list('post_id', flat=True)
    like_posts = Post.objects.filter(id__in=list(like_post_ids))

    response_dict = {
        'liked_posts': [ {
            'id': post.id,
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else None,
            'title': post.title,
            'author': post.author.username,
            'like_count': post.like_users.count(), 
            'comment_count': Comment.objects.filter(post=post).count(),
            'is_shared': post.is_shared
        } for post in like_posts ]
    }
    
    return JsonResponse(response_dict, safe=False)

def user_shares(request, user_id):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id or logged_user_id != user_id:
        return HttpResponse(status=401)

    share_posts = Post.objects.filter(author_id=user_id, is_shared=True)

    response_dict = {
        'shared_posts': [ {
            'id': post.id,
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else None,
            'title': post.title,
            'author': post.author.username,
            'like_count': post.like_users.count(), 
            'comment_count': Comment.objects.filter(post=post).count(),
            'is_shared': post.is_shared
        } for post in share_posts ]
    }
    
    return JsonResponse(response_dict, safe=False)
