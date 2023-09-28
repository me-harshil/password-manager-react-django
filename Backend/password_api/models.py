from django.db import models
from user_api.models import CustomUser

class Passwords(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    website = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    passwordOfWebsite = models.CharField(max_length=255)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.website}"
