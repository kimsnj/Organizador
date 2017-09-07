from rest_framework.serializers import ModelSerializer, UUIDField, IntegerField, ListField, PrimaryKeyRelatedField, DateField
from rest_framework.exceptions import MethodNotAllowed
from .models import Paiement, Cours, Personne, DateCours, Presence
from datetime import date, timedelta


class PaiementSerializer(ModelSerializer):
    class Meta:
        model = Paiement
        fields = ('methode', 'somme', 'encaissement', 'encaisse', 'payeur')

class EmbeddedPresenceSerializer(ModelSerializer):
    class Meta:
        model = Presence
        fields = ('personne', 'present')


class DateCoursSerializer(ModelSerializer):
    date = DateField(read_only=True)
    cours = PrimaryKeyRelatedField(read_only=True)
    presences = EmbeddedPresenceSerializer(many=True, read_only=False)

    class Meta:
        model = DateCours
        fields = '__all__'

    def update(self, instance, validated_data):
        print("About to update: ", validated_data)
        # Full replace of presences
        Presence.objects.filter(cours=instance).delete()
        for donnees_presence in validated_data.get('presences', []):
            Presence.objects.create(cours=instance, **donnees_presence)
        return instance

    def create(self, validated_data):
        print('Automatically create at Courses save, it\'s not allowed to POST them')
        raise MethodNotAllowed(
            'POST', detail='Dates are automatically created with Courses.')


class CoursSerializer(ModelSerializer):
    inscrits = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Cours
        fields = '__all__'


class EmbeddedPaiementSerializer(ModelSerializer):
    class Meta:
        model = Paiement
        fields = ('methode', 'somme', 'encaissement', 'encaisse')


class PersonneSerializer(ModelSerializer):
    id = UUIDField(read_only=False, required=False)
    cours = PrimaryKeyRelatedField(
        many=True, read_only=False, queryset=Cours.objects.all(), required=False)
    contacts = PrimaryKeyRelatedField(
        many=True, read_only=False, queryset=Personne.objects.all(), required=False)
    paiements = EmbeddedPaiementSerializer(many=True, required=False)

    class Meta:
        model = Personne
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        print("About to save: ", validated_data)
        donnees_paiements = validated_data.pop('paiements', [])
        donnees_cours = validated_data.pop('cours', [])
        donnees_contact = validated_data.pop('contacts', [])
        personne = Personne.objects.create(**validated_data)

        # Related field: Cours
        for cours in donnees_cours:
            personne.cours.add(cours)

        # Related field: Contact
        for contact in donnees_contact:
            personne.contacts.add(contact)

        personne.save()

        # Paiments related to this personne
        for paiement in donnees_paiements:
            Paiement.objects.create(payeur=personne, **paiement)

        return personne
