from django.http import HttpResponse, JsonResponse,HttpResponseBadRequest
import json
from .models import Post, Comment, Place, Like, Folder, PostInFolder, PlaceInFolder
from json.decoder import JSONDecodeError
from django.views.decorators.http import require_http_methods
from django.views.decorators.http import require_POST, require_GET
from account.models import User

from .forms import PostForm

@require_GET
def posts(request):
    postlist=[]
    for post in Post.objects.all():
        comments=[]
        for comment in post.comment_set.all():
            comments.append({'content': comment.content, 'usernmae':comment.author.username})
        postlist.append({
            'id': post.id,
            'title': post.title,
            'author_name': post.author.username,
            'author_id': post.author_id,
            'header_image': post.header_image.url if post.header_image else None,
            'thumbnail_image': post.thumbnail_image.url  if post.thumbnail_image else None, 
            'days': post.days,
            'folder_id': post.folder_id,
            'is_shared': post.is_shared,
            'theme':post.theme,
            'comment': comments,
            'season': post.season, 
            'location': post.location,
            'availableWithoutCar': post.availableWithoutCar
            })

    return JsonResponse(postlist, safe=False)

def create_place_list(places, post):
    place_list = []

    for place in places:
        new_place = Place.objects.create(
            name = place['name'],
            post = post,
            description = place['description'],
            day = place['day'],
            index = place['index'],
            folder_id = post.folder_id,
            latitude = place['latitude'],
            longitude = place['longitude'],
            homepage = place['homepage'],
            phone_number = place['phone_number'],
            address = place['address'],
            category = place['category']
        )

        place_list.append({
            'id': new_place.id,
            'name': new_place.name,
            'description': new_place.description,
            'day': new_place.day,
            'index': new_place.index,
            'folder_id': new_place.folder.id,
            'latitude': new_place.latitude,
            'longitude': new_place.longitude,
            'homepage': new_place.homepage,
            'phone_number': new_place.phone_number,
            'address': new_place.address,
            'category': new_place.category, 
        })
    
    return place_list

@require_http_methods(["POST"])
def post_create(request):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=401)
    
    form = PostForm(data=request.POST, files=request.FILES)

    if form.is_valid():
        post_title = form.cleaned_data['title']
        post_header_image = form.cleaned_data['header_image']
        post_thumbnail_image = form.cleaned_data['thumbnail_image']
        post_days=form.cleaned_data['days']
        post_folder_id = form.cleaned_data['folder_id']
        post_is_shared=form.cleaned_data['is_shared']
        post_theme=form.cleaned_data['theme']
        post_season=form.cleaned_data['season']
        post_location=form.cleaned_data['location']
        post_available_without_car=form.cleaned_data['availableWithoutCar']
        
        places = json.loads(form.cleaned_data['places'])

        post = Post.objects.create(
            title=post_title,
            author_id=logged_user_id,
            header_image=post_header_image,
            thumbnail_image=post_thumbnail_image,
            folder_id = post_folder_id,
            days=post_days, 
            is_shared=post_is_shared,
            location=post_location,
            theme=post_theme,
            season=post_season, 
            availableWithoutCar=post_available_without_car
        )

        place_list = create_place_list(places, post)

        response_dict = {
            'id': post.id,
            'title': post.title,
            'author_name': post.author.username,
            'author_id': post.author_id,
            'header_image': post.header_image.url if post.header_image else None,
            'thumbnail_image': post.thumbnail_image.url if post.thumbnail_image else None, 
            'days': post.days,
            'folder_id': post.folder.id,
            'is_shared': post.is_shared,
            'theme': post.theme,
            'season': post.season, 
            'location': post.location,
            'availableWithOutCar': post.availableWithoutCar,
            'places': place_list
        }
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=400)

@require_POST
def search(request):
    try:
        body = request.body.decode()
        keyword = json.loads(body)['keyword']
        location = json.loads(body)['location']
        season = json.loads(body)['season']
        days = json.loads(body)['days']
        theme = json.loads(body)['theme']
        transportation = json.loads(body)['transportation']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()   
    postlist=[]
    for post in Post.objects.all():
        place_exist=False
        for place in post.place_set.all().order_by('day', 'index'):
            if keyword!='' and keyword in place.description:
                place_exist=True
        if not place_exist:
            if not(keyword!='' and (keyword in post.title or keyword in post.location)) or not(location!='' and location in post.location) or not (season!='' and season==post.season) or not (days!='' and days==post.days) or not (theme!='' and theme==post.theme) or not (transportation!='' and transportation==post.transportation):
                continue
        postlist.append({
            'id': post.id,
            'title': post.title,
            'author_name': post.author.username,
            'author_id': post.author_id,
            'header_image': post.header_image.url if post.header_image else None,
            'thumbnail_image': post.thumbnail_image.url  if post.thumbnail_image else None, 
            'days': post.days,
            'folder_id': post.folder_id,
            'is_shared': post.is_shared,
            'theme':post.theme,
            'season': post.season, 
            'location': post.location,
            'availableWithoutCar': post.availableWithoutCar
            })
    return JsonResponse(postlist, safe=False)

