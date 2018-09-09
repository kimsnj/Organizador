from rest_framework.viewsets import ModelViewSet
from drf_multiple_model.views import ObjectMultipleModelAPIView
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


def months_range(before, after):
    today = date.today()
    delta = timedelta(days=30)
    return (today - before * delta, today + after * delta)


class InitView(ObjectMultipleModelAPIView):
    querylist = [
        {
            'queryset': Personne.objects.all(),
            'serializer_class': PersonneSerializer,
            'label': 'personnes'
        },
        {
            'queryset': Cours.objects.all(),
            'serializer_class': CoursSerializer,
            'label': 'cours'
        },
        {
            'queryset': DateCours.objects.filter(date__range=months_range(6, 1)),
            'serializer_class': DateCoursSerializer,
            'label': 'dates'
        }
    ]