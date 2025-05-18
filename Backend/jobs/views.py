from rest_framework import viewsets
from .models import Job
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides `list`, `create`, `retrieve`, `update`, and `destroy` actions for Job.
    """
    queryset = Job.objects.all().order_by('-postdate')
    serializer_class = JobSerializer