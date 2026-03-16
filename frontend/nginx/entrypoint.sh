#!/usr/bin/env sh
set -eu

export BACKEND_HOST="${BACKEND_HOST:-backend}"
export BACKEND_PORT="${BACKEND_PORT:-8080}"

envsubst '${BACKEND_HOST} ${BACKEND_PORT}' \
  < /etc/nginx/conf.d/default.conf \
  > /etc/nginx/conf.d/default.conf.rendered

mv /etc/nginx/conf.d/default.conf.rendered /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'