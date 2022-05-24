from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=400)
    author = models.CharField(max_length=400, blank=True)
    img = models.BooleanField(default=False)
    cover = models.ImageField(upload_to='media', null=True)

    def get_last_id(self):
        try:
            return max(Book.objects.values_list('id', flat=True))
        except ValueError as e:
            print(e)
            return 1
