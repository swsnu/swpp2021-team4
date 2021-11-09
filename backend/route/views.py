from django.http import HttpResponse, JsonResponse,HttpResponseBadRequest
import json
from .models import Folder, Post, Comment, Place, Like
from json.decoder import JSONDecodeError
from django.views.decorators.http import require_http_methods
from django.views.decorators.http import require_POST, require_GET

@require_GET
def posts(request):
    postlist=[]
    for post in Post.objects.all():
        comments=[]
        for comment in post.comment_set.all():
            comments.append({'content': comment.content, 'author_id':comment.author_id})
        folder_id=''
        if post.folder:
            folder_id=post.folder_id
        postlist.append({'title': post.title, 'author_id': post.author_id, 'header_img': post.header_image.url, 'thumbnail_image': post.thumbnail_image.url, 
        'days': post.days, 'folder_id': folder_id, 'is_shared':post.is_shared, 'theme':post.theme, 'comment': comments, 'season': post.season, 
        'location': post.location, 'availableWithOutCar': post.availableWithoutCar})
    if len(postlist)==0:
        return HttpResponse(status=404)
    return JsonResponse(postlist, safe=False)

@require_POST
def create(request):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=405)
    try:
        body = json.loads(request.body.decode())
        post_title = body['title']
        post_header_image = body['header_img']
        post_thumbnail_image = body['thumbnail_img']
        post_days=body['days']
        post_folder_id=body['folder']
        post_is_shared=body['is_shared']
        post_theme=body['theme']
        post_season=body['season']
        post_location=body['location']
        post_available_without_car=body['availableWithOutCar']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    folder=Folder.objects.get(id=post_folder_id)
    post = Post(title=post_title, author=request.user, folder=folder, header_image=post_header_image, thumbnail_image=post_thumbnail_image,days=post_days, 
    is_shared=post_is_shared,location=post_location, theme=post_theme, season=post_season, availableWithoutCar=post_available_without_car)
    post.save()
    folder_id=''
    if post.folder:
        folder_id=post.folder_id
    response_dict = {'title': post.title, 'author_id': post.author_id, 'header_img': post.header_image, 'thumbnail_image': post.thumbnail_image, 
        'days': post.days, 'folder_id': folder_id, 'is_shared':post.is_shared, 'theme':post.theme, 'season': post.season, 
        'location': post.location, 'availableWithOutCar': post.availableWithoutCar}
    return JsonResponse(response_dict, status=201)

@require_GET
def post_spec_get(request, id_):
    post = Post.objects.get(id=id_)
    comments=[]
    for comment in post.comment_set.all():
        comments.append({'content': comment.content, 'author_id':comment.author_id})
    response_dict = {'title': post.title, 'author_id': post.author_id, 'header_img': post.header_image, 'thumbnail_image': post.thumbnail_image, 
        'days': post.days, 'folder_id': post.folder_id, 'is_shared':post.is_shared, 'theme':post.theme, 'comment': comments, 'season': post.season, 
        'location': post.location, 'availableWithOutCar': post.availableWithoutCar}
    return JsonResponse(response_dict, safe=False)
    
@require_http_methods(["PUT", "DELETE"])
def post_spec_edit(request, id_):
    if request.method=='PUT':
        logged_user_id=request.session.get('user', None)
        if not logged_user_id:
            return HttpResponse(status=405)
        post = Post.objects.get(id=id_)
        try:
            body = json.loads(request.body.decode())
            post_title = body['title']
            post_header_image = body['header_img']
            post_thumbnail_image = body['thumbnail_img']
            post_days=body['days']
            post_folder_id=body['folder']
            post_is_shared=body['is_shared']
            post_theme=body['theme']
            post_season=body['season']
            post_location=body['location']
            post_available_without_car=body['availableWithOutCar']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        post = Post(title=post_title, author=request.user, folder_id=post_folder_id, header_image=post_header_image, thumbnail_image=post_thumbnail_image,days=post_days, 
        is_shared=post_is_shared, location=post_location, theme=post_theme, season=post_season, availableWithoutCar=post_available_without_car)
        post.save()
        response_dict = {'title': post.title, 'author_id': post.author_id, 'header_img': post.header_image, 'thumbnail_image': post.thumbnail_image, 
        'days': post.days, 'folder_id': post.folder_id, 'is_shared':post.is_shared, 'theme':post.theme, 'season': post.season, 
        'location': post.location, 'availableWithOutCar': post.availableWithoutCar}
        return JsonResponse(response_dict, status=201)
    elif request.method=='DELETE':
        logged_user_id=request.session.get('user', None)
        if not logged_user_id:
            return HttpResponse(status=405)
        Post.objects.get(id=id_).delete()
        return HttpResponse(status=200)

