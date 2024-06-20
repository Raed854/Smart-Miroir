from datetime import datetime
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
import pytz
# classe pour  l'utilisateu
def time_without_seconds():
    current_time = timezone.now().time()
    time_without_seconds = current_time.replace(second=0, microsecond=0)
    return time_without_seconds
class User(AbstractUser):
    first_name = models.CharField(max_length=255,blank=True, null=True)
    last_name= models.CharField(max_length=255,blank=True, null=True)
    email = models.CharField(max_length=255,unique=True,blank=True,null=True)
    password = models.CharField(max_length=255,null=True)
    date_fin = models.DateField(blank=True, null=True)
    imag = models.CharField(max_length=255 , null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=None, null=True)
    is_superuser = models.BooleanField(default=None, null=True)
    email_verified = models.BooleanField(default=None, null=True)
    last_login = models.DateTimeField(default=None,blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now , blank=True)
    username = None
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]

    def __str__(self):
        return self.email
 # classe pour Role de l'utilisateur
        
class Role(models.Model):
  role = models.CharField(max_length=40)
  autorisation = models.CharField(max_length=30,default="0000000000")
  

# classe pour name company
  
class Company (models.Model):
 namecompany = models.CharField(max_length=100)
 

# classe rolation
class User_Role_Company(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.nom} - {self.role.role} - {self.company.namecompany}"
    


# classe rolation user_permision
class User_Autorisation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,unique=True)
    autorisation = models.CharField(max_length=30,default="0000000000")
    date_debut = models.DateField(blank=True, null=True)
    date_fin = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name}"
    

def time_without_seconds_tunisia():
    tunisia_timezone = pytz.timezone('Africa/Tunis')
    now = datetime.now(tunisia_timezone)
    return now.replace(second=0, microsecond=0)

# classe pour l'image de l'utilisateu
        
class Image(models.Model):
    image = models.CharField(max_length=255 , null=True, blank=True)
    biometrique = models.CharField(max_length=3000, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


# Classe pour le pointage de l'utilisateur
    
class Pointage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    etat= models.CharField(max_length=10)
    date = models.DateField(default=timezone.now().date(), blank=True)
    hour = models.TimeField(default=time_without_seconds_tunisia, blank=True)
# Classe pour les utilisateur il ya un problemme
class Image_Problemme(models.Model):
    image = models.CharField(max_length=255 , null=True, blank=True)
    date = models.DateField(default=timezone.now().date(), blank=True)
    hour = models.TimeField(default=time_without_seconds_tunisia, blank=True)
