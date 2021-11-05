from django.http import JsonResponse, HttpResponseBadRequest
from django.http.response import HttpResponseNotAllowed

import json
from json.decoder import JSONDecodeError

from .models import User

def signup(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            email = json.loads(body)['email']
            username = json.loads(body)['username']
            password = json.loads(body)['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        user = User.objects.create_user(email=email, username=username)
        user.set_password(password)
        user.save()
        response_dict = {"id": user.id, "email": user.email, "username": user.username }
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])
