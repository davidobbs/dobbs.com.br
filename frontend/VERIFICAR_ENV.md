# 🔍 Como Verificar se as Variáveis de Ambiente Estão Configuradas

## Problema: Chatbot retornando mensagem mockada

Se o chatbot está retornando a mensagem mockada, significa que `OPENROUTER_API_KEY` não está sendo encontrada.

## ✅ Verificação Local (Desenvolvimento)

### 1. Verificar se o arquivo `.env.local` existe

```bash
cd frontend
ls -la .env.local
# ou no Windows:
dir .env.local
```

### 2. Verificar conteúdo do `.env.local`

O arquivo deve conter:

```env
OPENROUTER_API_KEY=sk-or-v1-sua_chave_aqui
OPENROUTER_MODEL=openai/gpt-4o-mini
```

**Importante:**
- Não use aspas na chave
- Não deixe espaços antes ou depois do `=`
- A chave deve começar com `sk-or-v1-`

### 3. Reiniciar o servidor

Após criar ou modificar `.env.local`, você **DEVE** reiniciar o servidor:

```bash
# Parar o servidor (Ctrl+C)
# Depois iniciar novamente:
npm run dev
```

### 4. Verificar logs

Quando enviar uma mensagem no chatbot, verifique os logs do terminal. Você deve ver:

```
[Chat API] Usando OpenRouter com modelo: openai/gpt-4o-mini
[Chat API] Fazendo requisição para OpenRouter...
[Chat API] Status da resposta: 200
```

Se ver:
```
[Chat API] OPENROUTER_API_KEY não configurada ou vazia
```

Significa que a variável não está sendo lida.

## ✅ Verificação no Vercel (Produção)

### 1. Acessar Dashboard do Vercel

1. Acesse https://vercel.com
2. Vá no seu projeto
3. Clique em **Settings** → **Environment Variables**

### 2. Verificar variáveis

Você deve ter:
- `OPENROUTER_API_KEY` = `sk-or-v1-sua_chave_aqui`
- `OPENROUTER_MODEL` = `openai/gpt-4o-mini` (opcional)

### 3. Verificar ambiente

Certifique-se de que as variáveis estão configuradas para:
- ✅ Production
- ✅ Preview (opcional)
- ✅ Development (opcional)

### 4. Fazer novo deploy

Após adicionar/modificar variáveis:
1. Vá em **Deployments**
2. Clique nos 3 pontos do último deployment
3. Clique em **Redeploy**

**OU** faça um novo commit e push (o Vercel fará deploy automaticamente)

### 5. Verificar logs no Vercel

1. Vá em **Deployments**
2. Clique no último deployment
3. Vá em **Functions** → `/api/chat`
4. Clique em **View Function Logs**
5. Envie uma mensagem no chatbot
6. Verifique os logs

## 🐛 Troubleshooting

### Problema: Variável existe mas não é lida

**Solução:**
1. Verifique se não há espaços extras
2. Verifique se não há aspas na chave
3. Reinicie o servidor (local) ou faça redeploy (Vercel)
4. Verifique se o arquivo está na pasta correta (`frontend/.env.local`)

### Problema: Funciona local mas não no Vercel

**Solução:**
1. Verifique se as variáveis estão configuradas no Vercel
2. Verifique se estão marcadas para "Production"
3. Faça um redeploy após adicionar variáveis

### Problema: Erro 401 (Unauthorized)

**Solução:**
1. Verifique se a API key está correta
2. Gere uma nova chave em https://openrouter.ai/keys
3. Atualize a variável de ambiente

### Problema: Erro 429 (Rate Limit)

**Solução:**
1. Você excedeu o limite de requisições
2. Aguarde alguns minutos
3. Verifique seus créditos em https://openrouter.ai/activity

## 📝 Checklist Rápido

- [ ] Arquivo `.env.local` existe em `frontend/`
- [ ] `OPENROUTER_API_KEY` está configurada (sem aspas, sem espaços)
- [ ] Servidor foi reiniciado após criar/modificar `.env.local`
- [ ] No Vercel: variáveis estão configuradas em Settings → Environment Variables
- [ ] No Vercel: variáveis estão marcadas para Production
- [ ] No Vercel: foi feito redeploy após adicionar variáveis
- [ ] API key é válida e tem créditos disponíveis

