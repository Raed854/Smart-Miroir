from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User,Role,Company,Image,Pointage,Image_Problemme
from django.contrib.auth.password_validation import validate_password
from .models import User_Role_Company ,User_Autorisation
from django.core.validators import validate_email

def validateemail(value):
    lower_email = value.lower()
    if User.objects.filter(email__iexact=lower_email).exists() and User.objects.filter(email__iexact=lower_email).first().email_verified==True:
        raise serializers.ValidationError("L'adresse email est existante")
    return lower_email

class UserSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(validators=[validateemail],error_messages={'invalid': 'Email invalide',
                                                                              'blank':'Email vide',                                                    
                                                                              'required':'email obligatoire'})
    first_name = serializers.CharField(error_messages={'blank': 'Prénom vide',
                                                    'required':'Prénom obligatoire'})

    last_name = serializers.CharField(error_messages={'blank': 'Nom vide',
                                                    'required':'Nom obligatoire'})
    
    password = serializers.CharField(

        max_length=128, 
        min_length=8,
        error_messages={
            'min_length': 'Au moins {min_length} caractères.',
            'max_length': 'Au plus {max_length} caractères.',
        },
        help_text='Laissez vide si aucun changement n\'est nécessaire',
        style={'input_type': 'password', 'placeholder': 'Password'},
        allow_blank=True  # Permet au champ d'être vide
    )

    class Meta:
        model = User
        fields = ['id' ,'first_name','last_name','email','password',  'date_fin', 'imag','is_superuser','is_staff','is_active','email_verified','date_joined']

    def validate_password(self, value):
        if value and len(value) < 8:
            raise serializers.ValidationError("Le mot de passe doit contenir au moins 8 caractères.")
        return value

    def create(self, validated_data):
        password = validated_data.get('password', None)
        if password:
            validated_data['password'] = make_password(password)
        return User.objects.create(**validated_data)
    
class UserAfficheSerializer(serializers.ModelSerializer):
    company = serializers.CharField(source='company.namecompany', read_only=True)
    id = serializers.IntegerField(source='user.id', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    date_fin = serializers.DateField(source='user.date_fin', read_only=True)
    imag = serializers.CharField(source='user.imag', read_only=True)
    date_joined = serializers.DateTimeField(source='user.date_joined', read_only=True)
    is_active = serializers.BooleanField(source='user.is_active', read_only=True)
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'date_fin', 'imag','is_active' ,'date_joined', 'company']
    
# Serializer for role
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['role','autorisation']

class Role_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id','autorisation']
# Serializer for afficher role
class RoleAfficherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id','role','autorisation']

# Serializer for Company
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['namecompany']

# Serializer for afficher company
class CompanyAfficherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id','namecompany']


class User_Role_CompanysSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Role_Company
        fields = ['id', 'user', 'role', 'company']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image', 'biometrique', 'user']


class PointageSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    image = serializers.CharField(source='user.imag', read_only=True)
    company = serializers.CharField(source='company.namecompany', read_only=True)
    
    class Meta:
        model = Pointage
        fields = ['hour', 'date', 'user', 'etat', 'first_name', 'last_name', 'image','company']

class PointagesSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    image = serializers.CharField(source='user.imag', read_only=True)
    
    class Meta:
        model = Pointage
        fields = ['hour', 'date', 'user', 'etat', 'first_name', 'last_name','image']

class UserDeleteSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def delete(self, instance):
        instance.delete()

    class Meta:
        model = User
        fields = ['nom', 'password', 'prenom', 'email', 'date', 'is_active', 'date_fin', 'imag']

class UserSerializerLogin(serializers.ModelSerializer):
  
    email = serializers.CharField(error_messages={'invalid': 'email invalide',
                                                                              'blank':'email vide',                                                    
                                                                              'required':'email obligatoire'})
 
    password = serializers.CharField(
        write_only=True,
        required=True,
        max_length=128,
        min_length=8,
        error_messages={
        
         'invalid': 'mot de passe invalide',
            'blank': 'mot de passe vide',
            'min_length': 'Au moins {min_length} caractéres.',
            'max_length': 'Au plus  {max_length} caractéres.',
        },
        validators=[validate_password],
        style={'input_type': 'password', 'placeholder': 'Password'}
    )


    class Meta:
        model = User
        fields =['email','password']

class User_Role_CompanySerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    imag = serializers.CharField(source='user.imag', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    is_active = serializers.CharField(source='user.is_active', read_only=True)
    role = serializers.CharField(source='role.role', read_only=True)
    company = serializers.CharField(source='company.namecompany', read_only=True)
    id_role = serializers.CharField(source='role.id', read_only=True)
    id_company = serializers.CharField(source='company.id', read_only=True)

    class Meta:
        model = User_Role_Company
        fields = ['user','first_name','last_name', 'role', 'company','imag','email','is_active','id_role','id_company']

# serlizers rolation user_permision
class UserAutorisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Autorisation
        fields = ['user', 'autorisation', 'date_debut', 'date_fin', ]

class User_AutorisationSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User_Autorisation
        fields = ['user', 'autorisation', 'date_debut', 'date_fin', ]

class Image_ProblemmeSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Image_Problemme
        fields = ['image', 'date', 'hour' ]

