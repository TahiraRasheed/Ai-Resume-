from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jobs.urls')),
    path('api/resume/', include('resume.urls')),
    path('api/', include('annalytics.urls')),
]