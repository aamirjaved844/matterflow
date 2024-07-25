from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_connections, name='get connections'),
    path('new', views.new_connection, name='new connection'),
    path('<str:connection_id>', views.handle_connection, name='handle connection'),    
]
