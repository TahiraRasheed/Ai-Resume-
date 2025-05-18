from django.urls import path
from .views import list_matches, update_match

urlpatterns = [
   
    path('jobs/<int:job_id>/matches/', list_matches, name='job-matches'),
    path('matches/<int:pk>/', update_match, name='match-detail'),
]