# 🚀 Como Rodar Backend e Frontend Separadamente

Este guia mostra as diferentes formas de rodar o backend e frontend do projeto.

## 📋 Opções Disponíveis

### Opção 1: Rodar Tudo Junto (Recomendado para desenvolvimento)

```bash
# Na raiz do projeto
npm run dev
```

Isso inicia backend (porta 3001) e frontend (porta 3000) simultaneamente.

---

### Opção 2: Rodar Separadamente (Recomendado para debug)

#### **Terminal 1 - Backend**

```bash
# Na raiz do projeto
npm run dev:backend
```

**OU diretamente no diretório backend:**

```bash
cd backend
npm run dev
```

**O que você verá:**
```
🚀 Backend rodando em http://0.0.0.0:3001
```

**Verificar se está funcionando:**
- Acesse: http://localhost:3001/health
- Deve retornar: `{"status":"ok",...}`

---

#### **Terminal 2 - Frontend**

```bash
# Na raiz do projeto
npm run dev:frontend
```

**OU diretamente no diretório frontend:**

```bash
cd frontend
npm run dev
```

**O que você verá:**
```
Ready on http://localhost:3000
```

**Verificar se está funcionando:**
- Acesse: http://localhost:3000
- Deve abrir a página inicial do site

---

## 🤖 Configuração do Assistente de IA (OpenRouter)

Para que o chatbot responda usando a OpenRouter existem dois caminhos (você pode usar os dois ao mesmo tempo):

1. **Backend (`backend/.env`)**  
   - Configure `OPENROUTER_API_KEY` e opcionalmente `OPENROUTER_MODEL`.  
   - Sempre que `NEXT_PUBLIC_API_URL` apontar para esse backend, o frontend irá proxyar as mensagens para ele.

2. **Frontend (`frontend/.env.local`)**  
   - Adicione:

```env
OPENROUTER_API_KEY=sk-or-v1-sua_chave_aqui
OPENROUTER_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_SITE_URL=https://seusite.com.br
# NEXT_PUBLIC_API_URL só é necessário se houver um backend separado
```

> A rota `frontend/app/api/chat/route.ts` tenta primeiro falar com o backend.
> Se ele não estiver disponível (por exemplo, em produção no Vercel sem backend dedicado)
> ela chama a OpenRouter diretamente usando as variáveis acima.  
> Portanto, basta manter a API key configurada no frontend para que o assistente funcione
> mesmo sem subir o backend.

---

## 🔧 Comandos Disponíveis

### Na Raiz do Projeto (Monorepo)

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Roda backend + frontend juntos |
| `npm run dev:backend` | Roda apenas o backend |
| `npm run dev:frontend` | Roda apenas o frontend |
| `npm run build` | Build de produção (backend + frontend) |
| `npm run build:backend` | Build apenas do backend |
| `npm run build:frontend` | Build apenas do frontend |

### No Diretório Backend

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (hot reload) |
| `npm run build` | Compila TypeScript para JavaScript |
| `npm run start` | Roda versão de produção (após build) |
| `npm run db:generate` | Gera Prisma Client |
| `npm run db:push` | Cria/atualiza schema no banco |
| `npm run db:migrate` | Cria migration |
| `npm run db:studio` | Abre Prisma Studio (interface visual) |
| `npm run db:seed` | Popula banco com dados de exemplo |

### No Diretório Frontend

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento Next.js |
| `npm run build` | Build de produção |
| `npm run start` | Roda versão de produção (após build) |
| `npm run lint` | Executa ESLint |

---

## 📝 Exemplo Prático: Rodar Separadamente

### Passo a Passo

1. **Abra o Terminal 1 (Backend)**
   ```bash
   cd "C:\Users\Davi Dobbs\OneDrive\Área de Trabalho\meu blog\backend"
   npm run dev
   ```
   
   Aguarde ver: `🚀 Backend rodando em http://0.0.0.0:3001`

2. **Abra o Terminal 2 (Frontend)**
   ```bash
   cd "C:\Users\Davi Dobbs\OneDrive\Área de Trabalho\meu blog\frontend"
   npm run dev
   ```
   
   Aguarde ver: `Ready on http://localhost:3000`

