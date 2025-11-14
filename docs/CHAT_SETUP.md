# Guia de Configuração e Teste do Assistente de IA

## ✅ Checklist de Verificação

### 1. Configuração do Backend

- [ ] Arquivo `.env` criado em `backend/.env`
- [ ] `OPENROUTER_API_KEY` configurada com sua chave real
- [ ] `OPENROUTER_MODEL` configurado (padrão: `openai/gpt-4o-mini`)

### 2. Iniciar Servidores

#### Backend (Terminal 1)
```bash
cd backend
npm run dev
```

**Verificar se está rodando:**
- Deve mostrar: `🚀 Backend rodando em http://0.0.0.0:3001`
- Teste: Acesse http://localhost:3001/health no navegador

#### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

**Verificar se está rodando:**
- Deve mostrar: `Ready on http://localhost:3000`
- Teste: Acesse http://localhost:3000 no navegador

### 3. Testar o Assistente

1. Abra o site em http://localhost:3000
2. Procure o botão flutuante com ícone de robô no canto inferior direito
3. Clique no botão para abrir o chat
4. Digite uma mensagem de teste (ex: "Olá")
5. Verifique se recebe uma resposta do assistente

## 🔍 Troubleshooting

### Problema: Backend não inicia

**Possíveis causas:**
- Porta 3001 já está em uso
- Variáveis de ambiente não configuradas
- Dependências não instaladas

**Solução:**
```bash
# Verificar se a porta está em uso
netstat -ano | findstr :3001

# Instalar dependências
cd backend
npm install

# Verificar arquivo .env
cat .env
```

### Problema: Erro "OPENROUTER_API_KEY não configurada"

**Solução:**
1. Abra `backend/.env`
2. Verifique se `OPENROUTER_API_KEY` está configurada
3. Remova aspas se houver: `OPENROUTER_API_KEY=sua_chave_aqui` (sem aspas)
4. Reinicie o backend

### Problema: Erro ao fazer requisição para OpenRouter

**Possíveis causas:**
- API key inválida ou expirada
- Créditos insuficientes na conta OpenRouter
- Modelo não disponível

**Solução:**
1. Verifique sua API key em https://openrouter.ai/keys
2. Verifique seus créditos em https://openrouter.ai/activity
3. Teste com outro modelo no `.env`:
   ```env
   OPENROUTER_MODEL=anthropic/claude-3-haiku
   ```

### Problema: Botão flutuante não aparece

**Possíveis causas:**
- Frontend não está rodando
- Erro de JavaScript no console
- CSS não carregado

**Solução:**
1. Abra o console do navegador (F12)
2. Verifique erros no console
3. Verifique se o componente está sendo renderizado:
   - Procure por "FloatingChatButton" no código fonte
4. Limpe o cache e recarregue a página (Ctrl+Shift+R)

### Problema: Chat não envia mensagens

**Possíveis causas:**
- Backend não está rodando
- CORS não configurado
- URL da API incorreta

**Solução:**
1. Verifique se o backend está rodando na porta 3001
2. Verifique o console do navegador para erros de CORS
3. Verifique a variável `NEXT_PUBLIC_API_URL` no frontend
4. Teste a rota diretamente:
   ```bash
   curl -X POST http://localhost:3001/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"teste","conversationHistory":[]}'
   ```

## 🧪 Teste Manual da API

### Via cURL (PowerShell)
```powershell
$body = @{
    message = "Olá, teste"
    conversationHistory = @()
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/chat" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

### Via Navegador (Teste de Health)
Acesse: http://localhost:3001/health

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": ...
}
```

## 📝 Logs Úteis

### Backend
Os logs do backend mostram:
- Requisições recebidas
- Erros da API do OpenRouter
- Tempo de resposta

### Frontend
Abra o console do navegador (F12) para ver:
- Erros de rede
- Erros de JavaScript
- Respostas da API

## 🚀 Próximos Passos

Após verificar que tudo está funcionando:

1. **Personalizar o prompt do sistema** em `backend/src/routes/chat.ts`
2. **Ajustar parâmetros do modelo** (temperature, max_tokens)
3. **Adicionar persistência de conversas** (opcional)
4. **Implementar rate limiting por usuário** (opcional)
5. **Adicionar analytics** para monitorar uso

## 📞 Suporte

Se ainda tiver problemas:
1. Verifique os logs do backend
2. Verifique o console do navegador
3. Teste a API diretamente com cURL/Postman
4. Verifique a documentação do OpenRouter: https://openrouter.ai/docs

