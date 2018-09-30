""" Ensemble des modèles exposé par l'API.
    Comprend les élèves, leurs contacts, les inscriptions ainsi que les présences aux cours.
"""
import calendar
from datetime import date, timedelta
import uuid
from django.db import models

TAILLES_ABADA_CHOIX = (
    ('P', 'Petit'),
    ('M', 'Moyen'),
    ('G', 'Grand'),
    ('GG', 'Très grand')
)

CATEGORIES_COURS_CHOIX = (
    ('EVEIL', 'Éveil'),
    ('ENFANT', 'Enfant'),
    ('ADO', 'Adolescent'),
    ('ADULTE', 'Adulte')
)

SEMAINE = (
    (calendar.MONDAY, 'Lundi'),
    (calendar.TUESDAY, 'Mardi'),
    (calendar.WEDNESDAY, 'Mercredi'),
    (calendar.THURSDAY, 'Jeudi'),
    (calendar.FRIDAY, 'Vendredi'),
    (calendar.SATURDAY, 'Samedi'),
    (calendar.SUNDAY, 'Dimanche')
)


class Periode(models.Model):
    """
    Modèle pour une periode d'enseignement (e.g. annee scolaire)
    """
    debut = models.DateField(auto_now=False, auto_now_add=False)
    fin = models.DateField(auto_now=False, auto_now_add=False)

    class Meta:
        """Meta definition for Periode."""
        verbose_name = 'Periode'
        verbose_name_plural = 'Periodes'

    def __str__(self):
        """Unicode representation of Personne."""
        return "Période du {} au {}".format(self.debut.isoformat(), self.fin.isoformat())

    def set_original(self):
        self.__original_debut = self.debut
        self.__original_fin = self.fin

    def __init__(self, *args, **kwargs):
        super(Periode, self).__init__(*args, **kwargs)
        self.set_original()

    @staticmethod
    def latest():
        p = Periode.objects.order_by('-debut').first()
        print ("Latest: ", p)
        return p

    def are_dates_to_be_updated(self):
        return self.__original_debut != self.debut \
            or self.__original_fin != self.fin

    def save(self, *args, **kwargs):
        """ Enregistre le cours actuelles et créent tout les dates liées au cours de cette période"""
        super(Periode, self).save(*args, **kwargs)
        if self.are_dates_to_be_updated():
            self.set_original()
            for c in self.cours_set.all():
                c.update_dates()


class Cours(models.Model):
    """Model definition for Cours."""

    jour = models.SmallIntegerField(choices=SEMAINE)
    salle = models.CharField(max_length=50)
    categorie = models.CharField(choices=CATEGORIES_COURS_CHOIX, max_length=10)
    horaire = models.TimeField(auto_now=False, auto_now_add=False)
    dernier = models.DateField(auto_now=False, auto_now_add=False)
    periode = models.ForeignKey(Periode, on_delete=models.CASCADE, null=True)

    class Meta:
        """Meta definition for Cours."""

        verbose_name = 'Cours'
        verbose_name_plural = 'Cours'

    def set_original(self):
        self.__original_jour = self.jour
        self.__original_dernier = self.dernier

    def __init__(self, *args, **kwargs):
        super(Cours, self).__init__(*args, **kwargs)
        self.set_original()

    @staticmethod
    def within_latest_period(queryset, *args, **kwargs):
        return queryset.filter(periode=Periode.latest())

    @staticmethod
    def every_weekday(weekday, start, end):
        if start > end:
            return []
        date_ = start + timedelta(days=(weekday - start.weekday()) % 7)
        while date_ <= end:
            yield date_
            date_ += timedelta(days=7)

    def __str__(self):
        """Unicode representation of Cours."""
        return "Cours {} du {} {} à {}".format(
            self.get_categorie_display(),
            self.get_jour_display(),
            self.horaire,
            self.salle)

    def are_dates_to_be_updated(self):
        return self.pk is None \
            or self.__original_jour != self.jour \
            or self.__original_dernier != self.dernier \
            or len(DateCours.objects.filter(cours=self)) == 0


    def update_dates(self):
        DateCours.objects.filter(cours=self)\
            .filter(date__gte=date.today())\
            .delete()
        debut = max(date.today(), self.periode.debut)
        for d in self.every_weekday(self.jour, debut, self.periode.fin):
            c = DateCours(cours=self, date=d)
            c.save()

    def save(self, *args, **kwargs):
        """ Enregistre le cours actuelles et créent tout les dates liées """
        super(Cours, self).save(*args, **kwargs)
        if self.are_dates_to_be_updated():
            self.set_original()
            self.update_dates()


