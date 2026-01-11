import json
from django.core.management.base import BaseCommand
from core.models import Question, Option, Topic, Course


class Command(BaseCommand):
    help = "Import questions from a JSON file"

    def add_arguments(self, parser):
        parser.add_argument("json_file", type=str, help="Path to the JSON file")

    def handle(self, *args, **kwargs):
        json_file = kwargs["json_file"]

        try:
            with open(json_file, "r", encoding="utf-8") as file:
                data = json.load(file)

            for item in data:
                # 1. Buscar o Crear Curso
                course, _ = Course.objects.get_or_create(
                    code=item["course_code"], defaults={"name": item["course_name"]}
                )

                # 2. Buscar o Crear Tema
                topic, _ = Topic.objects.get_or_create(
                    name=item["topic_name"], course=course
                )

                # 3. Crear Pregunta
                question = Question.objects.create(
                    topic=topic,
                    statement=item["statement"],
                    difficulty=item.get("difficulty", "INTERMEDIO"),
                    explanation=item.get("explanation", ""),
                )

                # 4. Crear Opciones
                for opt in item["options"]:
                    Option.objects.create(
                        question=question,
                        text=opt["text"],
                        is_correct=opt["is_correct"],
                    )

                self.stdout.write(self.style.SUCCESS(f"Created: {question}"))

            self.stdout.write(self.style.SUCCESS("Successfully imported all questions"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File "{json_file}" not found.'))
        except json.JSONDecodeError:
            self.stdout.write(self.style.ERROR("Invalid JSON format."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error: {str(e)}"))
