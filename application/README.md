# DevOps School 
Course project of DevOps school
- [Build backend application](https://gitlab.com/t-systems-devops-school/course-project/-/tree/main/backend?ref_type=heads)
- [Build frontend application](https://gitlab.com/t-systems-devops-school/course-project/-/tree/main/frontend?ref_type=heads)

### Build applications
See the appropriate README.md of each project

### Preconditions
List of required tools:
<ul>
    <li>PostgreSQL 16</li>
    <li>Golang 1.25</li>
    <li>Node 22</li>
</ul>

### What to keep in mind when creating a Dockerfile

#### 1)
- Before you build frontend app you need to copy `package.json` AND `package-lock.json` to the workdir
- As frontend will be run on nginx you have to copy it configuration to the appropriate folder of nginx
- entrypoint.sh of nginx dir should be also transferred to the final image and serve as container entrypoint
- index.html should be copied to the nginx html folder, but only after build, 
  as it will be different for development and production environments [see the article](https://gist.github.com/leommoore/2701379)

#### 2)
- You do not need Node to run static frontend files
- Same for backend app, you don't need golang on image to run built binary
- Hence, use two stages in dockerfiles
- Stage 1: install + build.
- Stage 2: copy built files and serve them.

#### 3)
- Frontend runtime values need injection.
- If the app needs the backend address, pass it as environment variables and inject on container start.
- See the readme files of each application

## docker-compose hints

- Connect frontend and backend by service name (e.g., `backend`).
- Pass backend address via environment variables:

```yaml
services:
  frontend:
    environment:
      BACKEND_HOST: backend
      BACKEND_PORT: 8080
```
