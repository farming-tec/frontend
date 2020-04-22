FROM mongo:4.0-xenial
LABEL maintainer="antonio@almavios.com"

COPY ./scripts/start-mongo.sh /docker-entrypoint-initdb.d