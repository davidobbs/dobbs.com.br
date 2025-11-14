# 🔧 Fix: Node.js Version 22.x no Vercel

## ✅ Alterações Realizadas

1. **Atualizado `package.json` (raiz)**: `"node": "22.x"`
2. **Atualizado `frontend/package.json`**: `"node": "22.x"`
3. **Atualizado `backend/package.json`**: `"node": "22.x"`
4. **Criado `frontend/vercel.json`**: Força Node.js 22.x

## 🚀 Próximos Passos

### 1. Commit e Push das Alterações

```bash
git add package.json frontend/package.json backend/package.json frontend/vercel.json
git commit -m "chore: atualizar Node.js para versão 22.x e adicionar vercel.json"
git push
```

### 2. Verificar Configuração no Vercel

1. Acesse o dashboard do Vercel: https://vercel.com
2. Vá em **Settings** → **General**
3. Verifique o **Root Directory**:
   - Se estiver deployando o frontend, deve ser: `frontend`
   - Se estiver deployando a raiz, deve estar vazio ou ser: `.`

### 3. Limpar Cache do Build (se necessário)

No dashboard do Vercel:
1. Vá em **Settings** → **General**
2. Role até **Build & Development Settings**
3. Clique em **Clear Build Cache**
4. Faça um novo deploy

### 4. Forçar Novo Deploy

Se o erro persistir:
1. No dashboard do Vercel, vá em **Deployments**
2. Clique nos três pontos (...) do último deploy
3. Selecione **Redeploy**
4. Marque **Use existing Build Cache** como **desmarcado**

## 🔍 Verificação

Após o deploy, verifique os logs do build. Você deve ver:
```
Node.js Version: 22.x
```

Ao invés de:
```
Node.js Version: 18.x (discontinued)
```

## 📝 Notas Importantes

- O Vercel detecta a versão do Node.js pelo campo `engines.node` no `package.json`
- Se o projeto estiver configurado com **Root Directory** = `frontend`, o Vercel usará `frontend/package.json`
- O arquivo `frontend/vercel.json` força explicitamente a versão 22.x
- O cache do build pode estar usando a versão antiga - limpe o cache se necessário

## 🆘 Se Ainda Não Funcionar

1. **Verifique o Root Directory no Vercel:**
   - Settings → General → Root Directory
   - Deve apontar para `frontend` se estiver deployando o frontend

2. **Verifique se há variáveis de ambiente no Vercel:**
   - Settings → Environment Variables
   - Não deve haver `NODE_VERSION` ou similar sobrescrevendo

3. **Verifique os logs do build:**
   - No deploy, veja qual `package.json` está sendo usado
   - Verifique se está lendo o arquivo correto

4. **Crie um novo projeto no Vercel (último recurso):**
   - Às vezes é mais rápido criar um novo projeto
   - Conecte ao mesmo repositório
   - Configure o Root Directory corretamente

