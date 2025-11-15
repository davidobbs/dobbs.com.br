import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { createRequire } from 'module';

// Carrega .env apenas em desenvolvimento local
// No Vercel, as variáveis vêm automaticamente do process.env (configuradas no painel)
if (process.env.NODE_ENV !== 'production') {
  try {
    const require = createRequire(import.meta.url);
    const dotenv = require('dotenv');
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const rootEnvPath = resolve(__dirname, '..', '.env');
    
    if (existsSync(rootEnvPath)) {
      dotenv.config({ path: rootEnvPath });
      console.log('[Next Config] Carregando .env local de:', rootEnvPath);
    }
  } catch (error) {
    // Ignorar erros - no Vercel não precisa carregar .env
    console.log('[Next Config] Usando variáveis de ambiente do sistema');
  }
}

console.log('[Next Config] OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? 'Configurada' : 'NÃO CONFIGURADA');

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    mdxRs: false,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    // Garantir que as variáveis do .env da raiz estejam disponíveis
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    OPENROUTER_MODEL: process.env.OPENROUTER_MODEL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
});

export default withMDX(nextConfig);

