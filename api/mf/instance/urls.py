from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_instances, name='get instances'),
    path('new', views.new_instance, name='new instance'),
    path('<str:instance_id>', views.handle_instance, name='handle instance'),    
]
