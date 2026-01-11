import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def student_user(db):
    """Creates a regular student user"""
    user = User.objects.create_user(
        email="student@test.com",
        password="password123",
        first_name="Test",
        last_name="Student",
        is_active=True,
    )
    return user


@pytest.fixture
def admin_user(db):
    """Creates an admin user"""
    user = User.objects.create_superuser(
        email="admin@test.com",
        password="password123",
        first_name="Admin",
        last_name="User",
    )
    return user


@pytest.fixture
def auth_client(api_client, student_user):
    """Returns an API client authenticated as a student"""
    api_client.force_authenticate(user=student_user)
    return api_client
