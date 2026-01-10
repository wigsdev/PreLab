from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course, Topic, Question
from .serializers import CourseSerializer, TopicSerializer, QuestionSerializer

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

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Vista para listar Preguntas.
    Soporta filtrado por tema: /api/questions/?topic=1
    """
    queryset = Question.objects.all().order_by('-created_at')
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """
        Permite filtrar preguntas por ID de tema usando ?topic=ID
        """
        queryset = super().get_queryset()
        topic_id = self.request.query_params.get('topic')
        if topic_id:
            queryset = queryset.filter(topic_id=topic_id)

        course_id = self.request.query_params.get('course')
        if course_id:
            queryset = queryset.filter(topic__course_id=course_id)

        return queryset

    @action(detail=False, methods=['get'])
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
            qs = Question.objects.filter(topic__course=course).order_by('?')[:5]
            questions.extend(qs)
            
        serializer = self.get_serializer(questions, many=True)
        return Response(serializer.data)
