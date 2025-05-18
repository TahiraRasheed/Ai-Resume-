from django.db import models

class Resume(models.Model):
    file = models.FileField(upload_to='uploads/')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    contact = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)  # NEW field
    skills = models.JSONField()
    qualifications = models.TextField(blank=True)
    parsed_at = models.DateTimeField(null=True)
    experience = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"
