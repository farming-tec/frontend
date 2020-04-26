FROM rabbitmq:3.8-management
LABEL maintainer="antonio@almavios.com"

ARG RABBITMQ_DEFAULT_USER=guess
ARG RABBITMQ_DEFAULT_PASS=guess
ARG DEFAULT_RABBIT_PATH=/etc/rabbitmq



# Generate keys and cert as CA | Generate SSL keys and certs for domain, ONLY for development purposes
RUN cd ${DEFAULT_RABBIT_PATH}\
    && openssl genrsa -out ca.key 2048\
    && openssl req -x509 -new -nodes -key ca.key\
    -subj "/C=MX/ST=Hidalgo/L=Pachuca/O=Almavios/CN=almavios.local"\
    -days 1000 -out ca.crt\
    && openssl genrsa -out domain.key 2048\
    && openssl req -new -key domain.key -out domain.csr -subj "/C=MX/ST=Hidalgo/L=Pachuca/O=Almavios/CN=rabbit.almavios.local"\
    && openssl x509 -req -in domain.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out domain.crt -days 1000\
    && chown rabbitmq domain.key\
    && chmod 0400 domain.key


# openssl s_server -accept 8443 \
#  -cert domain.crt -key domain.key -CAfile ca.crt


# # Add rabbitmq conf file
RUN echo\
    "loopback_users.guest = false\n"\
    "listeners.tcp.default = 5672\n"\
    "default_pass = ${RABBITMQ_DEFAULT_PASS}\n"\
    "default_user = ${RABBITMQ_DEFAULT_USER}\n"\
    "management.ssl.port = 15671\n"\
    "management.ssl.cacertfile = ${DEFAULT_RABBIT_PATH}/ca.crt\n"\
    "management.ssl.certfile   = ${DEFAULT_RABBIT_PATH}/domain.crt\n"\
    "management.ssl.keyfile    = ${DEFAULT_RABBIT_PATH}/domain.key\n"\
    "management.ssl.fail_if_no_peer_cert = false\n"\
    "management.ssl.verify = verify_none\n"\
    "listeners.ssl.default = 5671\n"\
    "ssl_options.cacertfile = ${DEFAULT_RABBIT_PATH}/ca.crt\n"\
    "ssl_options.certfile   = ${DEFAULT_RABBIT_PATH}/domain.crt\n"\
    "ssl_options.keyfile    = ${DEFAULT_RABBIT_PATH}/domain.key\n"\
    "ssl_options.verify     = verify_peer\n"\
    "ssl_options.fail_if_no_peer_cert = false\n"\    
    "ssl_options.depth  = 8\n"\
    "web_mqtt.ssl.port       = 15673\n"\
    "web_mqtt.ssl.backlog    = 1024\n"\
    "web_mqtt.ssl.cacertfile = ${DEFAULT_RABBIT_PATH}/ca.crt\n"\
    "web_mqtt.ssl.certfile   = ${DEFAULT_RABBIT_PATH}/domain.crt\n"\
    "web_mqtt.ssl.keyfile    = ${DEFAULT_RABBIT_PATH}/domain.key\n"\    
    "" > ${DEFAULT_RABBIT_PATH}/rabbitmq.conf

# "web_mqtt.tcp.port       = 15675\n"\

# Can be added --offline flag
RUN rabbitmq-plugins enable rabbitmq_management rabbitmq_mqtt rabbitmq_web_mqtt rabbitmq_federation_management rabbitmq_stomp

# MQTT, MQTT over WS, MQTT over WSS, AMQP 0.9, AMQP 1, HTTP Mg, HTTPs Mg
EXPOSE 1883  15675          15673    5672       5671    15672   15671