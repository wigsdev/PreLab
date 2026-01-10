from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, TopicViewSet, QuestionViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'topics', TopicViewSet)
router.register(r'questions', QuestionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
