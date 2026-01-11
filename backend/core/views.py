from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import (
    Course,
    Topic,
    Question,
    ExamAttempt,
    ExamAttemptAnswer,
    QuestionReport,
)
from .serializers import (
    CourseSerializer,
    TopicSerializer,
    QuestionSerializer,
    ExamAttemptSerializer,
    ExamAttemptDetailSerializer,
    QuestionReportSerializer,
)
from rest_framework import status
from django.contrib.auth import get_user_model
from django.db.models import Avg, Count
from django.utils import timezone
from datetime import timedelta
from rest_framework.views import APIView

User = get_user_model()


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Vista para listar Cursos.
    """

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]


class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Vista para listar Temas.
    """

    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [permissions.AllowAny]


class QuestionViewSet(viewsets.ModelViewSet):
    """
    Vista CRUD para Preguntas.
    Lectura: Pública (AllowAny)
    Escritura: Solo Admin (IsAdminUser)
    """

    queryset = Question.objects.all().order_by("-created_at")
    serializer_class = QuestionSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        """
        Filtros Avanzados para Admin:
        - topic: ID del tema
        - course: ID del curso
        - difficulty: 'BASICO', 'INTERMEDIO', 'AVANZADO'
        - search: Búsqueda parcial en el enunciado
        """
        # Optimización DB: Traer Topic y Course en la misma consulta
        queryset = Question.objects.select_related("topic", "topic__course").order_by(
            "-created_at"
        )

        # Filtro por Tema
        topic_id = self.request.query_params.get("topic")
        if topic_id:
            queryset = queryset.filter(topic_id=topic_id)

        # Filtro por Curso
        course_id = self.request.query_params.get("course")
        if course_id:
            queryset = queryset.filter(topic__course_id=course_id)

        # Filtro por Dificultad
        difficulty = self.request.query_params.get("difficulty")
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)

        # Búsqueda por Texto (Enunciado)
        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(statement__icontains=search)

        return queryset

    @action(detail=False, methods=["get"])
    def simulation(self, request):
        """
        Retorna un examen balanceado: 5 preguntas de cada curso.
        Total: 30 preguntas (si hay 6 cursos).
        """
        questions = []
        courses = Course.objects.all()

        for course in courses:
            # Obtener preguntas del curso (a través de los topics)
            # Order by random '?' es costoso en DB grandes, pero ok para <1000 preguntas
            qs = Question.objects.filter(topic__course=course).order_by("?")[:5]
            questions.extend(qs)

        serializer = self.get_serializer(questions, many=True)
        return Response(serializer.data)


class ExamAttemptViewSet(viewsets.ModelViewSet):
    """
    Vista CRUD para intentos de examen.
    Seguridad: Solo el usuario dueño puede ver sus propios intentos.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ExamAttempt.objects.filter(user=self.request.user).order_by(
            "-created_at"
        )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ExamAttemptDetailSerializer
        return ExamAttemptSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Exception as e:
            # En producción, usar logger.error(e)
            print(f"Error retrieving attempt: {e}")
            return Response(
                {"detail": "Hubo un error al cargar los detalles del examen."},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def create(self, request, *args, **kwargs):
        try:
            answers_data = request.data.get("answers", [])
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            # Asignar usuario y guardar intento
            attempt = serializer.save(user=self.request.user)

            # Guardar respuestas detalladas si existen
            if answers_data:
                answer_objs = []
                for ans in answers_data:
                    # Validate IDs are present to avoid IntegrityError
                    # (though None is allowed for option)
                    q_id = ans.get("question_id")
                    if not q_id:
                        continue  # Skip invalid answers

                    answer_objs.append(
                        ExamAttemptAnswer(
                            attempt=attempt,
                            question_id=q_id,
                            selected_option_id=ans.get("selected_option_id"),
                            is_correct=ans.get("is_correct", False),
                        )
                    )

                if answer_objs:
                    ExamAttemptAnswer.objects.bulk_create(answer_objs)

            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED, headers=headers
            )
        except Exception as e:
            import traceback

            traceback.print_exc()  # Print to server console
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class QuestionReportViewSet(viewsets.ModelViewSet):
    """
    Endpoint para reportar errores en preguntas.
    """

    queryset = QuestionReport.objects.all()
    serializer_class = QuestionReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AnalyticsView(APIView):
    """
    Endpoint para métricas del Dashboard Admin.
    """

    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        # 1. Totales
        total_students = User.objects.filter(is_staff=False).count()
        total_exams = ExamAttempt.objects.count()

        # 2. Promedio General
        avg_score = ExamAttempt.objects.aggregate(Avg("score"))["score__avg"] or 0

        # 3. Actividad Semanal (Gráfico de Tendencia)
        last_week = timezone.now() - timedelta(days=7)
        exams_this_week = ExamAttempt.objects.filter(created_at__gte=last_week).count()

        trend_data = []
        for i in range(7):
            day = timezone.now() - timedelta(days=6 - i)
            count = ExamAttempt.objects.filter(
                created_at__year=day.year,
                created_at__month=day.month,
                created_at__day=day.day,
            ).count()
            trend_data.append({"date": day.strftime("%d/%m"), "count": count})

        # 4. Actividad Reciente (Mejorada)
        recent_activity = ExamAttempt.objects.select_related(
            "user", "topic", "topic__course", "course"
        ).order_by("-created_at")[:5]
        recent_data = []
        for attempt in recent_activity:
            # Lógica para determinar el nombre y tipo del examen
            if attempt.topic:
                # Caso: Examen de un Tema Específico
                exam_name = attempt.topic.course.name
                exam_detail = attempt.topic.name
                type_label = "Simulacro"  # O "Práctica" si prefieres diferenciar temas específicos
            elif attempt.course:
                # Caso: Simulacro por Curso
                exam_name = attempt.course.name
                exam_detail = "Todos los temas"
                type_label = "Simulacro"
            else:
                # Caso: Simulacro Integral
                exam_name = "Integral"
                exam_detail = "Todas las áreas"
                type_label = "Simulacro"

            # Personalización adicional para labels
            if attempt.exam_type == "INTEGRAL":
                type_label = (
                    "Integral"  # Para diferenciar visualmente el Badge si se desea
                )
                exam_name = "Integral"

            recent_data.append(
                {
                    "id": attempt.id,
                    "user": (
                        f"{attempt.user.first_name} {attempt.user.last_name}"
                        if attempt.user.first_name
                        else attempt.user.email.split("@")[0]
                    ),
                    "exam_name": exam_name,
                    "exam_detail": exam_detail,
                    "type_label": type_label,
                    "exam_type": attempt.exam_type,
                    "score": attempt.score,
                    "date": attempt.created_at,
                }
            )

        # 5. Top Estudiantes (Promedio > 0, min 1 examen)
        top_students_qs = (
            ExamAttempt.objects.values(
                "user__first_name", "user__last_name", "user__email"
            )
            .annotate(avg_score=Avg("score"), total_exams=Count("id"))
            .order_by("-avg_score")[:5]
        )

        top_students = []
        for s in top_students_qs:
            name = (
                f"{s['user__first_name']} {s['user__last_name']}"
                if s["user__first_name"]
                else s["user__email"].split("@")[0]
            )
            top_students.append(
                {
                    "name": name,
                    "avg_score": round(s["avg_score"], 1),
                    "exams": s["total_exams"],
                }
            )

        return Response(
            {
                "total_students": total_students,
                "total_exams": total_exams,
                "average_score": round(avg_score, 1),
                "exams_this_week": exams_this_week,
                "trend_data": trend_data,
                "recent_activity": recent_data,
                "top_students": top_students,
            }
        )
