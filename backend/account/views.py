from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_GET, require_http_methods
from django.contrib.auth import logout
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
import json
from json.decoder import JSONDecodeError
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import User
from route.models import Folder, Post, Comment, Like, PostInFolder, Place, PlaceInFolder
from .forms import UserForm


@require_http_methods(["POST"])
@ensure_csrf_cookie
def signup(request):
    try:
        body = request.body.decode()
        email = json.loads(body)['email']
        username = json.loads(body)['username']
        password = json.loads(body)['password']

        if User.objects.filter(email=email).exists():
            return HttpResponseBadRequest("이미 존재하는 이메일입니다! 다른 이메일을 사용해주세요.")
        if User.objects.filter(username=username).exists():
            return HttpResponseBadRequest("이미 존재하는 닉네임입니다! 다른 닉네임을 사용해주세요.")

        user = User.objects.create_user(email=email, username=username)
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    
    user.set_password(password)
    user.save()
    return HttpResponse(status=201)

@require_http_methods(["POST"])
@ensure_csrf_cookie
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
        return HttpResponse("없는 이메일입니다!", status=401)

    if check_password(password, user.password):
        request.session['user'] = user.id
        if user.profile_image:
            profile_image = user.profile_image.url
        else:
            profile_image = None
        folderlist = []
        for folder in user.folder_set.all():
            folderlist.append({'id':folder.id, 'name':folder.name})
        response_dict = {
            'logged_user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'profile_image': profile_image,
                'folders': folderlist
            }
        }

        return JsonResponse(response_dict, status=201)
    else:      # Wrong password
        return HttpResponse("잘못된 비밀번호입니다!", status=401)

@require_http_methods(["POST"])
@ensure_csrf_cookie
def signout(request):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=401)
    logout(request)
    return HttpResponse(status=204)

@require_http_methods(["GET"])
def user_info(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:   # Wrong email
        return HttpResponse(status=401)

    if user.profile_image:
        profile_image = user.profile_image.url
    else:
        profile_image = None

    folders = [ {
        'id': folder.id,
        'name': folder.name
    } for folder in Folder.objects.filter(user=user) ]
    
    response_dict = {
        'id': user.id,
        'email': user.email,
        'username': user.username,
        'profile_image': profile_image,
        'folders': folders
    }
    return JsonResponse(response_dict, safe=False)

@require_http_methods(["POST"])
@ensure_csrf_cookie
def edit_user_info(request, user_id):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id or logged_user_id != user_id:
        return HttpResponse(status=401)
    user = User.objects.get(id=user_id)

    form = UserForm(data=request.POST, files=request.FILES)

    if form.is_valid():
        user.username = form.cleaned_data['username']
        if form.cleaned_data['profile_image']:
            user.profile_image = form.cleaned_data['profile_image']
        user.set_password(form.cleaned_data['password'])
        user.save()
        user.update_date()

        folders = [ {
            'id': folder.id,
            'name': folder.name
        } for folder in Folder.objects.filter(user=user) ]

        response_dict = {
            'logged_user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'profile_image': user.profile_image.url if user.profile_image else '',
                'folders': folders
            }
        }
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=400)
      
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
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else '',
            'title': post.title,
            'author': post.author.username,
            'like_count': post.like_users.count(), 
            'comment_count': Comment.objects.filter(post=post).count(),
            'is_shared': post.is_shared
        } for post in Post.objects.filter(folder=folder) ]
    } for folder in folders ]

    return JsonResponse(response_dict, safe=False)

@require_http_methods(["POST"])
@ensure_csrf_cookie
def create_user_folder(request, user_id):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id or logged_user_id != user_id:
        return HttpResponse(status=401)
    
    try:
        body = request.body.decode()
        folder_name = json.loads(body)['folder_name']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    
    folder = Folder.objects.create(name=folder_name, user_id=logged_user_id)

    response_dict = {
        'folder': {
            'id': folder.id,
            'name': folder.name
        }
    }

    return JsonResponse(response_dict, safe=False)

