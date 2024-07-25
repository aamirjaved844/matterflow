from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_processes, name='get processes'),
    path('new', views.new_process, name='new process'),
]
