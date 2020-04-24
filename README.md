# Farming React and Mongo Services

Base cloud farming project. This project is for educational purposes, it is designed to run inside a Vagrant environment. The project should be cloned inside `fast_bionic64`, therefore the **git clone** command will be run in your **host machine** (Windows in most cases). **All the commands bellow must be inside Vagrant Virtual Machine.**

After the project is cloned, you should access to your VM with `vagrant ssh`. Inside VM, change to the project directory below the nginx path with `cd /var/www/html/frontend`

## Requirenments

* Docker
* Docker compose

## Setup

Create .env file based on .env.example

## Docker

### Build Docker project
`docker-compose build`

### Run app
`INITIAL_COMMAND="yarn start" docker-compose up -d`

### Run command in farming-react container
`docker-compose up -d`
`docker-compose stop`

### Access to existing container
`docker exec -it frontend_farming-react_1 /bin/sh`

### Remove all volumes
`docker volume ls | awk '{print $2}' | xargs -I{ docker volume rm {`

## Utils

### PORTS in Linus
`sudo lsof -i -P -n | grep LISTEN`

### Ignore ts errors in VSCode

`// @ts-ignore`


## Reference

### Packages
https://www.npmjs.com/package/socket.io-client
https://www.npmjs.com/package/mqtt
https://www.npmjs.com/package/dexie
https://www.npmjs.com/package/react-use-auth
https://www.npmjs.com/package/chart.js
https://www.npmjs.com/package/lit-element

### Tools
https://randomkeygen.com/

### Tutorials
https://medium.com/ing-blog/web-components-react-hooks-haunted-688d8d92f6c5
https://zgadzaj.com/development/docker/docker-compose/containers/rabbitmq
https://tewarid.github.io/2019/02/15/mqtt-with-rabbitmq-and-node-red.html

### Docker
https://nickjanetakis.com/blog/docker-tip-7-the-difference-between-run-and-cmd
https://vsupalov.com/docker-arg-env-variable-guide/