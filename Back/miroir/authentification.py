import jwt
from rest_framework import exceptions
import datetime

def CreateAccessToken(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=3600),  # token expiration time
        'iat': datetime.datetime.utcnow()  # token creation time
    }
    token = jwt.encode(payload, 'test1', algorithm='HS256')
    return token

def CreateRefreshToken(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=3),  # Refresh token expiration time
        'iat': datetime.datetime.utcnow()  # Refresh token creation time
    }
    token = jwt.encode(payload, 'test1', algorithm='HS256')
    return token

def Decode_Token(token):
    try:
        payload = jwt.decode(token, 'test1', algorithms=["HS256"], options={"require": ["exp", "iat"]})
        return payload
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed('Token has expired')
    except jwt.InvalidTokenError:
        raise exceptions.AuthenticationFailed('Token is invalid')

