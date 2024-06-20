from rest_framework import generics, status
from rest_framework.response import Response
from .models import User,Role,Company
from .serializers import UserDeleteSerializer
from rest_framework.views import APIView

class UserDeleteByIDAPIView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDeleteSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class RoleDeleteByIDAPIView(APIView):
    def delete(self, request, pk):
        try:
            role = Role.objects.get(pk=pk)
        except Role.DoesNotExist:
            return Response({"error": "Role does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CompanyDeleteByIDAPIView(APIView):
    def delete(self, request, pk):
        try:
            company = Company.objects.get(pk=pk)
        except Role.DoesNotExist:
            return Response({"error": "Company does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)