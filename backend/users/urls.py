from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, ManageUserView, UserViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'management', UserViewSet, basename='user-management')

urlpatterns = [
    # Auth Endpoints
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User Profile
    path('users/me/', ManageUserView.as_view(), name='manage_user'),
    
    # Admin Management (via Router)
    path('users/', include(router.urls)),
]
