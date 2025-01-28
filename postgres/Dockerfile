# Usar la imagen oficial de PostgreSQL
FROM postgres:15-alpine

# Variables de entorno para la configuración de PostgreSQL
ENV POSTGRES_DB=wallet_db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=secret

# Copiar scripts de inicialización (opcional)
# COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Exponer el puerto de PostgreSQL
EXPOSE 5432

# Comando por defecto para iniciar PostgreSQL
CMD ["postgres"]