from django.urls import path, re_path
from .views import CustomRegisterView , UserProfile
from rest_auth.registration.views import VerifyEmailView
from allauth.account.views import email_verification_sent
from dj_rest_auth.views import PasswordChangeView, LoginView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView, TokenVerifyView
from rest_framework.routers import DefaultRouter
 



urlpatterns = [
    # registrations
    path("registration/", CustomRegisterView.as_view(), name="rest_register"),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),
    name='account_confirm_email'),
    re_path(r'^account-confirm-email/', email_verification_sent,
    name='account_email_verification_sent'),
    # login INFO
    path('token/', TokenObtainPairView.as_view(), name="rest_login_token"),
    # refresh_token
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh_token"),
    # check token
    path('token/verify/',TokenVerifyView.as_view(),name="verify_token"),
    # logout
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    # settings
    path('profile/', UserProfile.as_view({"get": "list", "put": "update"}), name="rest_user_data"),
    path("password/change/", PasswordChangeView.as_view(), name="rest_password_change"),

]
