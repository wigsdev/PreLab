import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Creates an admin user non-interactively if it doesn't exist"

    def handle(self, *args, **options):
        User = get_user_model()
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@example.com")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        if not username or not password:
            msg = (
                "Skipping admin creation: DJANGO_SUPERUSER_USERNAME "
                "and DJANGO_SUPERUSER_PASSWORD not found."
            )
            self.stdout.write(self.style.WARNING(msg))
            return

        if not User.objects.filter(email=email).exists():
            self.stdout.write(f"Creating superuser {email}...")
            User.objects.create_superuser(email=email, password=password)
            self.stdout.write(
                self.style.SUCCESS(f'Superuser "{email}" created successfully!')
            )
        else:
            self.stdout.write(
                self.style.SUCCESS(
                    f'Superuser "{email}" already exists. No action taken.'
                )
            )
