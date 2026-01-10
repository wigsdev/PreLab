from rest_framework import serializers
from .models import Course, Topic, Question, Option

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    # Nested Serializer: Incluye las opciones directamente dentro de la pregunta
    options = OptionSerializer(many=True, read_only=True)
    topic_name = serializers.CharField(source='topic.name', read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'statement', 'topic_name', 'difficulty', 'image', 'options', 'explanation']

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name', 'course']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'code']

from .models import ExamAttempt

class ExamAttemptSerializer(serializers.ModelSerializer):
    topic_name = serializers.CharField(source='topic.name', read_only=True)

    class Meta:
        model = ExamAttempt
        fields = ['id', 'topic', 'topic_name', 'score', 'correct_count', 'total_questions', 'created_at']
        read_only_fields = ['user', 'created_at']
