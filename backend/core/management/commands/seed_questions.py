import json
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from core.models import Course, Topic, Question, Option


class Command(BaseCommand):
    help = "Seeds questions from fixtures"

    def handle(self, *args, **options):
        self.stdout.write("Seeding questions...")

        fixtures_dir = os.path.join(settings.BASE_DIR, "core", "fixtures")
        fixture_files = [
            "algebra_questions.json",
            "aritmetica_questions.json",
            "biologia_questions.json",
            "geometria_questions.json",
        ]

        total_created = 0

        for filename in fixture_files:
            fixture_path = os.path.join(fixtures_dir, filename)

            if not os.path.exists(fixture_path):
                self.stdout.write(self.style.WARNING(f"Fixture not found: {filename}"))
                continue

            self.stdout.write(f"Processing {filename}...")

            try:
                with open(fixture_path, "r", encoding="utf-8") as f:
                    questions_data = json.load(f)
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error reading {filename}: {e}"))
                continue

            count_created_file = 0
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
                            f"Course '{q_data['course']}' not found for question. Skipping."
                        )
                    )
                    continue

                # 2. Check existence to avoid duplicates
                if Question.objects.filter(
                    statement=q_data["statement"], topic=topic
                ).exists():
                    # self.stdout.write(f"Question exists: {q_data['statement'][:30]}...")
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
                        question=question,
                        text=opt["text"],
                        is_correct=opt["is_correct"],
                    )

                count_created_file += 1

            self.stdout.write(f"  Added {count_created_file} questions from {filename}")
            total_created += count_created_file

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeding complete. Total new questions: {total_created}"
            )
        )
