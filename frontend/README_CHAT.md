# Configuração do Chatbot com OpenRouter

## 📋 Pré-requisitos

1. Conta no OpenRouter: https://openrouter.ai
2. API Key do OpenRouter: https://openrouter.ai/keys

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na pasta `frontend/` com as seguintes variáveis:

```env
# OpenRouter API Configuration
OPENROUTER_API_KEY=sk-or-v1-sua_chave_aqui
OPENROUTER_MODEL=openai/gpt-4o-mini

# Site URL (opcional)
NEXT_PUBLIC_SITE_URL=https://dobbs.com.br
```

### 2. Modelos Disponíveis

Você pode usar qualquer modelo disponível no OpenRouter. Alguns exemplos:

- `openai/gpt-4o-mini` - Rápido e econômico (recomendado)
- `openai/gpt-4o` - Mais poderoso, mas mais caro
- `anthropic/claude-3-haiku` - Rápido e eficiente
- `anthropic/claude-3-opus` - Mais poderoso
- `google/gemini-pro` - Alternativa do Google

Veja todos os modelos disponíveis em: https://openrouter.ai/models

### 3. Configuração no Vercel

1. Acesse o dashboard do Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:
   - `OPENROUTER_API_KEY` - Sua chave da API
   - `OPENROUTER_MODEL` - Modelo desejado (opcional, padrão: `openai/gpt-4o-mini`)
   - `NEXT_PUBLIC_SITE_URL` - URL do seu site (opcional)

### 4. Testar Localmente

```bash
cd frontend
npm run dev
```

Abra http://localhost:3000 e teste o chatbot clicando no botão flutuante.

## 🔍 Troubleshooting

### Chatbot não responde

1. **Verifique se a API key está configurada:**
   - No console do navegador (F12), verifique se há erros
   - Verifique os logs do servidor

2. **Verifique se há créditos na conta OpenRouter:**
   - Acesse https://openrouter.ai/activity
   - Verifique se há créditos disponíveis

3. **Verifique o modelo:**
   - Certifique-se de que o modelo especificado está disponível
   - Tente usar `openai/gpt-4o-mini` como padrão

### Erro "OPENROUTER_API_KEY não configurada"

- O chatbot usará uma resposta mockada
- Configure a variável de ambiente `OPENROUTER_API_KEY` no `.env.local` ou no Vercel

### Erro 401 (Unauthorized)

- Verifique se a API key está correta
- Certifique-se de que não há espaços extras na chave
- Gere uma nova chave em https://openrouter.ai/keys

### Erro 429 (Rate Limit)

- Você excedeu o limite de requisições
- Aguarde alguns minutos ou adicione mais créditos

## 💡 Dicas

- Use `gpt-4o-mini` para desenvolvimento (mais barato)
- Use `gpt-4o` ou `claude-3-opus` para produção (melhor qualidade)
- Monitore seus custos em https://openrouter.ai/activity
- O sistema tem fallback automático para resposta mockada se a API key não estiver configurada

