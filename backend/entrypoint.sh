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

# Crear superusuario automático si las variables de entorno están definidas
echo "Verificando superusuario..."
python manage.py ensure_admin

# Sembrar cursos y temas iniciales (Idempotente)
echo "Sembrando cursos y temas..."
python manage.py seed_courses

# Iniciar servidor (Gunicorn para producción)
echo "Iniciando Gunicorn..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000
