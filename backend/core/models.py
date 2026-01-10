from django.db import models

class University(models.Model):
    """
    Representa una universidad (ej. UNMSM, UNI, Villarreal).
    """
    items = models.CharField(max_length=100, help_text="Nombre de la universidad")
    acronym = models.CharField(max_length=20, help_text="Siglas (ej. UNMSM)")

    class Meta:
        verbose_name = "Universidad"
        verbose_name_plural = "Universidades"

    def __str__(self):
        return f"{self.acronym} - {self.items}"

class Course(models.Model):
    """
    Representa un curso general (ej. Historia del Perú, Álgebra).
    """
    name = models.CharField(max_length=100)
    code = models.SlugField(max_length=20, unique=True, help_text="Código único para URLs (ej. historia-peru)")

    class Meta:
        verbose_name = "Curso"
        verbose_name_plural = "Cursos"

    def __str__(self):
        return self.name

class Topic(models.Model):
    """
    Temas específicos dentro de un curso (ej. Guerra del Pacífico, Polinomios).
    """
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='topics')
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = "Tema"
        verbose_name_plural = "Temas"

    def __str__(self):
        return f"{self.course.name} - {self.name}"

class Question(models.Model):
    """
    La unidad base del examen.
    """
    DIFFICULTY_CHOICES = [
        ('BASICO', 'Básico'),
        ('INTERMEDIO', 'Intermedio'),
        ('AVANZADO', 'Avanzado'),
    ]

    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='questions')
    statement = models.TextField(help_text="Enunciado de la pregunta")
    image = models.ImageField(upload_to='preguntas/', blank=True, null=True, help_text="Imagen opcional (gráficos, geometría)")
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='INTERMEDIO')
    explanation = models.TextField(help_text="Explicación para el feedback (Qué aprendimos)")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Pregunta"
        verbose_name_plural = "Preguntas"

    def __str__(self):
        return f"[{self.topic.course.code}] {self.statement[:50]}..."

class Option(models.Model):
    """
    Opciones de respuesta para una pregunta (A, B, C, D, E).
    """
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    text = models.CharField(max_length=500, help_text="Texto de la alternativa")
    is_correct = models.BooleanField(default=False, help_text="¿Es la respuesta correcta?")

    class Meta:
        verbose_name = "Opción"
        verbose_name_plural = "Opciones"

    def __str__(self):
        prefix = "✅" if self.is_correct else "❌"
        return f"{prefix} {self.text}"

from django.conf import settings

class ExamAttempt(models.Model):
    """
    Registro de un intento de examen realizado por un usuario.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='exam_attempts')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='attempts', null=True, blank=True)
    score = models.FloatField(help_text="Puntaje obtenido (ej. 14.5)")
    correct_count = models.IntegerField(help_text="Cantidad de respuestas correctas")
    total_questions = models.IntegerField(help_text="Total de preguntas en el examen")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Intento de Examen"
        verbose_name_plural = "Intentos de Examen"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} - {self.score}/{self.total_questions} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"
