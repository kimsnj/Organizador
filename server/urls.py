"""organisador URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from api import views as api_views
from . import views

router = routers.DefaultRouter()
router.register(r'personnes', api_views.PersonneViewSet)
router.register(r'cours', api_views.CoursViewSet)
router.register(r'paiements', api_views.PaiementViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # Catch all query that returns the index page.
    # To be left at the end to handle pushState history
    url(r'^', views.FrontendAppView.as_view()),
]
