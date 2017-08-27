from rest_framework.serializers import ModelSerializer, UUIDField, IntegerField, ListField, PrimaryKeyRelatedField
from .models import Paiement, Cours, Personne, DateCours
from datetime import date, timedelta


class PaiementSerializer(ModelSerializer):
    class Meta:
        model = Paiement
        fields = '__all__'


class DateCoursSerializer(ModelSerializer):
    cours = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = DateCours
        fields = '__all__'


class CoursSerializer(ModelSerializer):
    inscrits = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Cours
        fields = '__all__'


class EmbeddedPaiementSerializer(ModelSerializer):
    class Meta:
        model = Paiement
        fields = ('methode', 'somme',
                  'encaissement', 'validite', 'encaisse')


class PersonneSerializer(ModelSerializer):
    id = UUIDField(read_only=False, required=False)
    cours = PrimaryKeyRelatedField(
        many=True, read_only=False, queryset=Cours.objects.all())
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
