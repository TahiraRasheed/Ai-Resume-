# analytics/serializers.py

from rest_framework import serializers
from .models import Match

class MatchSerializer(serializers.ModelSerializer):
    resume_name = serializers.CharField(source='resume.name', read_only=True)

    class Meta:
        model = Match
        fields = [
            'id',
            'job',
            'resume',
            'resume_name',
            'score',
            'matched_skills',
            'matched_experience',
            'status',          # NEW
            'notes',           # NEW
            'created_at',
        ]
        read_only_fields = ['created_at']
