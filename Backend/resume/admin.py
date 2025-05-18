from django.contrib import admin
from django.utils.html import format_html
from django import forms
from .models import Resume

class ResumeAdminForm(forms.ModelForm):
    class Meta:
        model = Resume
        fields = '__all__'
        widgets = {
            'skills': forms.Textarea(attrs={'rows': 4, 'cols': 60}),
            'experience': forms.Textarea(attrs={'rows': 4, 'cols': 60}),
        }

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    form = ResumeAdminForm
    list_display = ('id', 'name', 'email', 'contact', 'created_at', 'display_skills', 'short_experience', 'location','download_resume')
    search_fields = ('name', 'email', 'contact')
    list_filter = ('created_at', 'parsed_at')
    readonly_fields = ('parsed_at',)
    fieldsets = (
        (None, {
            'fields': ('file', 'download_resume', 'name', 'email', 'contact')
        }),
        ('Resume Details', {
            'fields': ('skills', 'qualifications', 'experience', 'parsed_at')
        }),
    )

    def download_resume(self, obj):
        if obj.file:
            return format_html('<a href="{}" download>Download</a>', obj.file.url)
        return "-"
    download_resume.short_description = "Resume File"

    def display_skills(self, obj):
        if isinstance(obj.skills, list):
            return ', '.join(obj.skills)
        elif isinstance(obj.skills, dict):
            return ', '.join(f"{k}: {v}" for k, v in obj.skills.items())
        return str(obj.skills)
    display_skills.short_description = "Skills"

    def short_experience(self, obj):
        return (obj.experience[:75] + '...') if obj.experience and len(obj.experience) > 75 else obj.experience
    short_experience.short_description = "Experience"
