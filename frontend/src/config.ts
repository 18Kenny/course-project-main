// API configuration
//
// This project uses a fixed BFF-style prefix: frontend calls the API via `/api/*`.
// Local dev: Vite dev-server proxies `/api/*` -> backend.
// Docker/Kubernetes: nginx proxies `/api/*` -> backend service.

export const API_PREFIX = '/api';
