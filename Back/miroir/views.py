from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer,ImageSerializer,UserSerializerLogin   
from .serializers import CompanySerializer,RoleSerializer,PointageSerializer,Image_ProblemmeSerializer
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserAutorisationSerializer  ,   User_Role_CompanysSerializer
from .models import User,User_Autorisation,User_Role_Company
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
import random
import string
import jwt
from .authentification import CreateAccessToken,CreateRefreshToken , Decode_Token
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from .models import User,Image
import cv2
import numpy as np
import requests
from back.index import test
# methode for create users
def to_int(string):
    return np.array([float(item) for item in string.split(',')])
class UserCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            data={'image':request.data['imag']}
            print(request.data)
            serializer.save()# Le mot de passe est déjà haché grâce à la logique dans le serializer
            print(request.data['roles'])
            Autorisationserializer = UserAutorisationSerializer(data={"user":serializer.data['id'],"autorisation":request.data['roles']})
            data={'image':request.data['imag'],"user":serializer.data['id']}
            image=ImageCreateAPIView()
            image.post(data)
            if Autorisationserializer.is_valid():
                Autorisationserializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# methode for create les Image  des utilisateurs

class ImageCreateAPIView(APIView):
    def post(self,data):
        response = requests.get(data['image'])
        # Check if the request was successful
        if response.status_code == 200:
            # Read the raw bytes of the image using numpy
            image_bytes = np.frombuffer(response.content, np.uint8)
            # Decode the image bytes into a numpy array
            image = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)
            data['biometrique']=test(image)
            serializer = ImageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# methode for ramplire pointage
    
class PointageCreateAPIView(APIView):
    def post(self, request):
        serializer = PointageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
# methode for ramplir Company

class CompanyCreateAPIView(APIView):
    def post(self, request):
        serializer = CompanySerializer(data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# methode for ramplir role

class RoleCreateAPIView(APIView):
    def post(self, request):
        serializer = RoleSerializer(data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# methode for ramplire table de rolation 
    
class User_Role_CompanyCreateView(APIView):
    def post(self, request):
        serializer = User_Role_CompanysSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# methode for ramplire table de rolation ed user_autorostion
    
class User_AutorisationCreateAPIView(APIView):
    def post(self, request):
        serializer = UserAutorisationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# mothode for tester login  

class LoginView(APIView):
    def post(self, request):
        serializer = UserSerializerLogin(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user is None:
                raise AuthenticationFailed('Utilisateur introuvable ou mot de passe invalide')
            
            # Récupérer les rôles et les compagnies associés à l'utilisateur
            user_roles_companies = User_Role_Company.objects.filter(user=user)
            roles_companies_data = [{'role': urc.role.role, 
                                     'company': urc.company.namecompany,
                                     'id_company': urc.company.id} for urc in user_roles_companies]
            user_autorisations = User_Autorisation.objects.filter(user=user)
            autorisations_data = [{'autorisation': ua.autorisation} for ua in user_autorisations]

            access_token = CreateAccessToken(user)
            refresh_token = CreateRefreshToken(user)
            response = Response({
                'message': 'successful_Login',
                'status': status.HTTP_200_OK,
                #'access_token': access_token,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'date_joined': user.date_joined,
                'date_fin': user.date_fin,
                'imag': user.imag,
                'is_active': user.is_active,
                'roles_companies': roles_companies_data,
                'autorisation': autorisations_data
                
            })

            response['Access-Control-Expose-Headers'] = 'Authorization'
            response['Authorization'] = f"Bearer {access_token}"

            response.set_cookie(key='access_token', value=access_token, httponly=True)
            response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)

            payload = Decode_Token(access_token)
            response.data['authenticated'] = True if payload else False

            #return Response({'access_token': access_token})
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return errors for invalid serializer


# mothodes for send password  
def generate_random_password(length=12):
    """Generate a random password of specified length."""
    # Define characters to choose from
    characters = string.ascii_letters + string.digits 

    # Generate password
    password = ''.join(random.choice(characters) for _ in range(length))

    return password

class UserEditPass():
    serializer_class = UserSerializer
   
    @staticmethod
    def get_object(id):
        user_id = id
        return User.objects.get(id=user_id)
    
    @staticmethod    
    def put(password, id):
        instance = UserEditPass.get_object(id)
        if password:
            instance.set_password(password)  # Update the password using set_password method
            instance.save()
            return Response({'message': 'Password updated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No password provided.'}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def send_email(request, user_id):  
    if request.method == 'POST':
        try:
            
            user = get_object_or_404(User, pk=user_id)  
            password = generate_random_password() 
            subject = 'Your password'
            message = f'Your password is: {password}'
            sender_email = 'nefziraed9@gmail.com' 
            recipient_email = user.email  
            UserEditPass.put(password=password,id=user_id)
            if password:
                send_mail(
                    subject,
                    message,
                    sender_email,
                    [recipient_email],
                    fail_silently=False,
                )
                return JsonResponse({'message': 'Email sent successfully'})
            else:
                return JsonResponse({'error': 'Password not found'}, status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

# mothode for ramplir table image_problemme
class Image_ProblemmeCreateAPIView(APIView):
    def post(self, request):
        serializer = Image_ProblemmeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
