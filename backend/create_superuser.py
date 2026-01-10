import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from users.models import CustomUser

email = "admin@prelab.pe"
password = "password123"

if not CustomUser.objects.filter(email=email).exists():
    CustomUser.objects.create_superuser(email=email, password=password)
    print(f"Superuser created: {email} / {password}")
else:
    print("Superuser already exists")
