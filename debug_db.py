import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.join(os.getcwd(), 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import Course, Question, Option

def analyze_courses():
    print("\n--- Courses Analysis ---")
    courses = Course.objects.all()
    for c in courses:
        q_count = Question.objects.filter(topic__course=c).count()
        print(f"ID: {c.id} | Name: '{c.name}' | Code: '{c.code}' | Questions: {q_count}")

def analyze_rm_options():
    print("\n--- RM Question Analysis ---")
    try:
        rm_course = Course.objects.get(name="Razonamiento Matemático")
        questions = Question.objects.filter(topic__course=rm_course).order_by('-id')[:3] # Get last 3
        for q in questions:
            print(f"\nQuestion ID: {q.id} | Statement: {q.statement[:50]}...")
            print(f"Explanation Length: {len(q.explanation)}")
            options = Option.objects.filter(question=q)
            print(f"Options Count: {options.count()}")
            for opt in options:
                print(f" - {opt.text} (Correct: {opt.is_correct})")
    except Course.DoesNotExist:
        print("Course 'Razonamiento Matemático' not found.")

if __name__ == "__main__":
    analyze_courses()
    analyze_rm_options()
