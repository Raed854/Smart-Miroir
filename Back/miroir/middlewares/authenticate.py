from rest_framework import exceptions
from rest_framework.authentication import get_authorization_header
from django.urls import resolve
from django.contrib.auth import get_user_model
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from miroir.authentification import Decode_Token

class AuthenMiddleWare:
   
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        excluded_endpoints = ['login','token_obtain_pair']
        url_name = resolve(request.path_info).url_name
        User = get_user_model()

        if url_name not in excluded_endpoints:
            auth = get_authorization_header(request).split()
            if auth and len(auth) == 2:
                token = auth[1].decode('UTF-8')
                try:
                    payload = Decode_Token(token)

                    user = User.objects.get(pk=payload['user_id'])  # Access 'user_id' instead of 'id'
                    request.user = user   # Set the authenticated user on the request
                    return self.get_response(request)
                except (ExpiredSignatureError, InvalidTokenError):
                    raise exceptions.AuthenticationFailed('Token is invalid or expired')
                except User.DoesNotExist:
                    raise exceptions.AuthenticationFailed('User not found')
            else:
                raise exceptions.AuthenticationFailed('Authorization header missing or invalid')

        # For excluded endpoints, proceed without authentication
        return self.get_response(request)
