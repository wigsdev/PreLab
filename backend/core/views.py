from rest_framework import viewsets, permissions
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
        return queryset
