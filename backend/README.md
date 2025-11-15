# Backend (API)

Estrutura básica para expor produtos e endpoints de administração (cadastro/edição/remoção) de forma isolada do frontend.

## Rodando localmente
```bash
cd backend
npm install
npm run dev
# ou em produção
npm start
```

- Porta padrão: `4000` (configurável via `PORT`).
- Endpoints:
  - `GET /health` — verificação rápida.
  - `GET /api/products` e `GET /api/products/:id` — catálogo público.
  - `GET /api/admin/products` — lista de produtos para administração.
  - `POST /api/admin/products` — cria produto (`id`, `title`, `price` obrigatórios).
  - `PUT /api/admin/products/:id` — atualiza um produto.
  - `DELETE /api/admin/products/:id` — remove um produto.

### Notas
- Os dados estão em memória para prototipação; troque por persistência real (BD/ORM) quando for integrar.
- Adicione autenticação/autorização em `/api/admin/*` antes de abrir publicamente.
- Coloque variáveis de ambiente em `.env` (porta, chaves, URLs) — o arquivo já está ignorado no Git.
