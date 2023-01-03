from django.db import models
from users.models import UserAccount
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
# Create your models here.


class Wishlist(models.Model):
    user = models.OneToOneField(UserAccount , on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email


class Product(models.Model):
    user = models.ForeignKey(UserAccount , on_delete=models.CASCADE)
    wishlist = models.ManyToManyField(Wishlist,blank=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    price = models.PositiveIntegerField()
    image = models.ImageField(upload_to="docs/images",null=True, blank=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def createwishlist(sender, instance, created, **kwargs):
    if created:
        Wishlist.objects.create(user=instance)
