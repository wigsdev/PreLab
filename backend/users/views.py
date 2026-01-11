from rest_framework import generics, permissions, parsers, viewsets, filters, status
from rest_framework.response import Response
from .serializers import UserSerializer, UserManagementSerializer
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


class UserViewSet(viewsets.ModelViewSet):
    """
    Vista para gestión de usuarios (Solo Admin).
    Permite listar, buscar y modificar roles/estado.
    No permite crear ni borrar usuarios (el registro es público, el borrado no se implementa por seguridad de datos).
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = UserManagementSerializer
    permission_classes = [permissions.IsAdminUser]
    http_method_names = ['get', 'put', 'patch', 'head', 'options'] # No POST/DELETE
    filter_backends = [filters.SearchFilter]
    search_fields = ['email', 'first_name', 'last_name']

    def update(self, request, *args, **kwargs):
        """
        Sobrescribe update para restringir qué campos se pueden cambiar (solo roles y estado).
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Evitar auto-bloqueo: No permitir que un admin se quite el rol de admin a sí mismo
        if instance == request.user and 'is_staff' in request.data and not request.data['is_staff']:
             return Response(
                {"detail": "No puedes quitarte el permiso de administrador a ti mismo."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

