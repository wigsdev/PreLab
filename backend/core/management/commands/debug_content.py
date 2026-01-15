from django.core.management.base import BaseCommand
from core.models import Course, Question, Option


class Command(BaseCommand):
    help = "Debugs database content visibility"

    def handle(self, *args, **options):
        self.stdout.write("--- COURSE ANALYSIS ---")
        for c in Course.objects.all():
            q_count = Question.objects.filter(topic__course=c).count()
            self.stdout.write(f"[{c.code}] {c.name}: {q_count} questions")

        self.stdout.write("\n--- HUMANIDADES CHECK ---")
        try:
            hum = Course.objects.get(code__istartswith="hum")
            questions = Question.objects.filter(topic__course=hum)
            if questions.exists():
                q = questions.first()
                self.stdout.write(f"First Question: {q.statement[:50]}...")
                self.stdout.write(f"Topic: {q.topic.name}")
            else:
                self.stdout.write("No questions found for Humanidades.")
        except Course.DoesNotExist:
            self.stdout.write("Course Humanidades not found by code 'hum*'.")

        self.stdout.write("\n--- RAZ. MATEMATICO OPTIONS CHECK ---")
        try:
            rm = Course.objects.get(code="rm")
            # Check the last 3 questions
            questions = Question.objects.filter(topic__course=rm).order_by("-id")[:3]
            for q in questions:
                opt_count = Option.objects.filter(question=q).count()
                self.stdout.write(
                    f"QID {q.id}: {q.statement[:30]}... | Options: {opt_count}"
                )
                if opt_count == 0:
                    self.stdout.write(self.style.WARNING("  -> NO OPTIONS FOUND!"))
        except Course.DoesNotExist:
            self.stdout.write("Course RM not found.")
        self.stdout.write("\n--- TRIGONOMETRIA CHECK ---")
        try:
            trig = Course.objects.get(name="Trigonometría")
            questions = Question.objects.filter(topic__course=trig).order_by("-id")[:5]
            if questions.exists():
                for q in questions:
                    self.stdout.write(
                        f"QID {q.id}: {q.statement[:40]}... | Options: {q.options.count()}"
                    )
            else:
                self.stdout.write("No questions found for Trigonometría.")
        except Course.DoesNotExist:
            self.stdout.write("Course Trigonometría not found.")
