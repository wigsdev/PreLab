#!/bin/sh

# Verifica si la base de datos es postgres y espera a que esté lista
if [ "$DATABASE" = "postgres" ]
then
    echo "Esperando a PostgreSQL..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL iniciado"
fi

# Ejecutar migraciones
echo "Ejecutando migraciones..."
python manage.py migrate --noinput

# Recolectar archivos estáticos
echo "Recolectando archivos estáticos..."
python manage.py collectstatic --noinput

# Crear superusuario si no existe (Opcional, se puede manejar via script externo o admin)
# echo "Creando superusuario..."
# python manage.py shell < create_superuser.py

# Iniciar servidor (Gunicorn para producción)
echo "Iniciando Gunicorn..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000
