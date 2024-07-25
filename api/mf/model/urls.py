from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_models, name='get models'),
    path('new', views.new_model, name='new model'),
    path('<str:model_id>', views.handle_model, name='handle model'),    
]
