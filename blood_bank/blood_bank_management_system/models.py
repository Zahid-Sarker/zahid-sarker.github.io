from django.db import models

# Create your models here.
blood_groups = (
    ('O+', 'O+'),
    ('A+', 'A+'),
    ('O-', 'O-'),
    ('B+', 'B+'),
    ('A-', 'A-'),
    ('AB+', 'AB+'),
    ('B-', 'B-'),
    ('AB-', 'AB-')
)

genders = (
    ('male', 'Male'),
    ('female', 'Female'),
    ('others', 'Prefer not to say')
)

class Donors(models.Model):
    name = models.CharField(max_length=100, blank=False, null=True)
    username = models.CharField(max_length=100, null=True, unique=True)
    blood_group = models.CharField(max_length=30, blank=False, choices=blood_groups, null=True)
    gender = models.CharField(max_length=20, blank=False, choices=genders, null=True)
    age = models.IntegerField(blank=False, null=True)
    email = models.CharField(max_length=120, blank=False, unique=True, null=True)
    location = models.CharField(max_length=200, blank=False, null=True)

    def __str__(self):
        return self.name + " | " + self.blood_group + " | " + self.location