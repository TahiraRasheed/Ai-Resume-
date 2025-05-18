import json
import openai
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from resume.models import Resume
from jobs.models import Job

openai.api_key = settings.OPENAI_API_KEY

@api_view(['GET'])
def list_matches(request, job_id):
    """Compute and return for each resume: match_score, total years of relevant experience, matching skills, contact, email, and location."""
    try:
        job = Job.objects.get(pk=job_id)
    except Job.DoesNotExist:
        return Response({'error': 'Job not found.'}, status=status.HTTP_404_NOT_FOUND)

    results = []
    for r in Resume.objects.all():
        # Prompt OpenAI for match_score, years_experience, relevant_skills, and candidate location
        prompt = (
            f"For a job '{job.title}' requiring skills {getattr(job, 'skills', [])}, "
            f"evaluate this candidate {r.name} with skills {r.skills} and experience_summary {r.experience}. "
            "Extract JSON with keys: 'match_score' (0-100), 'years_experience' (number), "
            "'relevant_skills' (list of skill names), 'candidate_location' (text)."
        )
        completion = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[{'role': 'user', 'content': prompt}],
            temperature=0
        )
        try:
            data = json.loads(completion.choices[0].message.content)
        except json.JSONDecodeError:
            data = {
                'match_score': 0,
                'years_experience': 0,
                'relevant_skills': [],
                'candidate_location': ''
            }

        results.append({
            
            'resume_name': r.name,
            'email': r.email,
            'contact': r.contact,
            'location': r.location,
            'match_score': data.get('match_score', 0),
            'years_experience': data.get('years_experience', 0),
            'relevant_skills': data.get('relevant_skills', []),
        })

    # filter out resumes with match_score <= 50
    results = [r for r in results if r['match_score'] > 50]
    # sort by match_score descending
    results.sort(key=lambda x: x['match_score'], reverse=True)
    return Response(results)


@api_view(['PATCH'])
def update_match(request, pk):
    """Partial update of status and notes for a specific Match record."""
    try:
        match = Match.objects.get(pk=pk)
    except Match.DoesNotExist:
        return Response({'error': 'Match not found.'}, status=status.HTTP_404_NOT_FOUND)

    status_val = request.data.get('status')
    notes_val = request.data.get('notes')

    if status_val is not None:
        match.status = status_val
    if notes_val is not None:
        match.notes = notes_val

    match.save()
    return Response({
        'id': match.id,
        'status': match.status,
        'notes': match.notes
    })
