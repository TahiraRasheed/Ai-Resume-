from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=200)
    department = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    skills = models.TextField()
    status = models.CharField(max_length=100)
    postdate = models.DateField()
  
    def __str__(self):
        return self.title
