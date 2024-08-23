from django.db import models

class InstanceModel(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    json_data = models.TextField()

    def __str__(self):
        return self.name