# Generated by Django 5.0.6 on 2024-07-09 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connection', '0003_alter_connectionmodel_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connectionmodel',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
