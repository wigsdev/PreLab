from rest_framework import generics, permissions, parsers
from .serializers import UserSerializer
from .models import CustomUser

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
    parser_classes = (parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser)

class ManageUserView(generics.RetrieveUpdateAPIView):
    """
    Maneja el perfil del usuario autenticado (GET, PUT, PATCH).
    Endpoint: /api/users/me/
    """
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser)

    def get_object(self):
        # Retorna el usuario de la request actual
        return self.request.user
