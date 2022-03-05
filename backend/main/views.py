from django.shortcuts import render
from rest_framework import generics, mixins

from main.models import Book
from main.serializers import BookSerializer
from rest_framework.response import Response

class BookGenericAPI(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Book.objects
    serializer_class = BookSerializer


    def get(self, request):
        print("to jest get BookGenericAPI")
        return Response({
            'data': self.list(request).data
        })
