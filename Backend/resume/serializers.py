from rest_framework import serializers
from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = [
            'id',
            'file',
            'name',
            'email',
            'contact',
            'skills',
            'qualifications',
            'experience',
            'parsed_at',
            'created_at',
        ]