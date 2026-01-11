# Usar una imagen base oficial de Python ligera
FROM python:3.12-slim

# Establecer variables de entorno
# PYTHONDONTWRITEBYTECODE: Previene que Python escriba archivos .pyc
# PYTHONUNBUFFERED: Asegura que la salida de Python se envíe directamente al terminal (logs en tiempo real)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Instalar dependencias del sistema
# netcat-openbsd: Para usar nc en el entrypoint (esperar a la DB)
# gcc, libpq-dev: Dependencias comunes para compilar drivers como psycopg2
RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    gcc \
    libpq-dev \
    dos2unix \
    && rm -rf /var/lib/apt/lists/*

# Copiar el archivo de requerimientos e instalar dependencias de Python
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copiar el script de entrada a una ubicación fuera del volumen montado
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN dos2unix /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh

# Copiar el resto del código del proyecto
COPY . /app/

# Exponer el puerto donde correrá Gunicorn
EXPOSE 8000

# Definir el entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
