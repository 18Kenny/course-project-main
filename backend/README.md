# Backend app (Go + PostgreSQL)

### Local PostgreSQL 16 db installing + Creating a DB/User

1) Install PostgreSQL 16 (server + `psql` client).

- Via the official EDB installer: https://www.postgresql.org/download

During installation, remember the password for the `postgres` superuser.

2) Verify that `psql` is available in PATH:

`psql --version`

3) Connect as superuser and create a project user/database.

Opens psql connected to the postgres database

`psql -U postgres -d postgres`

Inside psql, run:

-- Project user
CREATE ROLE admin WITH LOGIN PASSWORD 'test';
ALTER ROLE admin CREATEDB;

-- Project database
CREATE DATABASE appdb OWNER admin;

-- Verification
\du
\l
\q

### Build and run the application

Commands to run the backend application. It will connect to the database using env vars (see the table) or default values.

```bash
go mod download
go build -o backend ./cmd
./backend
```

```powershell
go mod download
go build -o backend.exe .\cmd
.\backend.exe
```

**!NOTE** Make sure to have the database running and accessible before starting the backend application.

`go build` command will build a binary, which should be used as the container entrypoint.

Application available on localhost:8080

_GET_ /entries will return json array of entries ([] in case it's empty)

### Environment variables

See the list of env vars that is used by BE and DB

| Environment Variable |        description        |     default value     |
|:--------------------:|:-------------------------:|:---------------------:|
|      LOG_LEVEL       | info, warn, debug, error  |         info          |
|       APP_PORT       |                           |         8080          |
|      PG_DB_URL       | backend will connect to * |       localhost       |
|      PG_DB_PORT      |             *             |         5432          |
|      PG_DB_NAME      |             *             |         appdb         |
|    PG_DB_USERNAME    |             *             |         admin         |
|    PG_DB_PASSWORD    |             *             |         test          |

* Backend will connect to the database using provided dsn, which build as:

  `postgres://${PG_DB_USERNAME}:${PG_DB_PASSWORD}@${PG_DB_URL}:${PG_DB_PORT}/${PG_DB_NAME}"`

### Health, live, and metrics endpoints

- `/live`, `/health` to check application's health and liveness. The `/live` endpoint checks if the application is running, while the `/health` endpoint performs a more comprehensive check, including database connectivity.

- `/metrics` exposes Prometheus-compatible HTTP metrics for all API endpoints.
