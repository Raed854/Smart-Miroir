# views.py
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Image , Company , Role,User_Role_Company,Pointage,Image_Problemme
from .models import User,User_Autorisation
from .serializers import ImageSerializer, CompanyAfficherSerializer ,RoleAfficherSerializer,UserAfficheSerializer,Image_ProblemmeSerializer
from .serializers import UserSerializer,User_Role_CompanySerializer,PointageSerializer,PointagesSerializer
from .serializers import User_AutorisationSerializer
from django.contrib.auth.hashers import make_password

# methode pour afficher les Image  des utilisateurs

class ImageView(generics.ListAPIView):
    serializer_class = ImageSerializer

    def get_queryset(self):
        # Filtrer les utilisateurs actifs
        active_users = User.objects.filter(is_active=True)
        print(active_users)
        # Récupérer les images associées aux utilisateurs actifs
        return Image.objects.filter(user__in=active_users)
    
# methode pour afficher les utilisateur
    
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# methode pour afficher les  Admin  by company     

class UserByCompanyView(generics.ListAPIView):
    serializer_class = UserAfficheSerializer

    def get_queryset(self):
        namecompany = self.kwargs['namecompany']
        return User_Role_Company.objects.filter(company__namecompany=namecompany)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['company_name'] = self.kwargs['namecompany']
        return context
    
# methode pour afficher company
    
class CompanyView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanyAfficherSerializer
    
# methode pour afficher Image Problemme
class Image_problemmeView(generics.ListAPIView):
    queryset = Image_Problemme.objects.all()
    serializer_class = Image_ProblemmeSerializer
# methode pour afficher role
    
class RoleView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class =RoleAfficherSerializer


# Methode pour afficher les utilisateurs avec un nom
    
class FilterUserByNameView(APIView):
    def get_objects(self):
        first_name = self.request.query_params.get('first_name', None)
        last_name = self.request.query_params.get('last_name', None)
        
        if not first_name and not last_name:
            # Return an empty queryset if both first_name and last_name are not provided
            return User.objects.none()
        
        queryset = User.objects.all()
        
        if first_name:
            queryset = queryset.filter(first_name__icontains=first_name)
        if last_name:
            queryset = queryset.filter(last_name__icontains=last_name)
        
        return queryset
    
    def get(self, request, *args, **kwargs):
        users = self.get_objects()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


# Methode pour afficher les utilisateurs avec tout cordonnes
    
class User_Role_CompanyListView(APIView):
    def get(self, request,user_id):
        user_role_company = User_Role_Company.objects.filter(user_id=user_id)
        serializer = User_Role_CompanySerializer(user_role_company, many=True)
        return Response(serializer.data)

# Methode pour afficher les utilisateurs avec sa permision
    
class User_AutorisationListView(APIView):
    def get(self, request,user_id):
        user_autorisation = User_Autorisation.objects.filter(user_id=user_id)
        serializer = User_AutorisationSerializer(user_autorisation, many=True)
        return Response(serializer.data)
    

class UserPasswordView(APIView):
    def get(self, request):
        users = User.objects.all()
        decrypted_passwords = []
        for user in users:
            # Decrypt the password (assuming it's hashed using make_password)
            decrypted_password = user.password
            decrypted_passwords.append({'first_name': user.first_name, 'password': decrypted_password})
        return Response(decrypted_passwords)
    
# afichage pointage
class PointageListView(APIView):
    
       def get(self, request):
        queryset = Pointage.objects.all()
        serializer = PointageSerializer(queryset, many=True)
        return Response(serializer.data)
    

# afichage pointage "searche"
from rest_framework import generics
from django.db.models import Q

