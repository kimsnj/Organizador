# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-09-07 20:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cours',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jour', models.SmallIntegerField(choices=[(0, 'Lundi'), (1, 'Mardi'), (2, 'Mercredi'), (3, 'Jeudi'), (4, 'Vendredi'), (5, 'Samedi'), (6, 'Dimanche')])),
                ('salle', models.CharField(max_length=50)),
                ('categorie', models.CharField(choices=[('EVEIL', 'Éveil'), ('ENFANT', 'Enfant'), ('ADO', 'Adolescent'), ('ADULTE', 'Adulte')], max_length=10)),
                ('horaire', models.TimeField()),
                ('dernier', models.DateField()),
            ],
            options={
                'verbose_name': 'Cours',
                'verbose_name_plural': 'Cours',
            },
        ),
        migrations.CreateModel(
            name='DateCours',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(db_index=True)),
                ('cours', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dates', to='api.Cours')),
            ],
            options={
                'verbose_name': 'Date de cours',
                'verbose_name_plural': 'Dates de cours',
            },
        ),
        migrations.CreateModel(
            name='Paiement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('methode', models.CharField(choices=[('ESPECE', 'Espèce'), ('CHEQUE', 'Chèque'), ('VIREMENT', 'Virement')], max_length=10)),
                ('somme', models.IntegerField()),
                ('encaissement', models.DateField(blank=True, null=True)),
                ('encaisse', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Paiement',
                'verbose_name_plural': 'Paiements',
            },
        ),
        migrations.CreateModel(
            name='Personne',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('prenom', models.CharField(db_index=True, max_length=50)),
                ('nom', models.CharField(db_index=True, max_length=50)),
                ('surnom', models.CharField(blank=True, db_index=True, max_length=50, null=True)),
                ('date_naissance', models.DateField(blank=True, null=True)),
                ('telephone', models.CharField(blank=True, max_length=50, null=True)),
                ('adresse', models.TextField(blank=True, null=True)),
                ('categorie', models.CharField(blank=True, choices=[('EVEIL', 'Éveil'), ('ENFANT', 'Enfant'), ('ADO', 'Adolescent'), ('ADULTE', 'Adulte')], max_length=10, null=True)),
                ('corde', models.CharField(blank=True, max_length=20, null=True)),
                ('taille_abada', models.CharField(blank=True, choices=[('P', 'Petit'), ('M', 'Moyen'), ('G', 'Grand'), ('GG', 'Très grand')], max_length=2, null=True)),
                ('droit_image', models.BooleanField(default=False)),
                ('photo', models.BooleanField(default=False)),
                ('fiche_adhesion', models.BooleanField(default=False)),
                ('certificat_medical', models.BooleanField(default=False)),
                ('contacts', models.ManyToManyField(blank=True, to='api.Personne')),
                ('cours', models.ManyToManyField(blank=True, related_name='inscrits', to='api.Cours')),
            ],
            options={
                'verbose_name': 'Personne',
                'verbose_name_plural': 'Personnes',
            },
        ),
        migrations.CreateModel(
            name='Presence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('present', models.BooleanField()),
                ('cours', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='presences', to='api.DateCours')),
                ('personne', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Personne')),
            ],
            options={
                'verbose_name': 'Presence',
                'verbose_name_plural': 'Presences',
            },
        ),
        migrations.AddField(
            model_name='paiement',
            name='payeur',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='paiements', to='api.Personne'),
        ),
        migrations.AlterUniqueTogether(
            name='personne',
            unique_together=set([('prenom', 'nom')]),
        ),
    ]