class DateCours(models.Model):
    """Model definition for Cours."""

    cours = models.ForeignKey(
        Cours, on_delete=models.CASCADE, related_name='dates')
    date = models.DateField(db_index=True)

    @staticmethod
    def within_range(date_range):
        def fn(queryset, *args, **kwargs):
            return queryset.filter(cours__periode=Periode.latest())\
                           .filter(date__range=date_range)
        return fn

    class Meta:
        """Meta definition for Cours."""

        verbose_name = 'Date de cours'
        verbose_name_plural = 'Dates de cours'

    def __str__(self):
        """Unicode representation of Cours."""
        return "[{}] {}".format(str(self.cours), self.date)


class Personne(models.Model):
    """ Modèle représentant une personne: élève, contact ou parent."""
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    prenom = models.CharField(max_length=50, db_index=True)
    nom = models.CharField(max_length=50, db_index=True)
    surnom = models.CharField(
        db_index=True, blank=True, null=True, max_length=50)
    date_naissance = models.DateField(
        auto_now=False, auto_now_add=False, blank=True, null=True)
    telephone = models.CharField(max_length=50, blank=True, null=True)
    adresse = models.TextField(blank=True, null=True)

    categorie = models.CharField(
        choices=CATEGORIES_COURS_CHOIX, blank=True, null=True, max_length=10)
    corde = models.CharField(blank=True, null=True, max_length=50)
    taille_abada = models.CharField(blank=True, null=True, max_length=2,
                                    choices=TAILLES_ABADA_CHOIX)

    droit_image = models.BooleanField(default=False)
    photo = models.BooleanField(default=False)
    fiche_adhesion = models.BooleanField(default=False)
    certificat_medical = models.BooleanField(default=False)
    cours = models.ManyToManyField(Cours, blank=True, related_name='inscrits')

    somme_totale = models.IntegerField(blank=True, null=True)

    contact_nom = models.CharField(max_length=100, blank=True, null=True)
    contact_principal_tel = models.CharField(
        max_length=50, blank=True, null=True)
    contact_secondaire_tel = models.CharField(
        max_length=50, blank=True, null=True)

    class Meta:
        """Meta definition for Personne."""
        verbose_name = 'Personne'
        verbose_name_plural = 'Personnes'
        unique_together = ('prenom', 'nom')

    def __str__(self):
        """Unicode representation of Personne."""
        return "{} {}".format(self.prenom, self.nom)


class Inscription(models.Model):
    """ Modèle pour un dossier d'inscription """
    droit_image = models.BooleanField(default=False)
    photo = models.BooleanField(default=False)
    fiche_adhesion = models.BooleanField(default=False)
    certificat_medical = models.BooleanField(default=False)
    cours = models.ManyToManyField(Cours, blank=True, related_name='inscriptions')
    somme_totale = models.IntegerField(blank=True, null=True)
    periode = models.ForeignKey(Periode, on_delete=models.CASCADE)
    inscrit = models.ForeignKey(Personne, on_delete=models.CASCADE, related_name='inscriptions')

    class Meta:
        """Meta definition for Inscription."""

        verbose_name = "Dossier d'inscription"
        verbose_name_plural = "Dossiers d'inscription"

    def __str__(self):
        """Unicode representation of Personne."""
        return "Dossier de {} pour la {}".format(self.inscrit, self.periode)


class Presence(models.Model):
    """Model definition for Presence."""

    cours = models.ForeignKey(
        DateCours, on_delete=models.CASCADE, related_name='presences')
    personne = models.ForeignKey(Personne, on_delete=models.CASCADE)
    present = models.BooleanField()

    class Meta:
        """Meta definition for Presence."""

        verbose_name = 'Presence'
        verbose_name_plural = 'Presences'

    def __str__(self):
        """Unicode representation of Presence."""
        return "{} {} à {}".format(str(self.personne),
                                   "est présent" if self.present else "n'est pas présent",
                                   str(self.cours))


METHODE_PAIEMENT_CHOIX = (
    ('ESPECE', 'Espèce'),
    ('CHEQUE', 'Chèque'),
    ('VIREMENT', 'Virement')
)


class Paiement(models.Model):
    """Model definition for Paiement."""

    methode = models.CharField(max_length=10, choices=METHODE_PAIEMENT_CHOIX)
    somme = models.IntegerField()
    encaissement = models.DateField(null=True, blank=True)
    encaisse = models.BooleanField(default=False)
    payeur = models.ForeignKey(Personne, related_name='paiements', on_delete=models.CASCADE)
    inscription = models.ForeignKey(
        Inscription, related_name='paiements', on_delete=models.CASCADE, null=True)

    class Meta:
        """Meta definition for Paiement."""
        verbose_name = 'Paiement'
        verbose_name_plural = 'Paiements'

    def __str__(self):
        """Unicode representation of Paiement."""
        return "Paiement par {} pour {}".format(
            self.get_methode_display(),
            self.inscription.inscrit)
