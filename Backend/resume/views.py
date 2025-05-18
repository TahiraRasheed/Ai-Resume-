import json
import openai
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from PyPDF2 import PdfReader
from docx import Document

from .models import Resume
from .serializers import ResumeSerializer

# Initialize OpenAI API key
openai.api_key = settings.OPENAI_API_KEY


def extract_text(file_obj, content_type):
    file_obj.seek(0)
    if 'pdf' in content_type:
        reader = PdfReader(file_obj)
        return ''.join(page.extract_text() or '' for page in reader.pages)
    elif 'officedocument.wordprocessingml.document' in content_type:
        doc = Document(file_obj)
        return '\n'.join(p.text for p in doc.paragraphs)
    else:
        return file_obj.read().decode('utf-8', errors='ignore')


@api_view(['POST'])
def upload_resume(request):
    uploaded = request.FILES.get('resume')
    if not uploaded:
        return Response({'error': 'No file provided.'}, status=status.HTTP_400_BAD_REQUEST)

    # 1) Extract full text from the upload
    text = extract_text(uploaded, uploaded.content_type)

    # 2) Build prompt for GPT to parse all fields including location
    prompt = f"""
Extract the following from the resume text as JSON:
1. name
2. email
3. contact
4. location       # e.g. city, state, country—where this person is based
5. skills (list)
6. qualifications
7. experience_summary: list of {{"title": string, "years": number}} entries.
Provide exactly that JSON—nothing else.
Text: ```{text[:3000]}```
"""

    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
        )
        parsed = json.loads(completion.choices[0].message.content)
    except Exception as e:
        return Response({'error': f"Parsing error: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # 3) Persist to database, including the LLM-extracted location
    resume = Resume.objects.create(
        file=uploaded,
        name=parsed.get('name', ''),
        email=parsed.get('email', ''),
        contact=parsed.get('contact', ''),
        location=parsed.get('location', ''),        # ← now coming from the JSON
        
        skills=parsed.get('skills', []),

        qualifications=parsed.get('qualifications', ''),
        experience=json.dumps(parsed.get('experience_summary', []))
    )
    
    serializer = ResumeSerializer(resume)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
