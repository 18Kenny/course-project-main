# Build stage
FROM golang:1.25 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o /app/backend-app ./cmd

# Build stage
FROM debian:12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/backend-app /app/backend-app

ENV LOG_LEVEL=info \
    APP_PORT=8080 \
    PG_DB_URL=host.docker.internal \
    PG_DB_PORT=5432 \
    PG_DB_NAME=appdb \
    PG_DB_USERNAME=admin

EXPOSE 8080

CMD ["/app/backend-app"]
