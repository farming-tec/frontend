FROM node:12-stretch-slim
LABEL maintainer="antonio@almavios.com"

# Copy main files to /usr/app
WORKDIR /usr/app

# Copy all files
COPY . .
# RUN yarn

EXPOSE ${REACT_CONTAINER_PORT}
ENTRYPOINT [ "./scripts/start.sh" ]

