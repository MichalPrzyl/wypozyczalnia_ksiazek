from rest_framework import generics, mixins

# Create your views here.
from main.models import Book
from main.serializers import BookSerializer
from rest_framework.response import Response

class BookGenericAPI(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Book.objects
    serializer_class = BookSerializer


    def get(self, request):
        # return self.list(request).data
        return Response(self.list(request).data)
