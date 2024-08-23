from django.contrib import admin

# Register your models here.
from .models import InstanceModel

#uncomment the next line to manage using the admin panel
admin.site.register(InstanceModel) 