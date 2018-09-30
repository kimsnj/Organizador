from django.contrib import admin
from .models import Personne, Cours, DateCours, Presence, Periode, Inscription, Paiement

admin.site.register(Personne)
admin.site.register(Cours)
admin.site.register(DateCours)
admin.site.register(Presence)
admin.site.register(Periode)
admin.site.register(Inscription)
admin.site.register(Paiement)