from rest_framework import serializers
from django.contrib.sites.shortcuts import get_current_site
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import (
    LoginSerializer,
    UserDetailsSerializer,
    PasswordResetSerializer,
)
from allauth.account.adapter import get_adapter
from django.core.exceptions import ValidationError as DjangoValidationError

from django.contrib.auth import get_user_model
from django.utils.translation import gettext as _
from rest_framework import exceptions, serializers
from allauth.account.utils import setup_user_email
from django.contrib.auth.models import Group
from .models import UserAccount





class CustomRegisterSerializer(RegisterSerializer):
    """
    Costumized RegisterSerializer:
    register by email instead of username
    """
    username = None
    email = serializers.EmailField(required=True)
    first_name=serializers.CharField(max_length=20, required=False)
    last_name = serializers.CharField(max_length=20, required=False)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user = adapter.save_user(request, user, self, commit=False)
        if "password1" in self.cleaned_data:
            try:
                adapter.clean_password(self.cleaned_data['password1'], user=user)
            except DjangoValidationError as exc:
                raise serializers.ValidationError(
                    detail=serializers.as_serializer_error(exc)
                )
        user.save()
        self.custom_signup(request, user)
        return user

    def get_cleaned_data(self):
        return {
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get("password2", ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
        }

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get("first_name")
        user.last_name = self.validated_data.get("last_name")
        user.save()





class UserSerializer(serializers.ModelSerializer):
    """
    SERIALIZER MODEL: authenticated user data
    """
    class Meta:
        model = UserAccount
        fields = ['email', 'first_name', 'last_name',]

