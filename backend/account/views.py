from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from django.contrib.auth import logout
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt

import json
from json.decoder import JSONDecodeError

from .models import User
from .forms import UserForm

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

@csrf_exempt
@require_http_methods(["GET", "PUT"])
def user_info(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:   # Wrong id
        return HttpResponse(status=401)

    if request.method == 'GET':
        if user.profile_image:
            profile_image = user.profile_image.url
        else:
            profile_image = None
        response_dict = {
            'email': user.email,
            'username': user.username,
            'profile_image': profile_image
        }
        return JsonResponse(response_dict, safe=False)
    if request.method == 'PUT':
        # TODO : logged in user check
        form = UserForm(request.POST, request.FILES)
        if form.is_valid():
            user.username = form.cleaned_data['username']
            user.profile_image = form.cleaned_data['profile_image']
            user.set_password(form.cleaned_data['password'])
            user.save()
            user.update_date()
            response_dict = {
                'email': user.email,
                'username': user.username,
                'profile_image': user.profile_image.url
            }
            return JsonResponse(response_dict, safe=False)
        else:
            print('invalid form')
            return HttpResponse(status=400)
