from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import PersonneSerializer, CoursSerializer, PaiementSerializer
from .models import Personne, Cours, Paiement


class CoursViewSet(ModelViewSet):
    queryset = Cours.objects.all()
    serializer_class = CoursSerializer


class PersonneViewSet(ModelViewSet):
    queryset = Personne.objects.all().order_by('nom')
    serializer_class = PersonneSerializer


class PaiementViewSet(ModelViewSet):
    queryset = Paiement.objects.all()
    serializer_class = PaiementSerializer
