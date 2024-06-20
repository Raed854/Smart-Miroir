from django.urls import path
from .views import UserCreateAPIView , ImageCreateAPIView , PointageCreateAPIView ,Image_ProblemmeCreateAPIView
from .views import RoleCreateAPIView , CompanyCreateAPIView  , User_Role_CompanyCreateView,User_AutorisationCreateAPIView
from .affichage import ImageView , CompanyView ,RoleView ,PointageListByCompanyView,EtatListByCompanyView,Image_problemmeView
from .affichage import UserView
from .modification import UserEditByIDAPIView,CompanyUpdateAPIView,RoleAutorisationUpdateAPIView
from .modification import modifier_image,RoleUpdateAPIView,UserAutorisationUpdateAPIView ,User_Role_CompanyEditByIDAPIView
from .affichage import FilterUserByNameView,PointageListView,PointagesListView,EtatListView,EtatByPersonneListView,UserByCompanyView
from .delete import UserDeleteByIDAPIView,RoleDeleteByIDAPIView,CompanyDeleteByIDAPIView
from .views import LoginView,send_email
from .affichage import  User_Role_CompanyListView,User_AutorisationListView
urlpatterns = [

# creation
    
    # api pour la creation des admins
    path('api/users/create/', UserCreateAPIView.as_view(), name='user-create'),

    # api pour creation l'image de user
    path('api/image/create/', ImageCreateAPIView.as_view(), name='image-create'),

    # api pour creation les role des utilisateur
    path('api/role/create/', RoleCreateAPIView.as_view(), name='role-create'),

    # api pour creation Company  
    path('api/company/create/', CompanyCreateAPIView.as_view(), name='company-create'),

    
    # api pour creation user_autorosation
    path('api/user_autorisation/create/', User_AutorisationCreateAPIView.as_view(), name='user_autorisation-create'),

    # api pour ramplire les pointage
    path('api/pointage/create/', PointageCreateAPIView.as_view(), name='pointage-create'),

# fin creation }

# affichage {

    # api pour afficher les images
    path('api/images/', ImageView.as_view(), name='image-list'),

    # api pour afficher les utilisateurs
    path('api/user/', UserView.as_view(), name='user-list'),


    # api pour afficher les company
    path('api/company/', CompanyView.as_view(), name='company-list'),

    # api pour afficher les Role
    path('api/role/', RoleView.as_view(), name='role-list'),

    # api pour afficher les utilisateurs avec son nom
    path('api/users/filter/', FilterUserByNameView.as_view(), name='filter_users_by_name'),

     # api pour afficher les utilisateurs avec company
    path('api/company/<str:namecompany>/user/', UserByCompanyView.as_view(), name='user-by-company'),

    # api pour afficher les Image problemme
    path('api/image_problemme/', Image_problemmeView.as_view(), name='problemmme-list'),
# fin affichage }


# modification{
  
    # api pour modifier les utilisateurs avec nom
    path('api/users/<user_id>/edit/', UserEditByIDAPIView.as_view(), name='user-edit-by-user_id'),
    
    # api pour modifier les images  
    path('api/user/<int:user_id>/image/<int:image_id>/', modifier_image, name='modifier_image'),

    # api pour modifier les role
    path('api/roles/<int:pk>/', RoleUpdateAPIView.as_view(), name='update_role'),

    # api pour modifier les company
    path('api/company/<int:pk>/', CompanyUpdateAPIView.as_view(), name='update_company'),

# fin modification }
    
# Delete {

    # api pour delete 
     path('api/users/<int:pk>/delete/', UserDeleteByIDAPIView.as_view(), name='user-delete-by-id'),

    # api pour delete role
     path('api/roles/<int:pk>/delete/', RoleDeleteByIDAPIView.as_view(), name='delete_role'),

    # api pour delete company
     path('api/company/<int:pk>/delete/', CompanyDeleteByIDAPIView.as_view(), name='delete_company'),

# fin delete }

    # api pour test login
    path('api/users/login/', LoginView.as_view(), name='login'),

    # api pour creation user_role_company
    path('api/create_user_role_company/', User_Role_CompanyCreateView.as_view(), name='user_role_company'),
    
     # api pour afficher user_role_company
    path('api/user_role_company/<int:user_id>/', User_Role_CompanyListView.as_view(), name='user_role_company1'),

    # api pour creation user_autorosation
    path('api/create_user_autorisation/create/', User_AutorisationCreateAPIView.as_view(), name='user_autorisation-create'),

    
   # api pour afficher user_autorisation
    path('api/user_autorisation/<int:user_id>/', User_AutorisationListView.as_view(), name='user_autorisation'),

    # api pour modifier user_autorisation 
    path('api/update_user_autorisation/<int:user_id>/', UserAutorisationUpdateAPIView.as_view(), name='update_user_autorisation'),

    # api pour envoyer mail
    path('api/send-email/<int:user_id>/', send_email, name='send_email'),

    path('api/user_role_company/update/<int:user_id>/', User_Role_CompanyEditByIDAPIView.as_view(), name='update_user_role_company'),

    #afficher tout pointage
    path('api/pointage/', PointageListView.as_view(), name='pointage'),

    #search pointage
    path('api/pointages/', PointagesListView.as_view(), name='pointage-list'),

    #afficher l'etat
    path('api/etat/', EtatListView.as_view(), name='etat-list'),

    #search etat 
    path('api/etatbypersonne/', EtatByPersonneListView.as_view(), name='etat_by_personne'),

    # api pour ramplire les image d'es utilisateur non enregstrer
    path('api/image_problemme/create/', Image_ProblemmeCreateAPIView.as_view(), name='Problemme-create'),
 
    # api pour afficher les pointage by companer
    path('api/pointage/<str:namecompany>/', PointageListByCompanyView.as_view(), name='pointage-by-company'),
      # api pour afficher les etat by companer
    path('api/etat/<str:namecompany>/', EtatListByCompanyView.as_view(), name='etat-list-by-company'),

    path('api/role_autorisation/<int:user_id>/', RoleAutorisationUpdateAPIView.as_view(), name='change-role-autorisation')
]


    
