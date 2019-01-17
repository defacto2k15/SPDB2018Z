from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from rest_framework import viewsets
from .directions import directions
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer


# Serve Vue Application
index_view = never_cache(TemplateView.as_view(template_name='index.html'))

#
# class MessageViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows messages to be viewed or edited.
#     """
#     queryset = Message.objects.all()
#     serializer_class = MessageSerializer

@api_view(['GET', 'POST'])
def message_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':

        jsonRequest = request.GET.dict()
        result = directions(jsonRequest)
        print(result)
        message = Message.objects.all()
        serializer = MessageSerializer(message, context={'request': request}, many=True)
        return Response(result)

    elif request.method == 'POST':
        print(request.data)
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def message_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        message = Message.objects.get(pk=pk)
    except Message.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MessageSerializer(message)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MessageSerializer(message, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
