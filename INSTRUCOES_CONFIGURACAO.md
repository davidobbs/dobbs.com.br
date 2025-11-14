# 🔧 Instruções para Corrigir o Assistente de IA

## ❌ Problema Atual

O assistente está retornando a mensagem de fallback porque:
- O arquivo `frontend/.env.local` **não existe**
- A API key do OpenRouter não está configurada no frontend
- Quando o backend demora muito (>60s), o sistema tenta usar OpenRouter diretamente, mas não encontra a API key

## ✅ Solução Rápida

### Passo 1: Criar arquivo `.env.local` no frontend

1. Vá para a pasta `frontend/`
2. Crie um arquivo chamado `.env.local` (sem extensão)
3. Adicione o seguinte conteúdo:

```env
# OpenRouter API Configuration (OBRIGATÓRIO)
OPENROUTER_API_KEY=sk-or-v1-sua_chave_real_aqui
OPENROUTER_MODEL=openai/gpt-4o-mini

# Site URL (opcional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API URL do backend (opcional)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Passo 2: Obter sua API Key do OpenRouter

1. Acesse https://openrouter.ai
2. Faça login ou crie uma conta
3. Vá em https://openrouter.ai/keys
4. Gere uma nova chave (ou use uma existente)
5. Copie a chave (começa com `sk-or-v1-`)
6. Cole no arquivo `.env.local` substituindo `sk-or-v1-sua_chave_real_aqui`

### Passo 3: Reiniciar o servidor Next.js

**IMPORTANTE:** O Next.js não recarrega variáveis de ambiente automaticamente!

1. Pare o servidor Next.js (Ctrl+C no terminal)
2. Inicie novamente:
   ```bash
   cd frontend
   npm run dev
   ```

### Passo 4: Testar

1. Abra http://localhost:3000
2. Clique no botão flutuante do chat
3. Envie uma mensagem
4. Agora deve funcionar! ✅

## 🔍 Verificar se Funcionou

### No Terminal do Next.js

Você deve ver logs como:
```
[Chat API] Requisição recebida
[Chat API] Backend URL: http://localhost:3001
[Chat API] Verificando OPENROUTER_API_KEY: Configurada (tamanho: XX)
[Chat API] Chamando OpenRouter diretamente...
[Chat API] Sucesso com OpenRouter! Retornando resposta em Xms
```

### No Console do Navegador

Você deve ver:
```
[ChatAssistant] Fetch concluído em Xms. Status: 200
[ChatAssistant] Resposta recebida: {hasMessage: true, messageLength: XXX}
```

## 📝 Notas Importantes

1. **O arquivo `.env.local` não deve ser commitado no Git** (já deve estar no `.gitignore`)
2. **Sempre reinicie o Next.js após alterar `.env.local`**
3. **A API key do backend é diferente da do frontend** - você pode usar a mesma chave em ambos
4. **Se o backend estiver funcionando**, ele será usado primeiro. Se não, o OpenRouter será usado diretamente.

## 🚨 Se Ainda Não Funcionar

1. **Verifique os logs no terminal do Next.js** - eles mostrarão exatamente o que está acontecendo
2. **Verifique se a API key está correta** - deve começar com `sk-or-v1-`
3. **Verifique se há créditos na conta OpenRouter** - https://openrouter.ai/activity
4. **Teste o backend diretamente:**
   ```powershell
   curl http://localhost:3001/health
   ```

## 💡 Por Que Isso Aconteceu?

O sistema foi projetado para ter **fallback automático**:
1. Tenta usar o backend primeiro (mais rápido, se estiver configurado)
2. Se o backend falhar ou demorar muito, tenta OpenRouter diretamente
3. Se OpenRouter também não estiver configurado, retorna mensagem de fallback

Como o backend estava demorando muito (57 segundos), o sistema tentou usar OpenRouter, mas não encontrou a API key no frontend, então retornou a mensagem de fallback.

