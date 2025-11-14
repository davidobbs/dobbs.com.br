import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HudBorder, HudCorner, HudGrid, HudGlow } from '@/components/ui/HudEffects';
import { ArrowRight, ExternalLink, Github, TrendingUp, Sparkles } from 'lucide-react';

const allProjects = [
  {
    title: 'Consultoria: Aprendendo a Usar IA para Automação',
    description:
      'Pessoa que não sabia usar IA aprendeu a automatizar processos e reduziu 80% do tempo de trabalho. Aprendeu quais ferramentas usar e como fazer prompts eficientes.',
    tags: ['Aprendizado', 'Automação', 'LLMs'],
    impact: 'Redução de 80% no tempo',
    metrics: {
      timeReduction: '80%',
      efficiency: '2.5h → 30min',
      accuracy: '95%',
    },
    href: '/projects/automation-system',
  },
  {
    title: 'Consultoria: IA para Negócio Próprio',
    description:
      'Empreendedor que não sabia como aplicar IA no negócio aprendeu a usar chatbots e aumentou conversão em 35%. Aprendeu estratégia, ferramentas e métricas.',
    tags: ['Empreendedor', 'E-commerce', 'Chatbot'],
    impact: 'Aumento de 35% na conversão',
    metrics: {
      conversion: '35%',
      responseTime: '<2s',
      satisfaction: '4.8/5',
    },
    href: '/projects/chatbot',
  },
  {
    title: 'Consultoria: Profissional Aprendendo IA',
    description:
      'Profissional que queria usar IA no trabalho aprendeu a aplicar de forma eficiente. Aprendeu quando usar, como fazer prompts e quais ferramentas escolher.',
    tags: ['Profissional', 'Aplicação', 'IA'],
    impact: '90% de eficiência alcançada',
    metrics: {
      efficiency: '90%',
      timeSaved: '5h/semana',
      quality: 'A+',
    },
    href: '/projects/microservices',
  },
  {
    title: 'Consultoria: Aprendendo Prompts Eficientes',
    description:
      'Pessoa que fazia prompts sem resultado aprendeu técnicas avançadas e aumentou qualidade das respostas em 70%. Aprendeu estrutura, contexto e refinamento.',
    tags: ['Prompts', 'Técnicas', 'IA'],
    impact: 'Aumento de 70% na qualidade',
    metrics: {
      quality: '70%',
      accuracy: '92%',
      speed: '3x mais rápido',
    },
    href: '/projects/analytics',
  },
  {
    title: 'Consultoria: IA para Conteúdo',
    description:
      'Criador de conteúdo que não sabia usar IA aprendeu a gerar textos, imagens e vídeos de forma eficiente. Aprendeu ferramentas e workflows otimizados.',
    tags: ['Conteúdo', 'Criação', 'IA'],
    impact: 'Aumento de 45% na produtividade',
    metrics: {
      productivity: '45%',
      timeSaved: '10h/semana',
      quality: 'Profissional',
    },
    href: '/projects/recommendation',
  },
  {
    title: 'Consultoria: IA para Análise de Dados',
    description:
      'Analista que queria usar IA para dados aprendeu a aplicar de forma eficiente. Aprendeu ferramentas, técnicas e como interpretar resultados.',
    tags: ['Dados', 'Análise', 'IA'],
    impact: 'Redução de 60% no tempo',
    metrics: {
      timeReduction: '60%',
      insights: '500+/dia',
      accuracy: '88%',
    },
    href: '/projects/api-gateway',
  },
];

export const metadata = {
  title: 'Cases',
  description:
    'Exemplos reais de pessoas que aprenderam a usar IA corretamente e obtiveram resultados mensuráveis.',
};

export default function ProjectsPage() {
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
              <span className="uppercase tracking-wider">Cases de Consultoria</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-100 mb-6 leading-tight tracking-tight">
              Pessoas que aprenderam a usar{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
                IA corretamente
              </span>
            </h1>
            
            <p className="text-xl text-neutral-300 leading-relaxed">
              Exemplos reais de pessoas que não sabiam usar IA e aprenderam a aplicar de forma 
              assertiva e eficiente. Cada case mostra resultados mensuráveis e aplicação prática.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid with HUD */}
      <Section className="relative">
        <HudGrid density="normal" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {allProjects.map((project) => (
            <HudBorder key={project.title} variant="glow" intensity="medium" className="group">
              <Card hover={false} className="p-6 flex flex-col h-full bg-primary-100/30 backdrop-blur-sm border-0">
                <HudCorner position="top-left" size="sm" />
                <HudCorner position="top-right" size="sm" />
                
                <div className="flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
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
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-neutral-400 mb-5 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* HUD Metrics */}
                  <div className="space-y-3 mb-5">
                    <div className="bg-primary-200/20 border border-accent-500/20 rounded-lg p-3 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-neutral-500 uppercase tracking-wider">Impacto</span>
                        <div className="hud-data text-lg font-display font-bold text-accent-500">
                          {project.impact.split(' ')[0]}
                        </div>
                      </div>
                      <div className="text-xs text-neutral-400">{project.impact}</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="bg-primary-200/10 border border-accent-500/10 rounded-lg p-2 backdrop-blur-sm">
                          <div className="hud-data text-xs font-mono font-semibold text-accent-400 text-center">
                            {value}
                          </div>
                          <div className="text-[10px] text-neutral-500 uppercase tracking-wider text-center mt-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between mt-auto border border-accent-500/20 hover:border-accent-500/40 hover:bg-accent-500/5" 
                  href={project.href}
                >
                  <span>Ver Case Completo</span>
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
