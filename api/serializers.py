from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from .models import *


class PersonneSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Personne
        fields = '__all__'
        depth = 1