@require_GET
def post_spec_get(request, post_id):
    post = Post.objects.get(id=post_id)
    placelist=[]

    for place in post.place_set.all().order_by('day', 'index'):
        placelist.append({
            'id':place.id,
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
        })
    
    comments=[]
    for comment in post.comment_set.all():
        comments.append({
            'content': comment.content,
            'author_id':comment.author_id
        })

    response_dict = {
        'id': post.id,
        'title': post.title,
        'author_name': post.author.username,
        'author_id': post.author.id,
        'days': post.days,
        'is_shared':post.is_shared,
        'theme':post.theme,
        'comment': comments,
        'season': post.season, 
        'location': post.location,
        'availableWithoutCar': post.availableWithoutCar,
        'folder_id': post.folder.id,
        'folder_name': post.folder.name,
        'places': placelist
        }
    return JsonResponse(response_dict, safe=False)
    
@require_http_methods(["POST", "DELETE"])
def post_spec_edit(request, post_id):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=401)
    
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:   # Wrong post id
        return HttpResponse(status=401)

    if post.author.id != logged_user_id:
        return HttpResponse(status=403)

    if request.method=='POST':
        form = PostForm(data=request.POST, files=request.FILES)

        if form.is_valid():
            post_title = form.cleaned_data['title']
            post_header_image = form.cleaned_data['header_image']
            post_thumbnail_image = form.cleaned_data['thumbnail_image']
            post_days=form.cleaned_data['days']
            post_folder_id=form.cleaned_data['folder_id']
            post_is_shared=form.cleaned_data['is_shared']
            post_theme=form.cleaned_data['theme']
            post_season=form.cleaned_data['season']
            post_location=form.cleaned_data['location']
            post_available_without_car=form.cleaned_data['availableWithoutCar']
            places = json.loads(form.cleaned_data['places'])

            Post.objects.filter(id=post_id).update(
                title=post_title,
                header_image=post_header_image,
                thumbnail_image=post_thumbnail_image,
                days=post_days, 
                folder_id=post_folder_id,
                is_shared=post_is_shared,
                location=post_location,
                theme=post_theme,
                season=post_season, 
                availableWithoutCar=post_available_without_car
            )
            post.save()
            post.update_date()

            Place.objects.filter(post_id = post_id).delete()     # 기존 Place 삭제
            
            place_list = create_place_list(places, post)

            response_dict = {
                'id': post.id,
                'title': post.title,
                'author_name': post.author.username,
                'author_id': post.author_id,
                'header_image': post.header_image.url,
                'thumbnail_image': post.thumbnail_image.url, 
                'days': post.days,
                'folder_name': post.folder.name,
                'folder_id': post.folder.id,
                'is_shared': post.is_shared,
                'theme': post.theme,
                'season': post.season, 
                'location': post.location,
                'availableWithoutCar': post.availableWithoutCar,
                'places': place_list
            }
            return JsonResponse(response_dict, safe=False)
        else:
            return HttpResponse(status=400)

    else: #delete
        post.delete()
        return HttpResponse(status=204)

@require_http_methods(["POST", "DELETE"])
def post_cart(request, post_id, fid):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=405)

    try:
        post = Post.objects.get(id=post_id)
        folder = Folder.objects.get(id=fid)
    except (Post.DoesNotExist, Folder.DoesNotExist):   # Wrong post id
        return HttpResponse(status=404)

    if request.method=='POST':
        if len(PostInFolder.objects.filter(folder=folder, post=post)) == 0:
            PostInFolder.objects.create(folder=folder, post=post)
            response_dict = {
                'folder': {
                    'id': folder.id,
                    'name': folder.name,
                }
            }
            return JsonResponse(response_dict, safe=False)
        else:
            # already carted
            return HttpResponse(status=204)
    else: #delete 
        try:
            post_in_folder = PostInFolder.objects.get(folder=folder, post=post)
        except PostInFolder.DoesNotExist:
            return HttpResponse(status=404)
        
        post_in_folder.delete()
        return HttpResponse(status=204)

@require_http_methods(["POST", "DELETE"])
def post_like(request, post_id):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=405)
    user=User.objects.get(id=logged_user_id)
    if request.method=='POST':
        post = Post.objects.get(id=post_id)
        like_list = post.like_set.filter(user_id=user.id)
        Like.objects.create(user=user, post=post)
        return JsonResponse({'postLikeUserCount': like_list.count()}, status=201)
    else : #delete
        post = Post.objects.get(id=post_id)
        post.like_set.get(user=user).delete()
        return HttpResponse(status=200)

