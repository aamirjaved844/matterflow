from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_flows, name='get flows'),
    path('new', views.new_flow, name='new flow'),
    path('<str:flow_id>', views.handle_flow, name='handle flow'),   
]
