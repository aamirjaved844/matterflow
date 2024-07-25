from django.contrib import admin

# Register your models here.
from .models import FlowModel

#uncomment the next line to manage using the admin panel
admin.site.register(FlowModel) 