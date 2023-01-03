from django.shortcuts import render
from rest_framework import viewsets 
from .models import Wishlist, Product
from .serializer import ProductsSerializer
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsBuyer , IsSeller
from rest_framework.permissions import IsAuthenticated


# Create your views here.


class AddProductsView(viewsets.ModelViewSet):
    """
    user Add products  
    Get users products
    permission only for seller 
    """
    http_method_names = ["get", "post"]
    permission_classes = [IsAuthenticated]
    serializer_class = ProductsSerializer
    def get_queryset(self):
        query =  Product.objects.filter(user=self.request.user)
        return query
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProductsView(viewsets.ModelViewSet):
    """
    user Add products to wish list
    Get all products
    permission only for buyer
    """
    http_method_names = ["get", "put"]
    permission_classes = [IsAuthenticated]
    serializer_class = ProductsSerializer
    queryset = Product.objects.all()

    def get_object(self):
        pk = self.kwargs['pk']
        product = get_object_or_404(Product, id=pk, user=self.request.user)

        return product
    def update(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs) 

    def partial_update(self, request, *args, **kwargs):
        wishlist = Wishlist.objects.get(user=self.request.user)
        instance = self.get_object()
        instance.wishlist.add(wishlist)
        instance.save()
        return Response(
            {"detail": "Added to  wish list succefully"},
            status=status.HTTP_204_NO_CONTENT
            )



class WishProductsView(viewsets.ModelViewSet):
    """
    Get all wish list of the user
    permission only for buyer
    """
    http_method_names = ["get"]
    permission_classes = [IsAuthenticated]
    serializer_class = ProductsSerializer
    def get_queryset(self):
        wishlist = Wishlist.objects.get(user=self.request.user)
        query =  Product.objects.filter(wishlist=wishlist)
        return query