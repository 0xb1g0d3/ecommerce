# ecommerce..

Estrutura para o ecommerce com frontend (Vue/Vite) na raiz e backend (API) em `backend/`.

## Frontend (raiz)
```sh
npm install
# dev
npm run dev
# build
npm run build
# preview
npm run preview
```

## Backend (`backend/`)
API básica para catálogo/administração (Express).
```sh
cd backend
npm install
npm run dev       # http://localhost:4000
```
Endpoints disponíveis em `backend/README.md`.

## Estrutura de pastas
- `src/` e `public/`: frontend Vue.
- `backend/`: API (Express) para catálogo/admin.
- `config/`, `docs/`, `scripts/` (adicione se/quando precisar para CI, deploy, docs).
