from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import User,Role,Company,User_Autorisation
from .models import Image,User_Role_Company 
from .serializers import UserSerializer,RoleAfficherSerializer,CompanyAfficherSerializer
from .serializers import ImageSerializer,User_AutorisationSerializer,User_Role_CompanysSerializer,Role_Serializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView

class UserEditByIDAPIView(generics.UpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']  # Récupère l'identifiant de l'utilisateur à partir des paramètres d'URL
        return User.objects.get(id=user_id)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()  # Crée une copie mutable des données
        if 'password' in data:
            del data['password']  # Supprime le champ password pour éviter la mise à jour du mot de passe ici
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def modifier_image(request, user_id, image_id):
    try:
        image = Image.objects.get(user_id=user_id, id=image_id)
    except Image.DoesNotExist:
        return Response({'message': 'L\'image spécifiée n\'existe pas.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ImageSerializer(image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Image modifiée avec succès.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Méthode non autorisée.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class RoleUpdateAPIView(APIView):
    def put(self, request, pk):
        try:
            role = Role.objects.get(pk=pk)
        except Role.DoesNotExist:
            return Response({"error": "Role does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = RoleAfficherSerializer(role, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CompanyUpdateAPIView(APIView):
    def put(self, request, pk):
        try:
            company = Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            return Response({"error": "Company does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CompanyAfficherSerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserAutorisationUpdateAPIView(APIView):
    def put(self, request,user_id):
        try:
            user_autorisation = User_Autorisation.objects.get(user_id=user_id)
        except User_Autorisation.DoesNotExist:
            return Response({"error": "User autorisation does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = User_AutorisationSerializer(user_autorisation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class User_Role_CompanyEditByIDAPIView(generics.UpdateAPIView):
    serializer_class = User_Role_CompanysSerializer
    def get_object(self):
        user_id = self.kwargs['user_id']
        return User_Role_Company.objects.get(user_id=user_id)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RoleAutorisationUpdateAPIView(APIView):
    def put(self, request,user_id):
        try:
            role = Role.objects.get(id=user_id)
        except User_Autorisation.DoesNotExist:
            return Response({"error": "User autorisation does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = Role_Serializer(role, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)