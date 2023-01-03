from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import Group




class IsSeller(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            is_in_group(request, "seller")
            )


class IsBuyer(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            is_in_group(request, "buyer")
            )


def is_in_group(request, group_name):
    in_group = False    
    groups = Group.objects.filter(user=request.user)
    for group in groups:
        if group.name == group_name:
            in_group = True
    return in_group