@require_http_methods(["GET"])
@ensure_csrf_cookie
def user_folder(request, user_id, fid):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id or logged_user_id != user_id:
        return HttpResponse(status=401)

    try:
        folder = Folder.objects.get(id=fid)
    except Folder.DoesNotExist:   # Wrong id
        return HttpResponse(status=401)

    my_posts = Post.objects.filter(folder_id=fid)

    post_in_folder_ids = PostInFolder.objects.filter(folder=folder).values_list('post_id', flat=True)
    posts_in_folder = Post.objects.filter(id__in=list(post_in_folder_ids))

    place_in_folder_ids = PlaceInFolder.objects.filter(folder=folder).values_list('place_id', flat=True)
    places_in_folder = Place.objects.filter(id__in=list(place_in_folder_ids))

    response_dict = {
        'my_posts': [ {
            'id': post.id,
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else '',
            'title': post.title,
            'author_name': post.author.username,
            'author_id': post.author.id,
            'like_count': post.like_users.count(), 
            'comment_count': Comment.objects.filter(post=post).count(),
            'is_shared': post.is_shared
        } for post in my_posts ],
        'posts': [ {
            'id': post.id,
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else '',
            'title': post.title,
            'author_name': post.author.username,
            'author_id': post.author.id,
            'like_count': post.like_users.count(), 
            'comment_count': Comment.objects.filter(post=post).count(),
            'is_shared': post.is_shared
        } for post in posts_in_folder ],
        'places': [ {
            'id':place.id,
            'kakao_id': place.kakao_id if place.kakao_id else 0,
            'name':place.name,
            'post_id':place.post_id,
            'description':place.description,
            'day':place.day,
            'index': place.index,
            'folder_id':place.folder_id,
            'latitude':place.latitude,
            'longitude':place.longitude,
            'homepage':place.homepage,
            'phone_number':place.phone_number,
            'address':place.address,
            'category':place.category
        } for place in places_in_folder ]
    }

    return JsonResponse(response_dict, safe=False)

@require_http_methods(["PUT"])
@ensure_csrf_cookie
def edit_user_folder(request, user_id, fid):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id or logged_user_id != user_id:
        return HttpResponse(status=401)

    try:
        folder = Folder.objects.get(id=fid)
    except Folder.DoesNotExist:   # Wrong id
        return HttpResponse(status=401)
    
    try:
        body = request.body.decode()
        folder_name = json.loads(body)['folder_name']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()

    folder.name = folder_name
    folder.save()

    response_dict = {
        'folder': {
            'id': folder.id,
            'name': folder.name
        }
    }
    return JsonResponse(response_dict, safe=False)

@require_http_methods(["DELETE"])
@ensure_csrf_cookie
def delete_user_folder(request, user_id, fid):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id or logged_user_id != user_id:
        return HttpResponse(status=401)

    try:
        folder = Folder.objects.get(id=fid)
    except Folder.DoesNotExist:   # Wrong id
        return HttpResponse(status=401)
    
    folder.delete()

    return HttpResponse(status=204)

@require_http_methods(["GET"])
def user_likes(request, user_id):
    logged_user_id = request.session.get('user', None)
    if not logged_user_id or logged_user_id != user_id:
        return HttpResponse(status=401)

    user = User.objects.get(id=user_id)
    like_post_ids = Like.objects.filter(user=user).values_list('post_id', flat=True)
    like_posts = Post.objects.filter(id__in=list(like_post_ids))

    response_dict = {
        'liked_posts': [ {
            'id': post.id,
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else '',
            'title': post.title,
            'author_name': post.author.username,
            'author_id': post.author.id,
            'like_count': post.like_users.count(), 
            'comment_count': Comment.objects.filter(post=post).count(),
            'is_shared': post.is_shared
        } for post in like_posts ]
    }
    
    return JsonResponse(response_dict, safe=False)

@require_http_methods(["GET"])
def user_shares(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return HttpResponse(status=401)

    share_posts = Post.objects.filter(author=user, is_shared=True)

    response_dict = {
        'shared_posts': [ {
            'id': post.id,
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else '',
            'title': post.title,
            'author_name': post.author.username,
            'author_id': post.author.id,
            'like_count': post.like_users.count(), 
            'comment_count': Comment.objects.filter(post=post).count(),
            'is_shared': post.is_shared
        } for post in share_posts ]
    }
    
    return JsonResponse(response_dict, safe=False)

@require_GET
def user_posts(request, user_id):
    user = get_object_or_404(User, id=user_id)
    posts = Post.objects.filter(author=user, is_shared=True)

    response_dict = {
        'posts': [ {
            'id': post.id,
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else '',
            'title': post.title,
            'author_name': post.author.username,
            'author_id': post.author.id,
            'is_shared': post.is_shared,
            'like_counts': post.like_users.count(), 
            'comment_counts': Comment.objects.filter(post=post).count(),
            'location': post.location,
            'days': post.days,
            'season': post.season,
            'theme': post.theme,
            'availableWithoutCar': post.availableWithoutCar,
            'created_at': post.created_at.strftime("%Y-%m-%d %H:%M")
        } for post in posts ]
    }

    return JsonResponse(response_dict, safe=False)
