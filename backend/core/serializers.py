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
    course_name = serializers.CharField(source='topic.course.name', read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'statement', 'topic', 'topic_name', 'course_name', 'difficulty', 'image', 'options', 'explanation', 'created_at']

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
        fields = ['id', 'course', 'topic', 'topic_name', 'exam_type', 'score', 'correct_count', 'total_questions', 'created_at']
        read_only_fields = ['user', 'created_at']