@require_GET
def post_comment_get(request, post_id):
    post=Post.objects.get(id=post_id)
    comments=[]
    for comment in post.comment_set.all():
        comments.append({'content': comment.content, 'username':comment.author.username})
    return JsonResponse(comments, safe=False)

@require_POST
def post_comment_post(request, post_id):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=405)
    try:
        body = request.body.decode()
        content = json.loads(body)['content']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    user=User.objects.get(id=logged_user_id)
    post=Post.objects.get(id=post_id)
    comment=Comment.objects.create(post=post, content=content,  author=user)
    Comment.save(comment)

    return JsonResponse(
            {
                'id': comment.id,
                'content':comment.content,
                'username': comment.author.username,
                'created_at': comment.created_at.strftime("%Y. %m. %d. %H:%M")                
            }, status=201
        )      

@require_http_methods(["PUT", "DELETE"])
def post_comment_spec(request, post_id, cid):
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
        response_dict = {'id': search_comment.id, 'post_id': post_id, 'content':search_comment.content, 'username':search_comment.author.username}
        return JsonResponse(response_dict, status=200)
    else: #delete
        Comment.objects.get(id=cid).delete() 
        return HttpResponse(status=200)

@require_http_methods(["POST"])
def place_create(request):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=401)

    else: #POST
        try:
            body = request.body.decode()
            name = json.loads(body)['name']
            post_id = json.loads(body)['post_id']
            description = json.loads(body)['description']
            day = json.loads(body)['day']
            folder_id = json.loads(body)['folder_id']
            latitude = json.loads(body)['latitude']
            longitude = json.loads(body)['longitude']
            homepage = json.loads(body)['homepage']
            phone_number = json.loads(body)['phone_number']
            address = json.loads(body)['address']
            category = json.loads(body)['category']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        
        place = Place.objects.create(
            name=name,
            post_id=post_id,
            description=description,
            day=day,
            folder_id=folder_id,
            latitude=latitude,
            longitude=longitude,
            homepage=homepage,
            phone_number=phone_number,
            address=address,
            category=category
        )
        place.save()
        response_dict = {
            'id': place.id,
            'name':  place.name,
            'post_id': place.post_id,
            'description': place.description,
            'day':place.day,
            'folder_id': place.folder_id,
            'latitude': place.latitude,
            'longitude': place.longitude,
            'homepage': place.homepage,
            'phone_number': place.phone_number,
            'address': place.address,
            'category': place.category,
        }
        return JsonResponse(response_dict, status=201)

@require_GET
def place_spec(request, place_id):
    try:
        place = Place.objects.get(id=place_id)
    except Place.DoesNotExist:
        return HttpResponse(status=404)
    
    response_dict = {
        'id': place.id,
        'name':  place.name,
        'post_id': place.post_id,
        'description': place.description,
        'day':place.day,
        'folder_id': place.folder_id,
        'latitude': place.latitude,
        'longitude': place.longitude,
        'homepage': place.homepage,
        'phone_number': place.phone_number,
        'address': place.address,
        'category': place.category,
    }
    return JsonResponse(response_dict, safe=False)

@require_http_methods(["PUT", "DELETE"])
def place_spec_edit(request, place_id):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=401)

    try:
        place = Place.objects.get(id=place_id)
    except Place.DoesNotExist:   # Wrong place id
        return HttpResponse(status=404)

    if request.method=="PUT":
        try:
            body = request.body.decode()
            description = json.loads(body)['description']
            day = json.loads(body)['day']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        
        Place.objects.filter(id=place_id).update(
            description=description,
            day=day
        )
        place.save()

        response_dict = {
            'id': place.id,
            'name':  place.name,
            'post_id': place.post_id,
            'description': place.description,
            'day':place.day,
            'folder_id': place.folder_id,
            'latitude': place.latitude,
            'longitude': place.longitude,
            'homepage': place.homepage,
            'phone_number': place.phone_number,
            'address': place.address,
            'category': place.category,
        }
        return JsonResponse(response_dict, status=201)
    else : #delete
        place.delete()
        return HttpResponse(status=204)    

@require_http_methods(["POST", "DELETE"])
def place_cart(request, place_id, fid):
    logged_user_id=request.session.get('user', None)
    if not logged_user_id:
        return HttpResponse(status=405)

    try:
        place = Place.objects.get(id=place_id)
        folder = Folder.objects.get(id=fid)
    except (Place.DoesNotExist, Folder.DoesNotExist):   # Wrong place id
        return HttpResponse(status=404)

    if request.method=='POST':
        PlaceInFolder.objects.create(folder=folder, place=place)
        response_dict = {
            'folder': {
                'id': folder.id,
                'name': folder.name,
            }
        }
        return JsonResponse(response_dict, safe=False)
    else : #delete
        try:
            place_in_folder = PlaceInFolder.objects.get(folder=folder, place=place)
        except PlaceInFolder.DoesNotExist:
            return HttpResponse(status=404)
        
        place_in_folder.delete()
        return HttpResponse(status=204)
