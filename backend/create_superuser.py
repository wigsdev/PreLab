import os
import django
from django.contrib.auth import get_user_model

# Configurar Django (necesario si se corre como script independiente)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

User = get_user_model()


def create_admin():
    email = "admin@prelab.com"
    password = "admin"

    if not User.objects.filter(email=email).exists():
        print(f"Creating superuser: {email}")
        User.objects.create_superuser(
            email=email, password=password, first_name="Admin", last_name="PreLab"
        )
        print("Superuser created successfully!")
    else:
        print("Superuser already exists.")


if __name__ == "__main__":
    create_admin()
