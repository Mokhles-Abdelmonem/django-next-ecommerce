from django.urls import path, include 
from .views import ProductsView, AddProductsView ,WishProductsView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductsView, basename='products')
router.register(r'add-product', AddProductsView, basename='add-products')
router.register(r'get-wishlist-products', WishProductsView, basename='add-products')




urlpatterns = [

    path('', include(router.urls)),

]
