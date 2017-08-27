from rest_framework.viewsets import ModelViewSet
from drf_multiple_model.views import MultipleModelAPIView
from .serializers import PersonneSerializer, CoursSerializer, PaiementSerializer, DateCoursSerializer
from .models import Personne, Cours, Paiement, DateCours
from datetime import date, timedelta


class CoursViewSet(ModelViewSet):
    queryset = Cours.objects.all()
    serializer_class = CoursSerializer


class PersonneViewSet(ModelViewSet):
    queryset = Personne.objects.all().order_by('nom')
    serializer_class = PersonneSerializer


class PaiementViewSet(ModelViewSet):
    queryset = Paiement.objects.all()
    serializer_class = PaiementSerializer


class DateCoursViewSet(ModelViewSet):
    queryset = DateCours.objects.all()
    serializer_class = DateCoursSerializer


def two_month_range():
    today = date.today()
    delta = timedelta(days=30)
    return (today - delta, today + delta)


class InitView(MultipleModelAPIView):
    queryList = [
        (Personne.objects.all(), PersonneSerializer, 'personnes'),
        (Cours.objects.all(), CoursSerializer, 'cours'),
        (DateCours.objects.filter(date__range=two_month_range()),
         DateCoursSerializer, 'dates')
    ]
