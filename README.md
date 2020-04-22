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

### Ignore ts errors in VSCode

`// @ts-ignore`