class PointagesListView(generics.ListAPIView):
    serializer_class = PointagesSerializer
    
    def get_queryset(self):
        queryset = Pointage.objects.all()
        first_name = self.request.query_params.get('first_name', None)
        last_name = self.request.query_params.get('last_name', None)
        date_debut = self.request.query_params.get('date_debut', None)
        date_fin = self.request.query_params.get('date_fin', None)
        
        if first_name:
            queryset = queryset.filter(user__first_name__icontains=first_name)
        if last_name:
            queryset = queryset.filter(user__last_name__icontains=last_name)
        if date_debut:
            queryset = queryset.filter(date__gte=date_debut)
        if date_fin:
            queryset = queryset.filter(date__lte=date_fin)
        
        return queryset
    
# afichage etat
class EtatListView(APIView):
    
    def get(self, request):
       
        queryset = Pointage.objects.all()
        serializer = PointageSerializer(queryset, many=True)
        pointage_data = serializer.data
        total_happy = sum(1 for pointage in pointage_data if pointage['etat'] == 'Happy')
        total_sad = sum(1 for pointage in pointage_data if pointage['etat'] == 'Sad')
        total_neutral = sum(1 for pointage in pointage_data if pointage['etat'] == 'Neutral')
        total = len(pointage_data)
        happy = int(total_happy * 100 / total)  
        sad = int(total_sad * 100 / total)  
        neutral = int(total_neutral * 100 / total)

        totals = {
            'Happy': happy,
            'Sad': sad,
            'Neutral': neutral
        }

        return Response(totals)
    
# afichage by nom est prenom de etat "searche"  
from django.shortcuts import get_object_or_404
class EtatByPersonneListView(APIView):
    serializer_class = PointageSerializer

    def get_queryset(self):
        # Fetch the user instance based on first_name and last_name query parameters
        first_name = self.request.query_params.get('first_name', None)
        last_name = self.request.query_params.get('last_name', None)
        
        if first_name and last_name:
            user = get_object_or_404(User, first_name=first_name, last_name=last_name)
            queryset = Pointage.objects.filter(user=user)
            return queryset
        else:
            return Pointage.objects.none()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)  # Utilisation de self.serializer_class

        # Calculate totals for each state
        total_happy = sum(1 for pointage in serializer.data if pointage['etat'] == 'Happy')
        total_sad = sum(1 for pointage in serializer.data if pointage['etat'] == 'Sad')
        total_neutral = sum(1 for pointage in serializer.data if pointage['etat'] == 'Neutral')

        # Calculate total number of entries
        total = len(serializer.data)

        # Prepare response data
        totals = {
            'Happy': total_happy,
            'Sad': total_sad,
            'Neutral': total_neutral
        }

        return Response(totals)



# afficher by pointage company 
class PointageListByCompanyView(APIView):
    def get(self, request, namecompany):
        # Récupérer les utilisateurs appartenant à la société
        users = User.objects.filter(user_role_company__company__namecompany=namecompany)
        # Récupérer les pointages associés à ces utilisateurs
        queryset = Pointage.objects.filter(user__in=users)
        serializer = PointageSerializer(queryset, many=True)
        return Response(serializer.data)
    

class EtatListByCompanyView(APIView):
    def get(self, request, namecompany):
        # Récupérer les utilisateurs appartenant à la société spécifiée
        users = User.objects.filter(user_role_company__company__namecompany=namecompany)
        # Récupérer les pointages associés à ces utilisateurs
        queryset = Pointage.objects.filter(user__in=users)
        serializer = PointageSerializer(queryset, many=True)
        pointage_data = serializer.data
        
        # Calculer les totaux d'états pour la compagnie spécifique
        total_happy = sum(1 for pointage in pointage_data if pointage['etat'] == 'Happy')
        total_sad = sum(1 for pointage in pointage_data if pointage['etat'] == 'Sad')
        total_neutral = sum(1 for pointage in pointage_data if pointage['etat'] == 'Neutral')
        total = len(pointage_data)
        happy = int(total_happy * 100 / total)
        sad = int(total_sad * 100 / total)
        neutral = int(total_neutral * 100 / total) 

        totals = {
            'Happy': happy,
            'Sad': sad,
            'Neutral': neutral
        }

        return Response(totals)
    