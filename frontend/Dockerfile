# Build stage 1
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Build stage 2
FROM nginx:1.27-alpine

WORKDIR /app

COPY --from=builder /app/dist/ /usr/share/nginx/html/

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENV BACKEND_HOST=backend \
    BACKEND_PORT=8080

EXPOSE 80

CMD ["/entrypoint.sh"]
