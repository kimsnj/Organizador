from datetime import timedelta, date, time
from django.test import TestCase

from uuid import uuid4
from hypothesis import given, settings
from hypothesis.strategies import dates, integers, composite

from .models import Cours, Personne
from .serializers import PersonneSerializer


@composite
def two_dates(draw):
    debut = draw(dates())
    fin = draw(dates(min_date=debut - timedelta(days=-15),
                     max_date=debut + timedelta(days=150)))
    return (debut, fin)


class CoursTestCase(TestCase):

    @given(jour=integers(0, 6),
           range_=two_dates())
    def test_dates(self, jour, range_):
        (debut, fin) = range_
        days = list(Cours.every_weekday(jour, debut, fin))
        if fin < debut:
            self.assertEqual(0, len(days))
        else:
            self.assertAlmostEqual((fin - debut).days / 7,
                                   len(days),
                                   delta=1)
        for d in days:
            self.assertEqual(jour, d.weekday())
            self.assertLessEqual(debut, d)
            self.assertLessEqual(d, fin)

    def test_updated(self):
        c = Cours(jour=0,
                  salle='Ranguin',
                  categorie='ADO',
                  horaire=time(hour=17),
                  dernier=date(2020, 12, 31))
        self.assertTrue(c.are_dates_to_be_updated,
                        'Nouveau cours, dates à créer')
        c.save()
        self.assertFalse(c.are_dates_to_be_updated, 'Cours sauvegardé.')
        c.salle = 'Auribeau'
        self.assertFalse(c.are_dates_to_be_updated, 'Seul le lieu à changer')
        c.jour = 1
        self.assertTrue(c.are_dates_to_be_updated,
                        'Jour changé, dates à regénérer')
        c2 = Cours.objects.get(pk=c.pk)
        self.assertFalse(c2.are_dates_to_be_updated, 'Cours fraichement lu')


class PersonneSerializerTest(TestCase):
    def test_create(self):
        c = Cours(jour=0,
                  salle='Ranguin',
                  categorie='ADO',
                  horaire=time(hour=17),
                  dernier=date(2020, 12, 31))
        c.save()
        p = Personne(nom="M", prenom="H", telephone="06")
        p.save()

        donnees = {
            "id": uuid4(),
            "paiements": [
                {
                    "methode": "CHEQUE",
                    "somme": 200,
                    "validite": "2019-10-11"
                }
            ],
            "cours": [
                1
            ],
            "contacts": [
                p.id
            ],
            "prenom": "K",
            "nom": "S",
            "surnom": "I",
            "date_naissance": "1988-12-01",
            "telephone": "06",
            "adresse": "",
            "corde": "",
            "taille_abada": "G",
            "droit_image": True,
            "photo": True,
            "fiche_adhesion": False,
            "certificat_medical": False
        }

        serializer = PersonneSerializer(data=donnees)
        if not serializer.is_valid():
            self.assertTrue(False, "Invalid serializer: " + str(serializer.errors))
        serializer.save()

        new_p = Personne.objects.get(pk=donnees["id"])
        self.assertEqual(new_p.prenom, "K")
        new_cours = new_p.cours.all()
        self.assertEqual(len(new_cours), 1)
        self.assertEqual(new_cours[0].id, 1)
        new_contacts = new_p.contacts.all()
        self.assertEqual(len(new_contacts), 1)
        self.assertEqual(new_contacts[0].id, p.id)
