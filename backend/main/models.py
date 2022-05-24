from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=400, blank=True)
    img = models.BooleanField(default=False)
    cover = models.ImageField(upload_to='media', null=True)