from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
            "avatar",
            "is_staff",
        )

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            avatar=validated_data.get("avatar", None),
        )
        return user

    def update(self, instance, validated_data):
        # Actualizar campos de texto
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.email = validated_data.get("email", instance.email)

        # Actualizar avatar si viene
        if "avatar" in validated_data:
            instance.avatar = validated_data["avatar"]

        # Actualizar password solo si viene en la data
        password = validated_data.get("password", None)
        if password:
            instance.set_password(password)

        instance.save()


class UserManagementSerializer(serializers.ModelSerializer):
    """
    Serializer para que los administradores gestionen usuarios.
    Incluye campos de sistema (is_staff, is_active, etc.)
    """

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "avatar",
            "is_staff",
            "is_active",
            "date_joined",
            "last_login",
        )
        read_only_fields = ("id", "email", "date_joined", "last_login")
