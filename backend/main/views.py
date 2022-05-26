from rest_framework import generics, mixins

# Create your views here.
from main.models import Book
from main.serializers import BookSerializer
from rest_framework.response import Response
from django.db.models.functions import Lower

class BookGenericAPI(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin):
    queryset = Book.objects.order_by('-is_available', Lower('title'))
    serializer_class = BookSerializer


    def get(self, request, pk=None):
        if pk:
            return Response({'data': self.retrieve(request, pk).data})
        search = request.GET.get('search')
        if search:
            self.queryset = Book.objects.filter(title__icontains=search).order_by('-is_available', Lower('title'))
        return Response(self.list(request).data)

    def post(self, request):
        return Response(self.create(request).data)

    def delete(self, request, pk):
        return Response(self.destroy(request, pk).data)
    
    def patch(self, request, pk):
        return Response(self.update(request, pk, partial=True).data)
