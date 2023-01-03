from rest_framework import serializers
from .models import Wishlist , Product





class ProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        exclude = ('user', 'wishlist',)
