from django.contrib import admin

# Register your models here.
from .models import ConnectionModel

#uncomment the next line to manage using the admin panel
admin.site.register(ConnectionModel) 