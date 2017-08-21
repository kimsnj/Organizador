from rest_framework.serializers import ModelSerializer, UUIDField, IntegerField
from .models import Paiement, Cours, Personne


class PaiementSerializer(ModelSerializer):
    class Meta:
        model = Paiement
        fields = '__all__'


class CoursSerializer(ModelSerializer):
    class Meta:
        model = Cours
        fields = '__all__'


class CoursIdSerializer(ModelSerializer):
    id = IntegerField(read_only=False, required=True)

    class Meta:
        model = Cours
        fields = ('id',)


class EmbeddedPaiementSerializer(ModelSerializer):
    class Meta:
        model = Paiement
        fields = ('methode', 'somme',
                  'encaissement', 'validite', 'encaisse')


class PersonneIdSerializer(ModelSerializer):
    id = UUIDField(read_only=False, required=True)

    class Meta:
        model = Personne
        fields = ('id',)


class PersonneSerializer(ModelSerializer):
    id = UUIDField(read_only=False, required=False)
    contacts = PersonneIdSerializer(many=True, read_only=False, required=False)
    cours = CoursIdSerializer(many=True, read_only=False, required=False)

    paiements = EmbeddedPaiementSerializer(many=True)
    # paiements = HyperlinkedRelatedField(
    #     many=True, view_name='paiement-detail', queryset=Paiement.objects.all())

    class Meta:
        model = Personne
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        print(validated_data)
        donnees_paiements = validated_data.pop('paiements')
        donnees_cours = validated_data.pop('cours')
        donnees_contact = validated_data.pop('contacts')
        personne = Personne.objects.create(**validated_data)

        # Related field: Cours
        for cours in donnees_cours:
            c = Cours.objects.get(pk=cours["id"])
            personne.cours.add(c)

        # Related field: Contact
        for contact in donnees_contact:
            c = Personne.objects.get(pk=contact["id"])
            personne.contacts.add(c)

        personne.save()

        # Paiments related to this personne
        for paiement in donnees_paiements:
            Paiement.objects.create(payeur=personne, **paiement)

        return personne
