# Generated by Django 4.0 on 2021-12-27 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blood_bank_management_system', '0004_alter_donors_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donors',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]