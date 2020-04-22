#!/bin/sh
set -e
_orange='\e[38;2;255;158;60m'
_nc='\e[39m'

if [ -z "$INITIAL_COMMAND" ]; then
    printf "Fallback container alive ${_orange}hit [CTRL+C] to stop! or run 'docker-compose down'${_nc}\n"    
    while :; do sleep 86400; done
else
    printf "The main service will be listen in ${_orange}http://localhost:${REACT_HOST_PORT}${_nc}\n"
    exec "$@"
fi