3. **Teste**
   - Backend: http://localhost:3001/health
   - Frontend: http://localhost:3000

---

## 🐛 Troubleshooting

### Porta já está em uso

> ℹ️ A partir de agora `npm run dev:frontend` verifica o porto escolhido (padrão `3000`) antes de iniciar o Next.  
> Se aparecer a mensagem `[dev] Port 3000 is already in use`, feche o processo listado abaixo ou defina `PORT=300x` antes de rodar o comando.

**Backend (porta 3001):**
```powershell
# Verificar o que está usando a porta
Get-NetTCPConnection -LocalPort 3001

# Matar o processo (substitua PID pelo número do processo)
Stop-Process -Id <PID> -Force
```

**Frontend (porta 3000):**
```powershell
# Verificar o que está usando a porta
Get-NetTCPConnection -LocalPort 3000

# Matar o processo
Stop-Process -Id <PID> -Force
```

**Frontend (porta 3000 por padrão):**

```powershell
# O comando agora falha quando a porta já estiver ocupada
npm run dev:frontend
```

Se quiser usar outra porta temporariamente:

```powershell
$env:PORT=3002
npm run dev:frontend
```

**OU altere a porta:**

Backend: Edite `backend/.env`
```env
PORT=3002
```

Frontend: Edite `frontend/package.json` ou crie `frontend/.env.local`
```env
PORT=3001
```

E atualize `frontend/next.config.mjs` se necessário.

### Backend não inicia

1. Verifique se o arquivo `.env` existe em `backend/`
2. Verifique se as dependências estão instaladas:
   ```bash
   cd backend
   npm install
   ```
3. Verifique os logs de erro no terminal

### Frontend não inicia

1. Verifique se as dependências estão instaladas:
   ```bash
   cd frontend
   npm install
   ```
2. Limpe o cache do Next.js:
   ```bash
   cd frontend
   rm -rf .next
   npm run dev
   ```
   (No Windows PowerShell: `Remove-Item -Recurse -Force .next`)

### Frontend não consegue conectar ao backend

1. Verifique se o backend está rodando na porta 3001
2. Verifique a variável `NEXT_PUBLIC_API_URL`:
   - Padrão: `http://localhost:3001`
   - Pode ser configurada em `frontend/.env.local`:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```
3. Verifique CORS no backend (`backend/.env`):
   ```env
   CORS_ORIGINS=http://localhost:3000
   ```

---

## 💡 Dicas

### Usar Terminais Separados no VS Code

1. Abra o terminal integrado (Ctrl + `)
2. Clique no ícone "+" para criar novo terminal
3. Ou use: Terminal → New Terminal
4. Configure cada terminal para um diretório diferente

### Usar PowerShell Profiles

Crie aliases no seu perfil do PowerShell:

```powershell
# Editar perfil
notepad $PROFILE

# Adicionar aliases
function Start-Backend {
    cd "C:\Users\Davi Dobbs\OneDrive\Área de Trabalho\meu blog\backend"
    npm run dev
}

function Start-Frontend {
    cd "C:\Users\Davi Dobbs\OneDrive\Área de Trabalho\meu blog\frontend"
    npm run dev
}
```

Depois use: `Start-Backend` e `Start-Frontend`

---

## ✅ Checklist Rápido

Antes de rodar, certifique-se:

- [ ] Node.js >= 18.0.0 instalado
- [ ] Dependências instaladas (`npm install` na raiz)
- [ ] Arquivo `backend/.env` configurado
- [ ] Banco de dados rodando (se necessário)
- [ ] Portas 3000 e 3001 livres

---

## 🎯 Resumo dos Comandos Mais Usados

```bash
# Rodar tudo junto
npm run dev

# Rodar separado (dois terminais)
npm run dev:backend    # Terminal 1
npm run dev:frontend    # Terminal 2

# Ou diretamente
cd backend && npm run dev    # Terminal 1
cd frontend && npm run dev   # Terminal 2
```

