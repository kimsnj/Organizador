from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import PersonneSerializer
from .models import Personne


class PersonneViewSet(ModelViewSet):
    queryset = Personne.objects.all().order_by('nom')
    serializer_class = PersonneSerializer
