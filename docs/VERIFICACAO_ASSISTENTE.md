# ✅ Verificação do Assistente (Chatbot)

## 🔍 Checklist de Verificação

Após a unificação do `.env`, verifique se o assistente está funcionando:

### 1. ✅ Arquivo `.env` na Raiz

```bash
# Verificar se existe
ls -la .env
# ou no Windows:
dir .env
```

**Deve conter:**
```env
OPENROUTER_API_KEY=sk-or-v1-sua_chave_aqui
OPENROUTER_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. ✅ Configuração do Frontend

O `frontend/next.config.mjs` foi atualizado para carregar o `.env` da raiz:

```javascript
// Carrega .env da raiz do monorepo
dotenv.config({ path: rootEnvPath });
```

**Verificar:**
- ✅ `dotenv` está instalado no frontend (`npm list dotenv` em `frontend/`)
- ✅ `next.config.mjs` carrega o `.env` da raiz

### 3. ✅ Configuração do Backend

O `backend/src/config.ts` foi atualizado para carregar o `.env` da raiz:

```typescript
// Carrega .env da raiz do projeto (monorepo)
const envPath = resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });
```

**Verificar:**
- ✅ Backend lê o `.env` da raiz corretamente

### 4. 🧪 Teste Local

1. **Inicie o frontend:**
   ```bash
   npm run dev:frontend
   # ou
   cd frontend && npm run dev
   ```

2. **Abra o navegador:**
   - Acesse http://localhost:3000
   - Clique no botão do chatbot (canto inferior direito)

3. **Envie uma mensagem de teste:**
   - Exemplo: "Olá, como você está?"

4. **Verifique os logs no terminal:**
   ```
   [Chat API] Verificando OPENROUTER_API_KEY: Configurada (tamanho: XX)
   [Chat API] Chamando OpenRouter diretamente...
   [Chat API] Status da resposta: 200
   ```

### 5. ⚠️ Problemas Comuns

#### ❌ "OPENROUTER_API_KEY não configurada"

**Solução:**
1. Verifique se o `.env` está na raiz (não em `frontend/` ou `backend/`)
2. Verifique se a chave está correta (sem aspas, sem espaços)
3. Reinicie o servidor Next.js
4. Verifique se `dotenv` está instalado no frontend

#### ❌ Variáveis não são lidas

**Solução:**
1. Verifique o caminho no `next.config.mjs`:
   ```javascript
   const rootEnvPath = resolve(__dirname, '..', '.env');
   ```
2. Verifique se o arquivo `.env` existe na raiz
3. Reinicie o servidor completamente

#### ❌ Funciona local mas não no Vercel

**Solução:**
1. No Vercel, vá em **Settings** → **Environment Variables**
2. Adicione todas as variáveis necessárias:
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_API_URL`
3. Marque para **Production**
4. Faça um novo deploy

### 6. 📊 Logs de Debug

Para verificar se está funcionando, observe os logs:

**✅ Funcionando:**
```
[Chat API] Verificando OPENROUTER_API_KEY: Configurada (tamanho: 45)
[Chat API] Chamando OpenRouter diretamente...
[Chat API] Fazendo requisição para OpenRouter...
[Chat API] Status da resposta: 200
[Chat API] Sucesso com OpenRouter! Retornando resposta em XXXms
```

**❌ Não funcionando:**
```
[Chat API] Verificando OPENROUTER_API_KEY: NÃO CONFIGURADA
[Chat API] OPENROUTER_API_KEY não configurada no frontend
[Chat API] Sem backend ou API key, retornando resposta mockada
```

## 🎯 Resumo

Após a unificação:
- ✅ Backend lê `.env` da raiz
- ✅ Frontend lê `.env` da raiz (via `next.config.mjs`)
- ✅ Um único arquivo `.env` para tudo
- ✅ Sem conflitos no Vercel

**Próximo passo:** Teste o chatbot localmente e verifique os logs!

