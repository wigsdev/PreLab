from django.core.management.base import BaseCommand
from core.models import University, Course, Topic


class Command(BaseCommand):
    help = "Seeds the database with initial courses and topics"

    def handle(self, *args, **options):
        self.stdout.write("Seeding data...")

        # 1. Ensure University exists (PreLab needs a default context)
        # Note: Model uses 'items' for name and 'acronym' for code.
        uni, created = University.objects.get_or_create(
            acronym="UNC", defaults={"items": "Universidad Nacional de Cajamarca"}
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f"Created University: {uni.items}"))

        # 2. Define Courses and their initial Topics
        # Based on user input: 10 courses, 8 with initial topics ready.
        courses_data = [
            {
                "name": "Álgebra",
                "code": "alg",
                "topics": [
                    "Leyes de Exponentes",
                    "Polinomios",
                    "Ecuaciones",
                    "Funciones",
                ],
            },
            {
                "name": "Aritmética",
                "code": "arit",
                "topics": ["Razones y Proporciones", "Conjuntos", "Números Primos"],
            },
            {
                "name": "Biología",
                "code": "bio",
                "topics": ["Ser Vivo", "Biomoléculas", "Célula Eucariota"],
            },
            {
                "name": "Geometría",
                "code": "geo",
                "topics": ["Segmentos y Ángulos", "Triángulos", "Polígonos"],
            },
            {
                "name": "Educación Cívica y Humanidades",  # Abreviado como Humanidades
                "code": "hum",
                "topics": ["Derechos Humanos", "Constitución Política"],
            },
            {
                "name": "Química",
                "code": "quim",
                "topics": ["Materia y Energía", "Átomo", "Tabla Periódica"],
            },
            {
                "name": "Razonamiento Matemático",
                "code": "rm",
                "topics": [
                    "Operadores Matemáticos",
                    "Planteo de Ecuaciones",
                    "Sucesiones",
                ],
            },
            {
                "name": "Razonamiento Verbal",
                "code": "rv",
                "topics": [
                    "Sinónimos y Antónimos",
                    "Comprensión de Lectura",
                    "Analogías",
                ],
            },
            {
                "name": "Trigonometría",
                "code": "trig",
                "topics": [
                    "Ángulo Trigonométrico",
                    "Razones Trigonométricas",
                    "Identidades",
                ],
            },
            {
                "name": "Física",
                "code": "fis",
                "topics": ["Análisis Dimensional", "Cinemática", "Estática"],
            },
        ]

        for course_info in courses_data:
            course, created = Course.objects.get_or_create(
                name=course_info["name"],
                defaults={"code": course_info["code"]},
            )

            action = "Created" if created else "Found"
            self.stdout.write(f"{action} Course: {course.name}")

            # Create specific topics for this course
            for topic_name in course_info["topics"]:
                Topic.objects.get_or_create(
                    course=course,
                    name=topic_name,
                )

        self.stdout.write(self.style.SUCCESS("Successfully seeded courses and topics!"))
