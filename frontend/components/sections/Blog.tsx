import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { HudBorder, HudCorner, HudGrid } from '../ui/HudEffects';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

const featuredPosts = [
  {
    title: 'Como Implementar Agentes de IA em Produção',
    excerpt:
      'Guia completo sobre arquitetura, monitoramento e boas práticas para colocar agentes de IA em produção com segurança e escalabilidade.',
    date: '2024-03-15',
    readTime: '12 min',
    tags: ['IA', 'Arquitetura', 'Produção'],
    href: '/blog/agents-in-production',
  },
  {
    title: 'Reduzindo Custos com Automação Inteligente',
    excerpt:
      'Estudo de caso real: como reduzimos 60% dos custos operacionais de uma empresa usando LLMs e automação de processos.',
    date: '2024-03-10',
    readTime: '8 min',
    tags: ['Automação', 'Negócios', 'IA'],
    href: '/blog/cost-reduction-automation',
  },
  {
    title: 'Arquitetura de Software para Sistemas com IA',
    excerpt:
      'Padrões arquiteturais, decisões de design e trade-offs ao construir sistemas que integram modelos de IA de forma escalável.',
    date: '2024-03-05',
    readTime: '15 min',
    tags: ['Arquitetura', 'IA', 'Engenharia'],
    href: '/blog/ai-architecture',
  },
];

export function Blog() {
  return (
    <Section
      title="Artigos Técnicos"
      subtitle="Conteúdo profundo sobre IA, arquitetura e engenharia de software"
      className="relative"
    >
      {/* HUD Grid Background */}
      <HudGrid density="sparse" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        {featuredPosts.map((post) => (
          <HudBorder
            key={post.title}
            variant="glow"
            intensity="medium"
            className="group transition-all duration-500 hover:scale-[1.02]"
          >
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
                      <span className="hud-data">{new Date(post.date).toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-accent-500/60" />
                      <span className="hud-data">{post.readTime}</span>
                    </div>
                  </div>
                  
                  {/* Reading indicator */}
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <BookOpen size={12} className="text-accent-500/40" />
                    <span className="text-neutral-500">Artigo técnico</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-between mt-auto border border-accent-500/20 hover:border-accent-500/40 hover:bg-accent-500/5" 
                href={post.href}
              >
                <span>Ler Artigo</span>
                <ArrowRight size={16} className="text-accent-400" />
              </Button>
            </Card>
          </HudBorder>
        ))}
      </div>

      <div className="text-center mt-12 relative z-10">
        <HudBorder variant="outlined" intensity="subtle" className="inline-block">
          <Button variant="outline" size="lg" href="/blog" className="border-0">
            Ver Todos os Artigos
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </HudBorder>
      </div>
    </Section>
  );
}

