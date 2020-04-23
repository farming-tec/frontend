FROM rabbitmq:3.8-management
LABEL maintainer="antonio@almavios.com"

RUN rabbitmq-plugins enable rabbitmq_mqtt rabbitmq_web_mqtt rabbitmq_federation_management rabbitmq_stomp

# MQTT, MQTT over WS, AMQP 0.9, AMQP 1, HTTP API Client
EXPOSE 1883 15675 5672 5671 15672