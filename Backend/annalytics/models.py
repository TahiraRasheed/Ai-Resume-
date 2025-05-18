# analytics/models.py

from django.db import models
from resume.models import Resume
from jobs.models import Job

class Match(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='matches')
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='matches')
    score = models.FloatField(help_text='Match percentage 0–100')
    matched_skills = models.JSONField()
    matched_experience = models.JSONField()

    # NEW fields for per-row editability
    status = models.CharField(max_length=50, default='Pending', help_text='Current candidate status')  # :contentReference[oaicite:0]{index=0}
    notes = models.TextField(blank=True, default='', help_text='Reviewer notes')  # :contentReference[oaicite:1]{index=1}

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('job', 'resume')
