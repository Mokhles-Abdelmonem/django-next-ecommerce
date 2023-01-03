from django.shortcuts import render
from . serializer import CustomRegisterSerializer , UserSerializer
from .models import UserAccount
from dj_rest_auth.registration.views import RegisterView
from rest_framework import viewsets , status
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response

# Create your views here.





class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer



class UserProfile(viewsets.ModelViewSet):
    """
    Update user profile information 
    Get user profile information
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "put"]

    def list(self, request, *args, **kwargs):
        user = request.user
        serial = UserSerializer(instance=user)
        return Response(serial.data)

    def update(self, request, *args, **kwargs):
        user = request.user
        serial = UserSerializer(data=request.data, instance=user)
        if serial.is_valid():
            serial.save()
            return Response({"success":"Profile updated successfully"}, status=status.HTTP_200_OK)
        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)
