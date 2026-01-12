import json
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from core.models import Course, Topic, Question, Option


class Command(BaseCommand):
    help = "Seeds questions from fixtures"

    def handle(self, *args, **options):
        self.stdout.write("Seeding questions...")

        # Path to fixture
        fixture_path = os.path.join(
            settings.BASE_DIR, "core", "fixtures", "algebra_questions.json"
        )

        if not os.path.exists(fixture_path):
            self.stdout.write(self.style.ERROR(f"Fixture not found at {fixture_path}"))
            return

        with open(fixture_path, "r", encoding="utf-8") as f:
            questions_data = json.load(f)

        count_created = 0
        for q_data in questions_data:
            # 1. Get Course and Topic
            try:
                course = Course.objects.get(name=q_data["course"])
                topic, _ = Topic.objects.get_or_create(
                    course=course, name=q_data["topic"]
                )
            except Course.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(
                        f"Course '{q_data['course']}' not found. Skipping."
                    )
                )
                continue

            # 2. Check existence to avoid duplicates
            if Question.objects.filter(
                statement=q_data["statement"], topic=topic
            ).exists():
                self.stdout.write(f"Question exists: {q_data['statement'][:30]}...")
                continue

            # 3. Create Question
            question = Question.objects.create(
                topic=topic,
                statement=q_data["statement"],
                difficulty=q_data.get("difficulty", "INTERMEDIO"),
                explanation=q_data.get("explanation", ""),
            )

            # 4. Create Options
            for opt in q_data["options"]:
                Option.objects.create(
                    question=question, text=opt["text"], is_correct=opt["is_correct"]
                )

            count_created += 1

        self.stdout.write(
            self.style.SUCCESS(f"Successfully created {count_created} questions!")
        )
