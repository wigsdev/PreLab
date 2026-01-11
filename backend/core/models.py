from django.db import models
from django.conf import settings


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
    code = models.SlugField(
        max_length=20,
        unique=True,
        help_text="Código único para URLs (ej. historia-peru)",
    )

    class Meta:
        verbose_name = "Curso"
        verbose_name_plural = "Cursos"

    def __str__(self):
        return self.name


class Topic(models.Model):
    """
    Temas específicos dentro de un curso (ej. Guerra del Pacífico, Polinomios).
    """

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="topics")
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
        ("BASICO", "Básico"),
        ("INTERMEDIO", "Intermedio"),
        ("AVANZADO", "Avanzado"),
    ]

    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="questions")
    statement = models.TextField(help_text="Enunciado de la pregunta")
    image = models.ImageField(
        upload_to="preguntas/",
        blank=True,
        null=True,
        help_text="Imagen opcional (gráficos, geometría)",
    )
    difficulty = models.CharField(
        max_length=20, choices=DIFFICULTY_CHOICES, default="INTERMEDIO"
    )
    explanation = models.TextField(
        help_text="Explicación para el feedback (Qué aprendimos)"
    )

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

    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="options"
    )
    text = models.CharField(max_length=500, help_text="Texto de la alternativa")
    is_correct = models.BooleanField(
        default=False, help_text="¿Es la respuesta correcta?"
    )

    class Meta:
        verbose_name = "Opción"
        verbose_name_plural = "Opciones"

    def __str__(self):
        prefix = "✅" if self.is_correct else "❌"
        return f"{prefix} {self.text}"


class ExamAttempt(models.Model):
    """
    Registro de un intento de examen realizado por un usuario.
    """

    EXAM_TYPE_CHOICES = [
        ("COURSE", "Por Curso"),
        ("INTEGRAL", "Simulacro Integral"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="exam_attempts"
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="attempts", null=True, blank=True
    )
    topic = models.ForeignKey(
        Topic, on_delete=models.CASCADE, related_name="attempts", null=True, blank=True
    )
    exam_type = models.CharField(
        max_length=20, choices=EXAM_TYPE_CHOICES, default="COURSE"
    )
    score = models.FloatField(help_text="Puntaje obtenido (ej. 14.5)")
    correct_count = models.IntegerField(help_text="Cantidad de respuestas correctas")
    total_questions = models.IntegerField(help_text="Total de preguntas en el examen")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Intento de Examen"
        verbose_name_plural = "Intentos de Examen"
        ordering = ["-created_at"]

    def __str__(self):
        date_str = self.created_at.strftime("%Y-%m-%d %H:%M")
        return f"{self.user} - {self.score}/{self.total_questions} ({date_str})"


class ExamAttemptAnswer(models.Model):
    """
    Guarda el detalle de cada respuesta marcada por el usuario en un intento.
    Permite la funcionalidad de 'Revisión de Examen'.
    """

    attempt = models.ForeignKey(
        ExamAttempt, on_delete=models.CASCADE, related_name="answers"
    )
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(
        Option,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text="Null si no respondió",
    )
    is_correct = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Respuesta de Intento"
        verbose_name_plural = "Respuestas de Intento"

    def __str__(self):
        return f"Intento {self.attempt.id} - Pregunta {self.question.id}"


class QuestionReport(models.Model):
    """
    Reportes de errores enviados por los estudiantes.
    """

    STATUS_CHOICES = [
        ("PENDING", "Pendiente"),
        ("REVIEWED", "Revisado"),
        ("RESOLVED", "Resuelto"),
        ("IGNORED", "Descartado"),
    ]

    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="reports"
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    reason = models.TextField(help_text="Motivo del reporte")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Reporte de Error"
        verbose_name_plural = "Reportes de Error"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Reporte {self.id} - {self.question}"
