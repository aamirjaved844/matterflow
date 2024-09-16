from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_processes, name='get processes'),
    path('new', views.new_process, name='new process'),
    path('start', views.start_process, name='start process'),
    path('stop', views.stop_process, name='stop process'),
    path('delete', views.delete_process, name='delete process'),
]