@require_http_methods(["POST", "DELETE"])
def post_cart(request,id_, fid):
    post = Post.objects.get(id=id_)
    try:
        body = json.loads(request.body.decode())
        post_title = body['title']
        post_header_image = body['header_img']
        post_thumbnail_image = body['thumbnail_img']
        post_days=body['days']
        post_is_shared=body['is_shared']
        post_theme=body['theme']
        post_season=body['season']
        post_location=body['location']
        post_available_without_car=body['availableWithOutCar']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    if request.method=='POST':
        post = Post(title=post_title, author=request.user, folder_id=fid, header_image=post_header_image, thumbnail_image=post_thumbnail_image,days=post_days, 
        is_shared=post_is_shared, theme=post_theme, season=post_season, location=post_location, availableWithoutCar=post_available_without_car)
        post.save()
        response_dict = {'title': post.title, 'author_id': post.author_id, 'header_img': post.header_image, 'thumbnail_image': post.thumbnail_image, 
        'days': post.days, 'folder_id': post.folder_id, 'is_shared':post.is_shared, 'theme':post.theme, 'season': post.season, 
        'location': post.location, 'availableWithOutCar': post.availableWithoutCar}
        return JsonResponse(response_dict, status=201)
    elif request.method=='DELETE':
        post = Post(title=post_title, author=request.user, folder=None, header_image=post_header_image, thumbnail_image=post_thumbnail_image,days=post_days, 
        is_shared=post_is_shared, theme=post_theme, season=post_season, location=post_location, availableWithoutCar=post_available_without_car)

@require_http_methods(["POST", "DELETE"])
def post_like(request, id_):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=405)
    if request.method=='POST':
        post = Post.objects.get(id=id_)
        like_list = post.like_set.filter(user_id=request.user.id)
        Like.objects.create(user=request.user, post=post)
        return JsonResponse({'postLikeUserCount': like_list.count()}, status=201)
    elif request.method=='DELETE':
        post = Post.objects.get(id=id_)
        post.like_set.get(user=request.user).delete()
        return HttpResponse(status=200)

@require_GET
def post_comment_get(request, id_):
    post=Post.objects.get(id=id_)
    comments=[]
    for comment in post.comment_set.all():
        comments.append({'content': comment.content, 'author_id':comment.author_id})
    return JsonResponse(comments, safe=False)

@require_POST
def post_comment_post(request, id_):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=405)
    try:
        body = request.body.decode()
        content = json.loads(body)['content']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    comment=Comment.objects.create(post_id=id_, content=content,  author=request.user)
    Comment.save(comment)

    return JsonResponse(
            {
                'id': comment.id,
                'content':comment.content,
                'author_id': comment.author_id,
                'created_at': comment.created_at.strftime("%Y. %m. %d. %H:%M")                
            }, status=201
        )      

@require_http_methods(["PUT", "DELETE"])
def post_comment_spec(request, id_, cid):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=405)
    elif request.method=="PUT":
        search_comment = Comment.objects.get(id=cid)
        try:
            body = request.body.decode()
            comment_content=json.loads(body)['content']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        search_comment.content=comment_content
        search_comment.save()
        response_dict = {'id': search_comment.id, 'post_id': id_, 'content':search_comment.content, 'author':search_comment.author_id}
        return JsonResponse(response_dict, status=200)
    else: #delete
        Comment.objects.get(id=cid).delete() 
        return HttpResponse(status=200)

@require_http_methods(["POST"])
def place_create(request):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=405)
    else: #POST
        try:
            body = json.loads(request.body.decode())
            post_id = body['post_id']
            place_id = body['place_id']
            description = body['description']
            day = body['day']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        place=Place(post_id=post_id, place_id=place_id, description=description, day=day)
        place.save()
        response_dict = {'post': place.post_id, 'place':place.place_id, 'description': place.description, 'day': place.day}
        return JsonResponse(response_dict, status=201)

@require_GET
def place_spec(request, id_):
    place = Place.objects.get(id=id_)
    response_dict = {'post_id': place.post_id, 'place_id': place.place_id, 'description': place.description, 'day':place.day, 'folder_id': place.folder_id}
    return JsonResponse(response_dict, safe=False)

@require_http_methods(["PUT", "DELETE"])
def place_spec_edit(request, id_):
    if request.method=="PUT":
        logged_user_id=request.session.get('user', None)
        if not logged_user_id:
            return HttpResponse(status=405)
        place = Place.objects.get(id=id_)
        try:
            body = request.body.decode()
            post_id = json.loads(body)['post_id']
            place_id = json.loads(body)['place_id']
            description = json.loads(body)['description']
            day = json.loads(body)['day']
            folder_id = json.loads(body)['folder_id']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        place = Place( post_id = post_id, place_id = place_id, folder_id = folder_id, description= description, day= day)
        place.save()
        response_dict = {'post_id': place.post_id, 'place_id': place.place_id, 'folder_id': place.folder_id, 'description': place.description, 'day':place.day}
        return JsonResponse(response_dict, status=201)
    elif request.method=='DELETE':
        logged_user_id=request.session.get('user', None)
        if not logged_user_id:
            return HttpResponse(status=405)
        Place.objects.get(id=id).delete()
        return HttpResponse(status=200)    

@require_http_methods(["POST", "DELETE"])
def place_cart(request,id_, fid):
    place = Place.objects.get(id=id_)
    try:
        body = json.loads(request.body.decode())
        post_id = body['post_id']
        place_id = body['place_id']
        description = body['description']
        day = body['day']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    if request.method=='POST':
        place = Place(post_id=post_id, place_id=place_id, description=description, folder_id=fid, day=day)
        place.save()
        response_dict = {'post_id': place.post_id, 'place_id': place.place_id, 'folder_id': place.folder_id, 'description': place.description, 'day':place.day}
        return JsonResponse(response_dict, status=201)
    elif request.method=='DELETE':
        place = Place(post_id=post_id, place_id=place_id, description=description, folder=None, day=day)
        return HttpResponse(status=200)