# ---------- Stage 1: build ----------
FROM node:22 AS builder

WORKDIR /app

# 1) копируем package.json + package-lock.json
COPY package*.json ./
RUN npm ci

# копируем остальной код и собираем
COPY . .
RUN npm run build

# ---------- Stage 2: runtime (nginx) ----------
FROM nginx:1.27-alpine

WORKDIR /app

# статический фронт после build (index.html внутри dist)
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# конфиг nginx и entrypoint в финальный образ
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# значения для прокси до backend'а (инжект через env)
ENV BACKEND_HOST=backend \
    BACKEND_PORT=8080

EXPOSE 80

CMD ["/entrypoint.sh"]
