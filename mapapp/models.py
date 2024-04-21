from django.db import models

# Create your models here.
class Crime(models.Model):
    message=models.CharField(max_length=350)
    location=models.CharField(max_length=350)
    name=models.CharField(max_length=350)
    phoneNumber=models.CharField(max_length=350)
    crimeType=models.CharField(max_length=350)

    def __str__(self):
        return self.message
