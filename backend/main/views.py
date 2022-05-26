from rest_framework import generics, mixins

# Create your views here.
from main.models import Book
from main.serializers import BookSerializer
from rest_framework.response import Response

class BookGenericAPI(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin):
    queryset = Book.objects
    serializer_class = BookSerializer


    def get(self, request, pk=None):
        if pk:
            return Response({'data': self.retrieve(request, pk).data})
        search = request.GET.get('search')
        if search:
            self.queryset = Book.objects.filter(title__icontains=search)            
        return Response(self.list(request).data)

    def post(self, request):
        print(request.data)
        return Response(self.create(request).data)

    def delete(self, request, pk):
        return Response(self.destroy(request, pk).data)
    
    def patch(self, request, pk):
        return Response(self.update(request, pk, partial=True).data)
