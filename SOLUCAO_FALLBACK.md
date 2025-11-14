# Solução: Assistente Retornando Mensagem de Fallback

## 🔍 Problema Identificado

O assistente está retornando a mensagem de fallback padrão ao invés de usar o backend ou OpenRouter. Isso acontece quando:

1. **Backend não responde a tempo** (timeout de 60s)
2. **API key do OpenRouter não configurada no frontend**
3. **Backend retorna erro e não há fallback para OpenRouter**

## ✅ Solução

### Opção 1: Configurar API Key do OpenRouter no Frontend (Recomendado)

Crie o arquivo `frontend/.env.local` com:

```env
# OpenRouter API Configuration (OBRIGATÓRIO)
OPENROUTER_API_KEY=sk-or-v1-sua_chave_aqui
OPENROUTER_MODEL=openai/gpt-4o-mini

# Site URL (opcional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API URL do backend (opcional, padrão: http://localhost:3001)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Importante:** Após criar/editar o `.env.local`, **reinicie o servidor Next.js** (Ctrl+C e `npm run dev` novamente).

### Opção 2: Verificar se o Backend Está Funcionando

1. **Verifique se o backend está rodando:**
   ```bash
   curl http://localhost:3001/health
   ```

2. **Verifique se o backend tem a API key configurada:**
   - Abra `backend/.env`
   - Verifique se `OPENROUTER_API_KEY` está configurada corretamente
   - Reinicie o backend após alterar

3. **Teste o backend diretamente:**
   ```powershell
   $body = @{ message = "teste"; conversationHistory = @() } | ConvertTo-Json
   Invoke-WebRequest -Uri "http://localhost:3001/api/chat" -Method POST -Body $body -ContentType "application/json"
   ```

## 🔍 Diagnóstico

### Verificar Logs no Terminal do Next.js

Quando você enviar uma mensagem, verifique o terminal onde o Next.js está rodando. Você deve ver logs como:

```
[Chat API] Requisição recebida
[Chat API] Backend URL: http://localhost:3001
[Chat API] Pode fazer proxy para backend: true
[Chat API] Tentando proxy para backend...
[Chat API] Fazendo proxy para backend: http://localhost:3001/api/chat
```

Se você ver:
- `[Chat API] Timeout ao chamar backend` → Backend não está respondendo
- `[Chat API] OPENROUTER_API_KEY não configurada` → Precisa configurar no frontend
- `[Chat API] Backend indisponível` → Backend não está rodando ou há erro de conexão

### Verificar Variáveis de Ambiente

No terminal do Next.js, você pode verificar se as variáveis estão carregadas:

```javascript
// No console do navegador (F12)
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
```

**Nota:** Variáveis que começam com `NEXT_PUBLIC_` são expostas ao cliente. Variáveis sem esse prefixo (como `OPENROUTER_API_KEY`) só estão disponíveis no servidor (API routes).

## 🚀 Passos para Resolver

1. **Criar/Editar `frontend/.env.local`:**
   ```env
   OPENROUTER_API_KEY=sk-or-v1-sua_chave_real_aqui
   OPENROUTER_MODEL=openai/gpt-4o-mini
   ```

2. **Reiniciar o servidor Next.js:**
   - Pare o servidor (Ctrl+C)
   - Inicie novamente: `npm run dev` (na pasta frontend)

3. **Testar novamente:**
   - Envie uma mensagem no chat
   - Verifique os logs no terminal do Next.js
   - Verifique o console do navegador

## 📝 Notas Importantes

- O Next.js **não recarrega** variáveis de ambiente automaticamente. Você precisa reiniciar o servidor.
- A API key do OpenRouter pode estar configurada no backend, mas o frontend também precisa ter para o fallback funcionar.
- Se o backend estiver lento (>60s), o sistema tentará usar OpenRouter diretamente como fallback.

## 🔄 Fluxo de Decisão

```
1. Frontend envia mensagem → /api/chat
2. API route tenta fazer proxy para backend (http://localhost:3001/api/chat)
   ├─ Se sucesso → Retorna resposta do backend
   ├─ Se timeout/erro retryable → Tenta OpenRouter diretamente
   │   ├─ Se OPENROUTER_API_KEY configurada → Chama OpenRouter
   │   └─ Se não configurada → Retorna mensagem de fallback
   └─ Se erro não retryable → Retorna erro
```

## ✅ Checklist

- [ ] Arquivo `frontend/.env.local` existe
- [ ] `OPENROUTER_API_KEY` está configurada no `.env.local`
- [ ] Servidor Next.js foi reiniciado após criar/editar `.env.local`
- [ ] Backend está rodando na porta 3001 (se quiser usar backend)
- [ ] `OPENROUTER_API_KEY` está configurada no `backend/.env` (se quiser usar backend)

