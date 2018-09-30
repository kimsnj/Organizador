from rest_framework.serializers import ModelSerializer, UUIDField, PrimaryKeyRelatedField, DateField
from rest_framework.exceptions import MethodNotAllowed
from .models import Paiement, Cours, Personne, DateCours, Presence, Inscription, Periode


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


class PeriodeSerializer(ModelSerializer):
    class Meta:
        model = Periode
        fields = ('id', 'debut', 'fin')


class CoursSerializer(ModelSerializer):
    inscrits = PrimaryKeyRelatedField(many=True, read_only=True)
    periode = PeriodeSerializer()

    class Meta:
        model = Cours
        fields = '__all__'


class EmbeddedPaiementSerializer(ModelSerializer):
    class Meta:
        model = Paiement
        fields = ('methode', 'somme', 'encaissement', 'encaisse')


class InscriptionSerializer(ModelSerializer):
    cours = PrimaryKeyRelatedField(
        many=True, read_only=False, queryset=Cours.objects.all(), required=False)
    paiements = EmbeddedPaiementSerializer(many=True, required=False)
    periode = PeriodeSerializer()

    class Meta:
        model = Inscription
        fields = ('droit_image', 'photo', 'fiche_adhesion', 'certificat_medical',
                  'cours', 'paiements', 'somme_totale', 'periode')


class PersonneSerializer(ModelSerializer):
    id = UUIDField(read_only=False, required=False)
    inscriptions = InscriptionSerializer(required=False, many=True)

    class Meta:
        model = Personne
        fields = ('id', 'prenom', 'nom', 'surnom', 'date_naissance',
                  'telephone', 'adresse', 'categorie',
                  'corde', 'taille_abada',
                  'contact_nom', 'contact_principal_tel', 'contact_secondaire_tel',
                  'inscriptions')
        depth = 1

    def to_representation(self, obj):
        """Move fields from inscriptions to person representation."""
        representation = super().to_representation(obj)
        inscriptions_repr = representation.pop('inscriptions', [])
        latest = next((insc for insc in inscriptions_repr if insc['periode']['id'] == Periode.latest().id), {})
        for key in latest:
            representation[key]= latest[key]

        return representation

    def to_internal_value(self, data):
        """Move fields related to inscription to their own inscrption dictionary."""
        inscriptions_internal= {}
        for key in InscriptionSerializer.Meta.fields:
            if key in data:
                inscriptions_internal[key]= data.pop(key)

        internal= super().to_internal_value(data)
        internal['inscriptions'] = inscriptions_internal
        return internal

    @staticmethod
    def get_or_create_inscription(personne):
        inscription = Inscription.objects.filter(inscrit=personne)\
                           .filter(periode=Periode.latest())\
                           .all()
        if len(inscription) > 0:
            return inscription[0]
        return Inscription.objects.create(inscrit=personne, periode=Periode.latest())

    def create(self, validated_data):
        print("About to save: ", validated_data)
        inscription = validated_data.pop('inscriptions', {})

        donnees_paiements = inscription.pop('paiements', [])
        donnees_cours = inscription.pop('cours', [])
        personne = Personne.objects.create(**validated_data)

        inscription = Inscription.objects.create(inscrit=personne, periode=Periode.latest(), **inscription)

        # Related field: Cours
        for cours in donnees_cours:
            personne.cours.add(cours)
            inscription.cours.add(cours)

        personne.save()
        inscription.save()

        # Paiments related to this personne
        for paiement in donnees_paiements:
            Paiement.objects.create(
                payeur = personne, inscription = inscription, **paiement)

        return personne

    def update(self, instance, validated_data):
        # Overwrite all fields
        instance.prenom=validated_data.get('prenom')
        instance.nom=validated_data.get('nom')
        instance.surnom=validated_data.get('surnom')
        instance.date_naissance=validated_data.get('date_naissance')
        instance.telephone=validated_data.get('telephone')
        instance.adresse=validated_data.get('adresse')
        instance.categorie=validated_data.get('categorie')
        instance.corde=validated_data.get('corde')
        instance.taille_abada=validated_data.get('taille_abada')
        instance.contact_nom=validated_data.get('contact_nom')
        instance.contact_principal_tel=validated_data.get(
            'contact_principal_tel')
        instance.contact_secondaire_tel= validated_data.get(
            'contact_secondaire_tel')
        instance.save()

        donnees_inscription = validated_data.get('inscriptions')
        if donnees_inscription is not None:
            ins = self.get_or_create_inscription(instance)
            ins.droit_image = donnees_inscription.get('droit_image', ins.droit_image)
            ins.photo = donnees_inscription.get('photo', ins.photo)
            ins.fiche_adhesion = donnees_inscription.get('fiche_adhesion', ins.fiche_adhesion)
            ins.certificat_medical = donnees_inscription.get('certificat_medical', ins.certificat_medical)
            ins.somme_totale= donnees_inscription.get('somme_totale', ins.somme_totale)
            ins.cours.set(donnees_inscription.get('cours', []))
            ins.save()
            instance.cours.set(donnees_inscription.get('cours', []))
            instance.save()


            # Recreate all paiements from scratch
            Paiement.objects.filter(inscription=ins).delete()
            for paiement in donnees_inscription.get('paiements', []):
                Paiement.objects.create(payeur=instance, inscription=ins, **paiement)

        return instance
