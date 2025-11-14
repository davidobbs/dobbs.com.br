# Setup do Banco de Dados

Este documento explica como configurar o banco de dados para desenvolvimento local e produção.

## 🐳 Desenvolvimento Local (Docker)

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js >= 18

### Passos

1. **Iniciar os containers:**

```bash
docker-compose up -d
```

Isso iniciará:
- PostgreSQL na porta 5432
- Redis na porta 6379 (opcional)

2. **Configurar variáveis de ambiente:**

Copie o arquivo de exemplo:

```bash
cd backend
cp .env.example .env
```

O arquivo `.env` já está configurado para conectar ao PostgreSQL do Docker.

3. **Executar migrations:**

```bash
cd backend
npm install
npm run db:generate  # Gerar Prisma Client
npm run db:push      # Criar tabelas no banco
npm run db:seed      # Popular com dados de exemplo
```

4. **Verificar:**

```bash
npm run db:studio    # Abrir Prisma Studio (interface visual)
```

### Comandos Úteis

```bash
# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f postgres

# Limpar volumes (apaga dados)
docker-compose down -v

# Reiniciar containers
docker-compose restart
```

## ☁️ Produção (Vercel)

O Vercel é uma plataforma serverless, então não podemos rodar Docker diretamente. Use um banco de dados gerenciado.

### Opções Recomendadas

#### 1. Vercel Postgres (Recomendado)

Integração nativa com Vercel:

1. No dashboard do Vercel, vá em **Storage** → **Create Database** → **Postgres**
2. Copie a `DATABASE_URL` gerada
3. Adicione como variável de ambiente no projeto

**Vantagens:**
- Integração nativa
- Fácil de configurar
- Escalável automaticamente

#### 2. Supabase (Alternativa Popular)

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Copie a connection string (Settings → Database)
4. Adicione como `DATABASE_URL` no Vercel

**Vantagens:**
- Plano gratuito generoso
- Interface visual excelente
- Recursos extras (Auth, Storage, etc)

#### 3. Neon (Serverless Postgres)

1. Crie uma conta em [neon.tech](https://neon.tech)
2. Crie um novo projeto
3. Copie a connection string
4. Adicione como `DATABASE_URL` no Vercel

**Vantagens:**
- Postgres serverless puro
- Auto-scaling
- Branching de banco de dados

### Configuração no Vercel

1. **Adicionar variável de ambiente:**

No dashboard do Vercel:
- Settings → Environment Variables
- Adicione `DATABASE_URL` com a connection string do seu banco

2. **Deploy:**

```bash
# O Vercel detectará automaticamente o Prisma
vercel deploy
```

3. **Executar migrations em produção:**

```bash
# Via Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy

# Ou adicione no package.json do backend:
# "postdeploy": "prisma migrate deploy"
```

### Schema do Banco

O schema está definido em `backend/prisma/schema.prisma`:

- **posts**: Artigos do blog
- **projects**: Projetos/portfólio
- **contacts**: Mensagens de contato
- **users**: Usuários (para autenticação futura)

### Migrations

```bash
# Criar nova migration
npm run db:migrate -- --name nome_da_migration

# Aplicar migrations em produção
npm run db:migrate:deploy
```

## 🔒 Segurança

- **Nunca commite** arquivos `.env` ou `DATABASE_URL` no repositório
- Use variáveis de ambiente no Vercel
- Configure SSL para conexões de produção
- Use connection pooling em produção

## 📊 Monitoramento

### Prisma Studio (Desenvolvimento)

```bash
npm run db:studio
```

Abre interface visual em `http://localhost:5555`

### Logs de Produção

- Vercel: Dashboard → Functions → Logs
- Supabase: Dashboard → Logs
- Neon: Dashboard → Metrics

## 🐛 Troubleshooting

### Erro: "Can't reach database server"

- Verifique se Docker está rodando: `docker ps`
- Verifique a `DATABASE_URL` no `.env`
- Teste conexão: `docker-compose exec postgres psql -U dobbs -d dobbs_blog`

### Erro: "Migration failed"

- Verifique se o banco está acessível
- Verifique logs: `docker-compose logs postgres`
- Tente resetar: `npm run db:push -- --force-reset` (cuidado: apaga dados!)

### Erro no Vercel: "Prisma Client not generated"

Adicione no `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

## 📚 Recursos

- [Prisma Docs](https://www.prisma.io/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase Docs](https://supabase.com/docs)
- [Neon Docs](https://neon.tech/docs)

