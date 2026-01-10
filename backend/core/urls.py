from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, TopicViewSet, QuestionViewSet, ExamAttemptViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'topics', TopicViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'history', ExamAttemptViewSet, basename='history')

urlpatterns = [
    path('', include(router.urls)),
]
