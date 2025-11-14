import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HudBorder, HudCorner, HudGrid, HudGlow } from '@/components/ui/HudEffects';
import { Calendar, Clock, ArrowRight, Search, BookOpen, Sparkles } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';

const allPosts = [
  {
    title: 'Como Aprender a Usar IA Corretamente',
    excerpt:
      'Guia completo para pessoas que querem usar IA mas não sabem por onde começar. Ferramentas, técnicas e quando usar.',
    date: '2024-03-15',
    readTime: '12 min',
    tags: ['Aprendizado', 'IA', 'Guia'],
    slug: 'agents-in-production',
  },
  {
    title: 'Prompts Eficientes: Como Fazer IA Funcionar',
    excerpt:
      'Técnicas práticas para fazer prompts que realmente funcionam. Aprenda estrutura, contexto e refinamento.',
    date: '2024-03-10',
    readTime: '8 min',
    tags: ['Prompts', 'Técnicas', 'IA'],
    slug: 'cost-reduction-automation',
  },
  {
    title: 'Quais Ferramentas de IA Escolher',
    excerpt:
      'Guia prático para escolher as ferramentas certas de IA para cada caso. Quando usar ChatGPT, Claude, Midjourney e outras.',
    date: '2024-03-05',
    readTime: '15 min',
    tags: ['Ferramentas', 'IA', 'Guia'],
    slug: 'ai-architecture',
  },
  {
    title: 'Quando Usar IA e Quando Não Usar',
    excerpt:
      'Nem tudo precisa de IA. Aprenda a identificar quando IA realmente ajuda e quando é melhor fazer manualmente.',
    date: '2024-02-28',
    readTime: '10 min',
    tags: ['Estratégia', 'IA', 'Decisão'],
    slug: 'llms-production',
  },
  {
    title: 'IA para Profissionais: Aplicação Prática',
    excerpt:
      'Como profissionais de diferentes áreas podem usar IA no trabalho. Exemplos práticos e casos reais.',
    date: '2024-02-20',
    readTime: '9 min',
    tags: ['Profissional', 'Aplicação', 'IA'],
    slug: 'rpa-ai-automation',
  },
  {
    title: 'Erros Comuns ao Usar IA e Como Evitar',
    excerpt:
      'Os erros mais comuns que pessoas cometem ao usar IA e como evitá-los. Aprenda com os erros de outros.',
    date: '2024-02-15',
    readTime: '11 min',
    tags: ['Erros', 'IA', 'Boas Práticas'],
    slug: 'clean-code-ai',
  },
];

export const metadata = {
  title: 'Blog',
  description:
    'Artigos sobre como usar IA de forma assertiva e eficiente. Guias práticos para pessoas que querem aprender.',
};

export default function BlogPage() {
  return (
    <>
      {/* Hero Section with HUD */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-primary-50">
        <HudGrid density="sparse" />
        <HudGlow color="accent" size="lg" position="top" />
        
        <div className="container-custom relative z-10 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/30 text-accent-500 px-4 py-2 rounded-full text-xs font-medium mb-6 backdrop-blur-sm">
              <Sparkles size={14} />
              <span className="uppercase tracking-wider">Blog Técnico</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-100 mb-6 leading-tight tracking-tight">
              Aprenda a usar{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
                IA corretamente
              </span>
            </h1>
            
            <p className="text-xl text-neutral-300 leading-relaxed">
              Artigos práticos sobre como usar IA de forma assertiva e eficiente. 
              Guias, técnicas e casos reais para pessoas que querem aprender.
            </p>
          </div>
        </div>
      </section>

      {/* Search with HUD */}
      <Section className="relative bg-primary-50/50">
        <HudGrid density="sparse" />
        <div className="max-w-4xl mx-auto relative z-10">
          <HudBorder variant="glow" intensity="subtle">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-500/60" size={20} />
              <input
                type="text"
                placeholder="Buscar artigos..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-accent-500/20 bg-primary-100/30 backdrop-blur-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50"
              />
            </div>
          </HudBorder>
        </div>
      </Section>

      {/* Posts Grid with HUD */}
      <Section className="relative">
        <HudGrid density="normal" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {allPosts.map((post) => (
            <HudBorder key={post.slug} variant="glow" intensity="medium" className="group">
              <Card hover={false} className="p-6 flex flex-col h-full bg-primary-100/30 backdrop-blur-sm border-0">
                <HudCorner position="top-left" size="sm" />
                <HudCorner position="top-right" size="sm" />
                
                <div className="flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-medium rounded-md backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-neutral-100 mb-3 tracking-tight group-hover:text-accent-400 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-neutral-400 mb-5 leading-relaxed text-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* HUD Metadata */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-accent-500/60" />
                        <span className="hud-data">{formatDateShort(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-accent-500/60" />
                        <span className="hud-data">{post.readTime}</span>
                      </div>
                    </div>
                    
                    {/* Reading indicator */}
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <BookOpen size={12} className="text-accent-500/40" />
                      <span className="text-neutral-500">Artigo prático</span>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between mt-auto border border-accent-500/20 hover:border-accent-500/40 hover:bg-accent-500/5" 
                  href={`/blog/${post.slug}`}
                >
                  <span>Ler Artigo</span>
                  <ArrowRight size={16} className="text-accent-400" />
                </Button>
              </Card>
            </HudBorder>
          ))}
        </div>
      </Section>
    </>
  );
}
