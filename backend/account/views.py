from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods

import json
from json.decoder import JSONDecodeError

from .models import User

@require_http_methods(["POST"])
def signup(request):
    try:
        body = request.body.decode()
        email = json.loads(body)['email']
        username = json.loads(body)['username']
        password = json.loads(body)['password']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    user = User.objects.create_user(email=email, username=username)
    user.set_password(password)
    user.save()
    response_dict = {"id": user.id, "email": user.email, "username": user.username }
    return JsonResponse(response_dict, status=201)
