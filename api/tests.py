from datetime import timedelta, date, time
from django.test import TestCase
from django.contrib.auth.models import User

from hypothesis import given
from hypothesis.extra.django import TestCase as HypothesisTestCase
from hypothesis.strategies import dates, integers, composite

from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.test import APITestCase

from uuid import uuid4
import json

from .serializers import PersonneSerializer, DateCoursSerializer
from .models import Cours, Personne, DateCours, Presence, Paiement, Periode, Inscription


@composite
def two_dates(draw):
    debut = draw(dates())
    fin = draw(dates(min_value=debut-timedelta(days=15),
                     max_value=debut+timedelta(days=150)))
    return (debut, fin)


class CoursTestCase(HypothesisTestCase):

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
        p = Periode.objects.create(debut = date(2020, 1, 1), fin=date(2020, 12, 31))
        c = Cours(jour=0,
                  salle='Ranguin',
                  categorie='ADO',
                  horaire=time(hour=17),
                  dernier=date(2020, 12, 31),
                  periode=p)
        self.assertTrue(c.are_dates_to_be_updated(),
                        'Nouveau cours, dates à créer')
        c.save()
        self.assertFalse(c.are_dates_to_be_updated(), 'Cours sauvegardé.')
        c.salle = 'Auribeau'
        self.assertFalse(c.are_dates_to_be_updated(), 'Seul le lieu à changer')
        c.jour = 1
        self.assertTrue(c.are_dates_to_be_updated(),
                        'Jour changé, dates à regénérer')
        c2 = Cours.objects.get(pk=c.pk)
        self.assertFalse(c2.are_dates_to_be_updated(), 'Cours fraichement lu')


class DateCoursSerializerTest(TestCase):
    def test_create(self):
        p = Periode.objects.create(debut = date(2020, 1, 1), fin=date(2020, 12, 31))
        c = Cours(jour=0,
                  salle='Auribeau',
                  categorie='ADULTE',
                  horaire=time(hour=17),
                  dernier=date.today() + timedelta(days=14),
                  periode=p)
        c.save()
        d = list(DateCours.objects.filter(cours=c))[0]
        p1 = Personne(nom="M", prenom="H", telephone="06")
        p1.save()

        donnees = {
            "id": d.id,
            "presences": [{
                "personne": p1.id,
                "present": True
            }]
        }

        serializer = DateCoursSerializer(d, data=donnees)
        if not serializer.is_valid():
            self.assertTrue(False, "Invalid serializer: " +
                            str(serializer.errors))
        serializer.save()

        presence = Presence.objects.filter(cours=d, personne=p1)
        self.assertEqual(len(presence), 1)
        self.assertTrue(presence[0].present)

        p2 = Personne(nom="K", prenom="S", telephone="06")
        p2.save()

        donnees = {
            "id": d.id,
            "presences": [{
                "personne": p1.id,
                "present": False
            }, {
                "personne": p2.id,
                "present": True
            }]
        }

        serializer = DateCoursSerializer(d, data=donnees)
        if not serializer.is_valid():
            self.assertTrue(False, "Invalid serializer: " +
                            str(serializer.errors))
        serializer.save()
        print('JSON rendering: ', JSONRenderer().render(serializer.data))

        presence = Presence.objects.filter(cours=d, personne=p1)
        self.assertEqual(len(presence), 1)
        self.assertFalse(presence[0].present)

        presence = Presence.objects.filter(cours=d, personne=p2)
        self.assertEqual(len(presence), 1)
        self.assertTrue(presence[0].present)


class PersonneSerializerTest(TestCase):

    @staticmethod
    def donnees_personnes():
        p = Periode.objects.create(debut = date(2020, 1, 1), fin=date(2020, 12, 31))
        c = Cours(jour=0,
                  salle='Ranguin',
                  categorie='ADO',
                  horaire=time(hour=17),
                  dernier=date(2020, 12, 31),
                  periode=p)
        c.save()

        donnees = {
            "id": uuid4(),
            "paiements": [
                {
                    "methode": "CHEQUE",
                    "somme": 200
                }
            ],
            "cours": [
                1
            ],
            "contact_nom": "MH",
            "contact_principal_tel": "06",
            "prenom": "K",
            "nom": "S",
            "surnom": "I",
            "date_naissance": "1988-12-01",
            "telephone": "06",
            "taille_abada": "G",
            "droit_image": True,
            "photo": True,
            "fiche_adhesion": False,
            "certificat_medical": False
        }
        return donnees

    def test_create(self):
        donnees = self.donnees_personnes()
        serializer = PersonneSerializer(data=donnees)
        if not serializer.is_valid():
            self.assertTrue(False, "Invalid serializer: " +
                            str(serializer.errors))
        serializer.save()

        new_p = Personne.objects.get(pk=donnees["id"])
        self.assertEqual(new_p.prenom, "K")
        new_cours = new_p.cours.all()
        self.assertEqual(len(new_cours), 1)
        self.assertEqual(new_cours[0].id, 1)
        self.assertEqual(new_p.contact_nom, "MH")

    def test_update(self):
        donnees = self.donnees_personnes()
        serializer = PersonneSerializer(data=donnees)
        if not serializer.is_valid():
            self.assertTrue(False, "Invalid serializer: " +
                            str(serializer.errors))
        p = serializer.save()

        donnees.update({
            "contact_nom": "MGH",
            "paiements": [
                {
                    "methode": "CHEQUE",
                    "somme": 200,
                    "encaisse": True
                }
            ],
            "cours": [ 1 ],
            "prenom": "Karim",
            "certificat_medical": True
        })
        upd_serializer = PersonneSerializer(instance=p, data=donnees)
        if not upd_serializer.is_valid():
            self.assertTrue(False, "Invalid serializer: " +
                            str(upd_serializer.errors))
        print('Update with: ', upd_serializer.validated_data)
        upd_p = upd_serializer.save()
        self.assertEqual(upd_p.prenom, "Karim")
        self.assertEqual(upd_p.contact_nom, "MGH")
        inscription = Inscription.objects.filter(inscrit=upd_p)
        self.assertEqual(len(inscription), 1)
        inscription = inscription[0]
        self.assertEqual(inscription.paiements.count(), 1)
        self.assertTrue(inscription.certificat_medical)
        self.assertTrue(inscription.photo)
        self.assertFalse(inscription.fiche_adhesion)
        paiement = inscription.paiements.first()
        self.assertTrue(paiement.encaisse)
        self.assertEqual(paiement.somme, 200)
        self.assertEqual(paiement.methode, "CHEQUE")


