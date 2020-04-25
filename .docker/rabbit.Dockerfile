FROM rabbitmq:3.8-management
LABEL maintainer="antonio@almavios.com"

ARG RABBITMQ_DEFAULT_USER=guess
ARG RABBITMQ_DEFAULT_PASS=guess
ARG DEFAULT_RABBIT_PATH=/etc/rabbitmq


# RUN apt-get update\
#     && apt-get install curl -y


# Generate keys and cert as CA | Generate SSL keys and certs for domain, ONLY for development purposes
RUN cd ${DEFAULT_RABBIT_PATH}\
    && openssl genrsa -passout pass:fixmeinsecure -des3 -out ca.key 2048\
    && openssl req -passin pass:fixmeinsecure -new -key ca.key -x509 -days 1000 -out ca.crt -subj "/C=MX/ST=Hidalgo/L=Pachuca/O=Almavios/CN=almavios.com"\
    && openssl req -newkey rsa:2048 -nodes -keyout domain.key -out domain.csr -subj "/C=MX/ST=Hidalgo/L=Pachuca/O=Almavios/CN=almavios.com"\
    && openssl x509 -passin pass:fixmeinsecure -signkey domain.key -in domain.csr -req -days 365 -out domain.crt -CA ca.crt -CAkey ca.key -CAcreateserial


# openssl s_server -accept 8443 \
#  -cert domain.crt -key domain.key -CAfile ca.crt


# # Add rabbitmq conf file
RUN echo \
"loopback_users.guest = false\n"\
"listeners.tcp.default = 5672\n"\
"default_pass = ${RABBITMQ_DEFAULT_PASS}\n"\
"default_user = ${RABBITMQ_DEFAULT_USER}\n"\
"management.ssl.port = 15671\n"\
"management.ssl.cacertfile = ${DEFAULT_RABBIT_PATH}/ca.crt\n"\
"management.ssl.certfile   = ${DEFAULT_RABBIT_PATH}/domain.crt\n"\
"management.ssl.keyfile    = ${DEFAULT_RABBIT_PATH}/domain.key\n"\
"management.ssl.verify = verify_none\n"\
"management.ssl.fail_if_no_peer_cert = false\n"\
"web_mqtt.tcp.port       = 15675\n"\
"web_mqtt.ssl.port       = 15673\n"\
"web_mqtt.ssl.backlog    = 1024\n"\
"web_mqtt.ssl.cacertfile = ${DEFAULT_RABBIT_PATH}/ca.crt\n"\
"web_mqtt.ssl.certfile   = ${DEFAULT_RABBIT_PATH}/domain.crt\n"\
"web_mqtt.ssl.keyfile    = ${DEFAULT_RABBIT_PATH}/domain.key\n"\
"" > ${DEFAULT_RABBIT_PATH}/rabbitmq.conf



# Can be added --offline flag
RUN rabbitmq-plugins enable rabbitmq_management rabbitmq_mqtt rabbitmq_web_mqtt rabbitmq_federation_management rabbitmq_stomp

# MQTT, MQTT over WS, MQTT over WSS, AMQP 0.9, AMQP 1, HTTP Mg, HTTPs Mg
EXPOSE 1883  15675          15673    5672       5671    15672   15671