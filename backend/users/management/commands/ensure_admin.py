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

        if not User.objects.filter(username=username).exists():
            self.stdout.write(f"Creating superuser {username}...")
            User.objects.create_superuser(
                username=username, email=email, password=password
            )
            self.stdout.write(
                self.style.SUCCESS(f'Superuser "{username}" created successfully!')
            )
        else:
            self.stdout.write(
                self.style.SUCCESS(
                    f'Superuser "{username}" already exists. No action taken.'
                )
            )
