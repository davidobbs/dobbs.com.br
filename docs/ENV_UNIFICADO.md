# 🔧 Configuração de Variáveis de Ambiente Unificadas

## 📋 Visão Geral

O projeto foi unificado para usar um único arquivo `.env` na raiz do projeto. Isso evita conflitos no Vercel, que só permite um arquivo de variáveis de ambiente por projeto.

## ✅ O que foi alterado

1. **Arquivo `.env` unificado na raiz** - Todas as variáveis de ambiente agora ficam em um único arquivo na raiz do projeto
2. **Backend atualizado** - O backend agora lê o `.env` da raiz automaticamente
3. **Frontend atualizado** - O Next.js já lê automaticamente o `.env` da raiz em monorepos
4. **Vercel.json centralizado** - Configuração única na raiz
5. **Documentação atualizada** - Todos os guias foram atualizados

## 🚀 Como usar

### Desenvolvimento Local

1. **Copie o arquivo de exemplo:**
   ```bash
   cp env.example .env
   ```

2. **Edite o arquivo `.env`** com suas configurações reais:
   ```env
   # Database
   DATABASE_URL="postgresql://dobbs:dobbs123@localhost:5432/dobbs_blog?schema=public"
   
   # Backend
   PORT=3001
   HOST=0.0.0.0
   NODE_ENV=development
   CORS_ORIGINS=http://localhost:3000
   LOG_LEVEL=info
   
   # OpenRouter API
   OPENROUTER_API_KEY=sk-or-v1-sua_chave_aqui
   OPENROUTER_MODEL=openai/gpt-4o-mini
   
   # Frontend
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Inicie o projeto:**
   ```bash
   npm run dev
   ```

### Produção (Vercel)

1. **Acesse o dashboard do Vercel:**
   - Vá em **Settings** → **Environment Variables**

2. **Adicione todas as variáveis necessárias:**
   - `DATABASE_URL`
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_API_URL`
   - `CORS_ORIGINS` (se necessário)
   - `LOG_LEVEL` (opcional)

3. **Marque para os ambientes corretos:**
   - ✅ Production
   - ✅ Preview (opcional)
   - ✅ Development (opcional)

4. **Faça deploy:**
   - O Vercel usará automaticamente as variáveis configuradas

## 📁 Estrutura de Arquivos

```
.
├── .env                    # ⚠️ Arquivo unificado (não commitar!)
├── env.example             # ✅ Template de exemplo
├── vercel.json             # Configuração do Vercel
├── frontend/
│   └── (não precisa mais de .env.local)
└── backend/
    └── (não precisa mais de .env)
```

## ⚠️ Importante

- **Nunca commite o arquivo `.env`** - Ele contém informações sensíveis
- O arquivo `.env` deve estar na **raiz do projeto**, não nas pastas `frontend/` ou `backend/`
- O Next.js e o backend agora leem automaticamente o `.env` da raiz
- No Vercel, configure todas as variáveis no dashboard (Settings → Environment Variables)

## 🔍 Verificação

Para verificar se está funcionando:

1. **Backend:**
   ```bash
   cd backend
   npm run dev
   # Verifique os logs - deve carregar as variáveis corretamente
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm run dev
   # Verifique se o chatbot funciona (se OPENROUTER_API_KEY estiver configurada)
   ```

## 🐛 Troubleshooting

### Variáveis não são lidas

1. Verifique se o arquivo `.env` está na raiz do projeto
2. Verifique se não há espaços extras ou aspas desnecessárias
3. Reinicie o servidor após modificar o `.env`
4. No Vercel, verifique se as variáveis estão marcadas para o ambiente correto

### Backend não encontra o .env

O backend usa `__dirname` para encontrar o `.env` na raiz. Se estiver tendo problemas:
- Verifique se está executando a partir da raiz do projeto
- Em produção, certifique-se de que o caminho relativo está correto

### Frontend não encontra variáveis

O Next.js lê automaticamente `.env` da raiz em monorepos. Se não funcionar:
- Verifique se o arquivo está na raiz
- Reinicie o servidor Next.js
- Verifique se as variáveis começam com `NEXT_PUBLIC_` se precisarem ser expostas ao cliente

## 📚 Referências

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [dotenv Documentation](https://github.com/motdotla/dotenv)

