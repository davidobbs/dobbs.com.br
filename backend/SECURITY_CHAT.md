# 🔐 Segurança da Rota de Chat

## ✅ Medidas de Segurança Implementadas

### 1. **Validação de Entrada Rigorosa**
- ✅ Validação com Zod schema
- ✅ Limite de 2000 caracteres por mensagem
- ✅ Limite de 20 mensagens no histórico
- ✅ Sanitização automática (trim, validação de tipos)
- ✅ Validação de roles permitidas (user, assistant, system)

### 2. **Rate Limiting**
- ✅ Rate limiting global: 100 requisições/minuto
- ✅ Rate limiting específico para chat: **20 requisições/minuto por IP**
- ✅ Headers de rate limit expostos (`x-ratelimit-*`)

### 3. **Proteção da API Key**
- ✅ API key armazenada apenas no backend (variável de ambiente)
- ✅ Validação do formato da API key (`sk-or-v1-`)
- ✅ API key nunca exposta em logs ou respostas
- ✅ Verificação de existência antes de usar

### 4. **Timeout e Tratamento de Erros**
- ✅ Timeout de 30 segundos para requisições OpenRouter
- ✅ Tratamento específico para timeout (504 Gateway Timeout)
- ✅ Tratamento de erros de conexão (502 Bad Gateway)
- ✅ Mensagens de erro genéricas (sem expor detalhes internos)

### 5. **Limitação de Payload**
- ✅ Limite de 10.000 caracteres no payload total
- ✅ Histórico limitado a últimas 10 mensagens
- ✅ Truncamento automático se payload exceder limite

### 6. **Logging Seguro**
- ✅ Logs estruturados com request ID
- ✅ Log de IP e User-Agent para auditoria
- ✅ **NUNCA** loga mensagens do usuário ou respostas da IA
- ✅ Loga apenas métricas (tamanho, tokens, modelo)
- ✅ Logs de erro sem expor dados sensíveis

### 7. **CORS e Headers de Segurança**
- ✅ CORS configurado apenas para origens permitidas
- ✅ Helmet.js para headers de segurança HTTP
- ✅ Headers customizados para OpenRouter (HTTP-Referer, X-Title)

### 8. **Validação de Resposta**
- ✅ Validação da estrutura da resposta do OpenRouter
- ✅ Verificação de conteúdo antes de retornar
- ✅ Tratamento de respostas inválidas

## 🛡️ Camadas de Segurança

```
Cliente (Frontend)
    ↓
Rate Limiting (20 req/min)
    ↓
Validação de Entrada (Zod)
    ↓
Sanitização de Dados
    ↓
Validação de API Key
    ↓
Limitação de Payload
    ↓
Timeout (30s)
    ↓
OpenRouter API (com API Key segura)
    ↓
Validação de Resposta
    ↓
Logging Seguro
    ↓
Resposta ao Cliente
```

## 📊 Limites Configurados

| Item | Limite | Motivo |
|------|--------|--------|
| Mensagem individual | 2000 caracteres | Prevenir payload muito grande |
| Histórico de conversa | 20 mensagens | Limitar contexto enviado |
| Histórico processado | 10 mensagens | Otimizar performance |
| Payload total | 10.000 caracteres | Prevenir custos excessivos |
| Rate limit (chat) | 20 req/min | Prevenir abuso |
| Timeout | 30 segundos | Prevenir travamentos |

## 🔍 Monitoramento

### Logs Estruturados

**Requisição recebida:**
```json
{
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "requestId": "uuid-here"
}
```

**Mensagem processada:**
```json
{
  "requestId": "uuid-here",
  "ip": "192.168.1.1",
  "messageLength": 50,
  "responseLength": 200,
  "model": "openai/gpt-4o-mini",
  "tokensUsed": 150
}
```

**Erros:**
```json
{
  "requestId": "uuid-here",
  "ip": "192.168.1.1",
  "error": "Mensagem de erro (sem dados sensíveis)"
}
```

## ⚠️ O que NÃO é logado (por segurança)

- ❌ Conteúdo das mensagens do usuário
- ❌ Respostas da IA
- ❌ API keys ou tokens
- ❌ Dados pessoais
- ❌ Histórico completo de conversa

## 🚨 Respostas de Erro

### 400 Bad Request
- Dados inválidos (validação falhou)
- Mensagem muito longa
- Histórico muito grande

### 429 Too Many Requests
- Rate limit excedido

### 502 Bad Gateway
- Erro ao conectar com OpenRouter
- Erro de rede

### 503 Service Unavailable
- API key não configurada
- API key inválida

### 504 Gateway Timeout
- Timeout na requisição OpenRouter (30s)

### 500 Internal Server Error
- Erro inesperado (genérico, sem detalhes)

## ✅ Checklist de Segurança

- [x] API key nunca exposta
- [x] Validação rigorosa de entrada
- [x] Rate limiting configurado
- [x] Timeout implementado
- [x] Logs seguros (sem dados sensíveis)
- [x] Limitação de payload
- [x] Sanitização de dados
- [x] Tratamento de erros robusto
- [x] CORS configurado
- [x] Headers de segurança (Helmet)

## 🔄 Próximas Melhorias (Opcional)

- [ ] Autenticação opcional para usuários conhecidos
- [ ] Cache de respostas para perguntas frequentes
- [ ] Monitoramento de custos por IP
- [ ] Blacklist de IPs abusivos
- [ ] Métricas de uso (Prometheus/Grafana)

