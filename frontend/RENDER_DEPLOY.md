# 🚀 Deploy no Render

Guia completo para fazer deploy do frontend Next.js no Render.

## 📋 Pré-requisitos

1. Conta no Render: https://render.com
2. Repositório Git (GitHub, GitLab ou Bitbucket)
3. API Key do OpenRouter configurada

## 🔧 Configuração no Render

### Opção 1: Usando render.yaml (Recomendado)

1. **Conecte seu repositório no Render:**
   - Acesse https://dashboard.render.com
   - Clique em "New +" → "Blueprint"
   - Conecte seu repositório Git
   - O Render detectará automaticamente o arquivo `render.yaml` na raiz

2. **Configure as variáveis de ambiente:**
   - No dashboard do Render, vá em "Environment"
   - Adicione as seguintes variáveis:

```
OPENROUTER_API_KEY=sk-or-v1-sua_chave_aqui
OPENROUTER_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_SITE_URL=https://seu-app.onrender.com
NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com (se tiver backend)
```

### Opção 2: Configuração Manual

1. **Crie um novo Web Service:**
   - Acesse https://dashboard.render.com
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório Git

2. **Configure o serviço:**
   - **Name:** `dobbs-blog-frontend`
   - **Environment:** `Node`
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Start Command:** `cd frontend && npm start`
   - **Root Directory:** (deixe vazio - o Render usa a raiz do repo)

3. **Variáveis de Ambiente:**
   - Clique em "Environment" e adicione:
     - `NODE_ENV` = `production`
     - `PORT` = `10000` (o Render define automaticamente, mas pode definir explicitamente)
     - `OPENROUTER_API_KEY` = sua chave
     - `OPENROUTER_MODEL` = `openai/gpt-4o-mini` (opcional)
     - `NEXT_PUBLIC_SITE_URL` = URL do seu app no Render
     - `NEXT_PUBLIC_API_URL` = URL do backend (se aplicável)

## ⚙️ Configurações Importantes

### Porta

O Render define automaticamente a variável `PORT`. O Next.js precisa ser configurado para usar essa porta:

```bash
# O comando start já está configurado no package.json
npm start
```

O Next.js automaticamente usa a variável `PORT` se estiver definida.

### Build e Start

O Render executa:
1. **Build:** `cd frontend && npm install && npm run build`
2. **Start:** `cd frontend && npm start`

Certifique-se de que esses comandos estão funcionando localmente antes de fazer deploy.

## 🔍 Troubleshooting

### Build falha

1. **Verifique os logs do build:**
   - No dashboard do Render, vá em "Logs"
   - Procure por erros de compilação

2. **Problemas comuns:**
   - Dependências faltando: verifique `package.json`
   - Erros de TypeScript: execute `npm run type-check` localmente
   - Variáveis de ambiente não encontradas: configure no painel do Render

### App não inicia

1. **Verifique os logs de runtime:**
   - Procure por erros de inicialização
   - Verifique se a porta está correta

2. **Health Check:**
   - O Render verifica `/` por padrão
   - Certifique-se de que a rota raiz está funcionando

### Variáveis de ambiente não funcionam

1. **Verifique se estão configuradas:**
   - Dashboard → Seu serviço → Environment
   - Certifique-se de que estão marcadas para "Production"

2. **Reinicie o serviço:**
   - Após adicionar variáveis, reinicie o serviço

## 📝 Checklist de Deploy

- [ ] Repositório conectado no Render
- [ ] Variáveis de ambiente configuradas
- [ ] Build passa localmente (`cd frontend && npm run build`)
- [ ] Start funciona localmente (`cd frontend && npm start`)
- [ ] Health check configurado (padrão: `/`)
- [ ] Domínio customizado configurado (opcional)

## 🔗 Links Úteis

- [Documentação do Render](https://render.com/docs)
- [Deploy Next.js no Render](https://render.com/docs/deploy-nextjs)
- [Variáveis de Ambiente no Render](https://render.com/docs/environment-variables)

