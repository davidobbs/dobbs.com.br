# 🔧 Correção do Timeout no Chatbot

## 🐛 Problema Identificado

O chatbot estava dando timeout após 60 segundos porque:

1. **A API tentava fazer proxy para o backend primeiro** (localhost:3001)
2. **Se o backend não estivesse rodando**, a requisição ficava travada esperando
3. **Só depois de 60 segundos** tentava chamar o OpenRouter diretamente

## ✅ Correções Aplicadas

### 1. Lógica Otimizada

- **Se `OPENROUTER_API_KEY` estiver disponível**: Vai direto para OpenRouter (mais rápido)
- **Se não tiver a chave**: Tenta o backend com timeout de 3 segundos (antes era 60s)

### 2. Logs Adicionados

Agora você verá nos logs do servidor:
```
[Chat API] OPENROUTER_API_KEY disponível? true/false
[Chat API] OPENROUTER_API_KEY disponível, pulando backend e indo direto para OpenRouter
[Chat API] Chamando OpenRouter diretamente...
[Chat API] Verificando OPENROUTER_API_KEY: Configurada (tamanho: XX)
```

### 3. Timeout Reduzido

- **Backend**: 3 segundos (antes era 60s)
- **OpenRouter**: 30 segundos (mantido)
- **Frontend**: 60 segundos (mantido)

## 🧪 Como Testar

### 1. Verificar se o `.env` está configurado

```bash
# Na raiz do projeto
cat .env | grep OPENROUTER
```

Deve mostrar:
```
OPENROUTER_API_KEY=sk-or-v1-sua_chave_aqui
OPENROUTER_MODEL=openai/gpt-4o-mini
```

### 2. Reiniciar o servidor

```bash
# Parar o servidor (Ctrl+C)
# Depois iniciar novamente:
npm run dev:frontend
```

### 3. Testar o chatbot

1. Acesse http://localhost:3000
2. Clique no botão do chatbot
3. Envie uma mensagem de teste
4. **Observe os logs no terminal do servidor**

### 4. Verificar os logs

**✅ Funcionando corretamente:**
```
[Chat API] Requisição recebida
[Chat API] OPENROUTER_API_KEY disponível? true
[Chat API] OPENROUTER_API_KEY disponível, pulando backend e indo direto para OpenRouter
[Chat API] Chamando OpenRouter diretamente...
[Chat API] Verificando OPENROUTER_API_KEY: Configurada (tamanho: 45)
[Chat API] Fazendo requisição para OpenRouter...
[Chat API] Status da resposta: 200
[Chat API] Sucesso com OpenRouter! Retornando resposta em XXXms
```

**❌ Se ainda der timeout:**
```
[Chat API] OPENROUTER_API_KEY disponível? false
[Chat API] Tentando proxy para backend (timeout de 3s)...
```

Neste caso, verifique se o `.env` está na raiz e se o `next.config.mjs` está carregando corretamente.

## 🔍 Troubleshooting

### Problema: Ainda dá timeout

**Solução:**
1. Verifique se o `.env` está na raiz do projeto
2. Verifique se `OPENROUTER_API_KEY` está configurada (sem aspas, sem espaços)
3. Reinicie o servidor completamente
4. Verifique os logs do servidor para ver qual caminho está sendo seguido

### Problema: "OPENROUTER_API_KEY não configurada"

**Solução:**
1. Verifique se o arquivo `.env` existe na raiz
2. Verifique se a variável está escrita corretamente (sem espaços antes/depois do `=`)
3. Verifique se o `next.config.mjs` está carregando o `.env` da raiz
4. Reinicie o servidor

### Problema: Logs mostram que está tentando o backend

**Solução:**
Isso significa que `OPENROUTER_API_KEY` não está sendo lida. Verifique:
1. O arquivo `.env` na raiz
2. O `next.config.mjs` carregando o `.env` corretamente
3. Reinicie o servidor

## 📊 Comparação Antes/Depois

### Antes:
- Tentava backend primeiro (60s timeout)
- Só depois tentava OpenRouter
- Total: até 60+ segundos

### Depois:
- Se tem `OPENROUTER_API_KEY`: Vai direto para OpenRouter
- Se não tem: Tenta backend (3s timeout) → OpenRouter
- Total: 2-5 segundos normalmente

## ✅ Checklist

- [ ] Arquivo `.env` existe na raiz
- [ ] `OPENROUTER_API_KEY` está configurada no `.env`
- [ ] Servidor foi reiniciado após as mudanças
- [ ] Logs mostram "OPENROUTER_API_KEY disponível? true"
- [ ] Chatbot responde em menos de 10 segundos

