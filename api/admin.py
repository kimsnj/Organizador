from django.contrib import admin
from .models import Personne, Cours, DateCours, Presence, Inscription

admin.site.register(Personne)
admin.site.register(Cours)
admin.site.register(DateCours)
admin.site.register(Presence)
admin.site.register(Inscription)