class InitViewTest(APITestCase):
    def fill_data(self):
        self.debut = date.today() - timedelta(days=400)
        self.fin = self.debut + timedelta(days=100)
        prev_period = Periode.objects.create(debut=self.debut, fin=self.fin)
        arch_c = Cours.objects.create(
                    jour=0,
                    salle='Ranguin',
                    categorie='ADO',
                    horaire=time(hour=17),
                    dernier=self.fin,
                    periode=prev_period)

        self.debut = date.today() - timedelta(days=10)
        self.fin = self.debut + timedelta(days=200)
        periode = Periode.objects.create(debut=self.debut, fin=self.fin)

        self.c1 = Cours.objects.create(
                    jour=0,
                    salle='Ranguin',
                    categorie='ADO',
                    horaire=time(hour=17),
                    dernier=self.fin,
                    periode=periode)
        self.c2 = Cours.objects.create(
                    jour=1,
                    salle='Siagne',
                    categorie='ADULTE',
                    horaire=time(hour=16),
                    dernier=self.fin,
                    periode=periode)
        p1_id = uuid4()
        self.p1 = {
            "id": p1_id,
            "paiements": [
                {
                    "methode": "CHEQUE",
                    "somme": 200
                }
            ],
            "cours": [
                self.c2.id
            ],
            "contact_nom": "MH",
            "contact_principal_tel": "06",
            "prenom": "K",
            "nom": "S",
            "surnom": "I",
            "date_naissance": "1988-12-01",
            "telephone": "06",
            "taille_abada": "G",
            "droit_image": True,
            "photo": True,
            "fiche_adhesion": False,
            "certificat_medical": False
        }
        p_ser = PersonneSerializer(data=self.p1)
        self.assertTrue(p_ser.is_valid())
        p_ser.save()

        Presence(cours=DateCours.objects.filter(cours=self.c2).first(),
                 personne=Personne.objects.get(pk=p1_id),
                 present=True).save()

        self.assertEqual(Periode.latest(), periode)
        return str(p1_id)

    def test_get_init(self):
        '''
        Tests init message content.
        '''
        p1_id = self.fill_data()

        self.user = User.objects.create_user(
            username='testuser', password='12345')
        login = self.client.login(username='testuser', password='12345')
        response = self.client.get('/api/init/', format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.maxDiff = None
        content = json.loads(response.content)

        self.assertEqual(
            [{'categorie': 'ADO',
              'dernier': self.fin.isoformat(),
              'horaire': '17:00:00',
              'id': 2,
              'inscrits': [],
              'jour': 0,
              'periode': {'debut': self.debut.isoformat(), 'fin': self.fin.isoformat(), 'id': 3},
              'salle': 'Ranguin'},
             {'categorie': 'ADULTE',
              'dernier': self.fin.isoformat(),
              'horaire': '16:00:00',
              'id': 3,
              'inscrits': [p1_id],
              'jour': 1,
              'periode': {'debut': self.debut.isoformat(), 'fin': self.fin.isoformat(), 'id': 3},
              'salle': 'Siagne'}],
            content.get('cours'))

        matched_first = False
        self.assertGreater(len(content.get('dates', [])), 0)
        for date_cours in content['dates']:
            self.assertTrue('cours' in date_cours)
            self.assertTrue('date' in date_cours)
            self.assertTrue('id' in date_cours)
            self.assertTrue('presences' in date_cours)

            if not matched_first and date_cours['cours'] == self.c2.id:
                present = date_cours['presences'][0]
                self.assertEqual(present['personne'], p1_id)
                self.assertTrue(present['present'])
                matched_first = True
            else:
                self.assertEqual(len(date_cours['presences']), 0)

        self.assertTrue(matched_first)

        self.assertEqual(
            [{'adresse': None,
                'categorie': None,
                'certificat_medical': False,
                'contact_nom': 'MH',
                'contact_principal_tel': '06',
                'contact_secondaire_tel': None,
                'corde': None,
                'cours': [self.c2.id],
                'date_naissance': '1988-12-01',
                'droit_image': True,
                'fiche_adhesion': False,
                'id': p1_id,
                'nom': 'S',
                'paiements': [{'encaisse': False,
                               'encaissement': None,
                               'methode': 'CHEQUE',
                               'somme': 200}],
                'periode': {'debut': self.debut.isoformat(), 'fin': self.fin.isoformat(), 'id': 3},
                'photo': True,
                'prenom': 'K',
                'somme_totale': None,
                'surnom': 'I',
                'taille_abada': 'G',
                'telephone': '06'}],
            content.get('personnes')
        )
