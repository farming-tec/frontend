FROM rabbitmq:3.8-management
LABEL maintainer="antonio@almavios.com"

# ARG RABBITMQ_DEFAULT_USER=guess
# ARG RABBITMQ_DEFAULT_PASS=guess

# Add rabbitmq conf file
# RUN echo \
# "loopback_users.guest = false\n"\
# "listeners.tcp.default = 5672\n"\
# "default_pass = ${RABBITMQ_DEFAULT_PASS}\n"\
# "default_user = ${RABBITMQ_DEFAULT_USER}\n"\
# "hipe_compile = false\n"\
# "management.listener.port = 15672\n"\
# "management.listener.ssl = false\n"\
# "web_mqtt.ssl.port       = 15673\n"\
# "web_mqtt.ssl.backlog    = 1024\n"\
# "web_mqtt.ssl.cacertfile = /path/to/ca_certificate.pem\n"\
# "web_mqtt.ssl.certfile   = /path/to/server_certificate.pem\n"\
# "web_mqtt.ssl.keyfile    = /path/to/server_key.pem\n"\
# "Mmmm ${RABBITMQ_DEFAULT_PASS}" > /etc/rabbitmq/hola.sh


# Can be added --offline flag
RUN rabbitmq-plugins enable rabbitmq_mqtt rabbitmq_web_mqtt rabbitmq_federation_management rabbitmq_stomp

# MQTT, MQTT over WS, AMQP 0.9, AMQP 1, HTTP API Client
EXPOSE 1883 15675 5672 5671 15672