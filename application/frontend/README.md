# Frontend app (React + Vite)

### Local run

```bash
npm ci
npm run dev
```
**!NOTE**: Use `npm run dev` for local development (starts the Vite dev server).  
Use `npm run build` to generate static files for deployment (writes production assets to `dist/`), it does not start a server.

See the logs to find the application **host:port** launched on


### Environment variables (Docker/Kubernetes only)

These variables control nginx reverse-proxy inside the frontend container:

| Environment Variable | description | default value |
|:--------------------:|:-----------:|:-------------:|
| `BACKEND_HOST` | Backend service DNS name for nginx reverse-proxy (`/api/* -> http://<host>:<port>/`). | `backend` |
| `BACKEND_PORT` | Backend service port for nginx reverse-proxy. | `8080` |

Notes:
- For local `vite dev`, the dev server proxies `/api/*` to your backend (configured in `vite.config.ts`).
- For Docker/Kubernetes, nginx serves the built SPA and proxies `/api/*` to `<BACKEND_HOST>:<BACKEND_PORT>`.
- If you encounter some issues due to migrating from local development to
  Docker/Kubernetes, clear the cookies and\or use private tab to access the frontend app. It is a common issue with nginx reverse-proxy and CORS policy.
