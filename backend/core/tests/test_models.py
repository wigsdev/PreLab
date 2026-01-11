import pytest
from core.models import Course, Topic, Question, ExamAttempt, ExamAttemptAnswer


@pytest.mark.django_db
class TestCoreModels:

    def test_course_creation(self):
        course = Course.objects.create(name="Mathematics", code="MATH101")
        assert course.name == "Mathematics"
        assert str(course) == "Mathematics"

    def test_topic_creation(self):
        course = Course.objects.create(name="History", code="HIST101")
        topic = Topic.objects.create(course=course, name="World War II")
        assert topic.name == "World War II"
        assert topic.course == course

    def test_question_creation(self):
        course = Course.objects.create(name="Physics", code="PHYS101")
        topic = Topic.objects.create(course=course, name="Kinematics")
        question = Question.objects.create(
            topic=topic, statement="What is velocity?", difficulty="BASICO"
        )
        # Verify Question
        assert question.statement == "What is velocity?"

        # Verify Options logic (Separate model)
        from core.models import Option

        Option.objects.create(
            question=question, text="Speed with direction", is_correct=True
        )
        Option.objects.create(question=question, text="Just speed", is_correct=False)

        assert question.options.count() == 2
        assert (
            question.options.filter(is_correct=True).first().text
            == "Speed with direction"
        )

    def test_exam_attempt_logic(self, student_user):
        """Test that an exam attempt can be created and linked to a user"""
        course = Course.objects.create(name="Chemistry", code="CHEM101")
        attempt = ExamAttempt.objects.create(
            user=student_user,
            course=course,
            score=15,
            correct_count=15,  # Added required field
            total_questions=20,
        )
        assert attempt.user == student_user
        assert attempt.score == 15
        assert attempt.course == course

    def test_exam_answer_creation(self, student_user):
        """Test linking specific answers to an attempt"""
        from core.models import Option

        course = Course.objects.create(name="Biology", code="BIO101")
        topic = Topic.objects.create(course=course, name="Cells")

        # Create Question and Option
        question = Question.objects.create(
            topic=topic, statement="Powerhouse of the cell?"
        )
        correct_opt = Option.objects.create(
            question=question, text="Mitochondria", is_correct=True
        )

        attempt = ExamAttempt.objects.create(
            user=student_user,
            course=course,
            score=0,
            correct_count=0,
            total_questions=1,
        )

        # Create an answer
        answer = ExamAttemptAnswer.objects.create(
            attempt=attempt,
            question=question,
            selected_option=correct_opt,
            is_correct=True,
        )

        assert answer.attempt == attempt
        assert answer.question == question
        assert answer.selected_option == correct_opt
        assert answer.is_correct is True
