from rest_framework import serializers
from .models import (
    Course,
    Topic,
    Question,
    Option,
    ExamAttempt,
    ExamAttemptAnswer,
    QuestionReport,
)


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "text", "is_correct"]


class QuestionSerializer(serializers.ModelSerializer):
    # Nested Serializer: Incluye las opciones directamente dentro de la pregunta
    options = OptionSerializer(many=True, read_only=True)
    topic_name = serializers.CharField(source="topic.name", read_only=True)
    course_name = serializers.CharField(source="topic.course.name", read_only=True)

    class Meta:
        model = Question
        fields = [
            "id",
            "statement",
            "topic",
            "topic_name",
            "course_name",
            "difficulty",
            "image",
            "options",
            "explanation",
            "created_at",
        ]


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ["id", "name", "course"]


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "name", "code"]


class ExamAttemptSerializer(serializers.ModelSerializer):
    topic_name = serializers.SerializerMethodField()
    course_name = serializers.SerializerMethodField()

    class Meta:
        model = ExamAttempt
        fields = [
            "id",
            "user",
            "course",
            "course_name",
            "topic",
            "topic_name",
            "exam_type",
            "score",
            "correct_count",
            "total_questions",
            "created_at",
        ]
        read_only_fields = ["user", "created_at"]

    def get_topic_name(self, obj):
        try:
            return obj.topic.name if obj.topic else None
        except Exception:
            return None

    def get_course_name(self, obj):
        try:
            return obj.course.name if obj.course else None
        except Exception:
            return None


class ExamAttemptAnswerSerializer(serializers.ModelSerializer):
    question_statement = serializers.SerializerMethodField()
    selected_option_text = serializers.SerializerMethodField()
    correct_option_text = serializers.SerializerMethodField()

    class Meta:
        model = ExamAttemptAnswer
        fields = [
            "id",
            "question",
            "question_statement",
            "selected_option",
            "selected_option_text",
            "is_correct",
            "correct_option_text",
        ]

    def get_question_statement(self, obj):
        try:
            return obj.question.statement
        except Exception:
            return "Pregunta no disponible"

    def get_selected_option_text(self, obj):
        try:
            return obj.selected_option.text if obj.selected_option else None
        except Exception:
            return None

    def get_correct_option_text(self, obj):
        try:
            correct_opt = obj.question.options.filter(is_correct=True).first()
            return correct_opt.text if correct_opt else None
        except Exception:
            return None


class ExamAttemptDetailSerializer(ExamAttemptSerializer):
    answers = ExamAttemptAnswerSerializer(many=True, read_only=True)

    class Meta(ExamAttemptSerializer.Meta):
        fields = ExamAttemptSerializer.Meta.fields + ["answers"]


class QuestionReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionReport
        fields = ["id", "question", "user", "reason", "status", "created_at"]
        read_only_fields = ["user", "status", "created_at"]
