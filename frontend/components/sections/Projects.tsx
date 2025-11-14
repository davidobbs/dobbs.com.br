import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { HudBorder, HudCorner, HudGrid } from '../ui/HudEffects';
import { ArrowRight, ExternalLink, TrendingUp, Activity, Zap } from 'lucide-react';

const featuredProjects = [
  {
    title: 'Consultoria: Aprendendo a Usar IA para Automação',
    description:
      'Pessoa que não sabia usar IA aprendeu a automatizar processos e reduziu 80% do tempo de trabalho. Aprendeu quais ferramentas usar e como fazer prompts eficientes.',
    tags: ['Aprendizado', 'Automação', 'LLMs'],
    impact: '80%',
    impactLabel: 'Redução de tempo',
    metric: '2.5h → 30min',
    metricLabel: 'Por tarefa',
    icon: Zap,
    href: '/projects/automation-system',
  },
  {
    title: 'Consultoria: IA para Negócio Próprio',
    description:
      'Empreendedor que não sabia como aplicar IA no negócio aprendeu a usar chatbots e aumentou conversão em 35%. Aprendeu estratégia, ferramentas e métricas.',
    tags: ['Empreendedor', 'E-commerce', 'Chatbot'],
    impact: '35%',
    impactLabel: 'Aumento de conversão',
    metric: 'Aplicação prática',
    metricLabel: 'Em 2 semanas',
    icon: TrendingUp,
    href: '/projects/chatbot',
  },
  {
    title: 'Consultoria: Profissional Aprendendo IA',
    description:
      'Profissional que queria usar IA no trabalho aprendeu a aplicar de forma eficiente. Aprendeu quando usar, como fazer prompts e quais ferramentas escolher.',
    tags: ['Profissional', 'Aplicação', 'IA'],
    impact: '90%',
    impactLabel: 'Eficiência alcançada',
    metric: 'Uso correto',
    metricLabel: 'Em 1 mês',
    icon: Activity,
    href: '/projects/microservices',
  },
];

export function Projects() {
  return (
    <Section
      title="Cases de Consultoria"
      subtitle="Exemplos reais de pessoas que aprenderam a usar IA corretamente e obtiveram resultados"
      className="relative bg-primary-50/50"
    >
      {/* HUD Grid Background */}
      <HudGrid density="normal" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        {featuredProjects.map((project) => {
          const Icon = project.icon;
          return (
            <HudBorder
              key={project.title}
              variant="glow"
              intensity="medium"
              className="group transition-all duration-500 hover:scale-[1.02]"
            >
              <Card hover={false} className="p-6 flex flex-col h-full bg-primary-100/30 backdrop-blur-sm border-0">
                <HudCorner position="top-left" size="sm" />
                <HudCorner position="top-right" size="sm" />
                
                {/* Header with Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-accent-500/10 rounded-lg blur-sm group-hover:bg-accent-500/20 transition-colors" />
                    <div className="relative w-full h-full bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-lg flex items-center justify-center border border-accent-500/30">
                      <Icon className="text-accent-400 group-hover:text-accent-500 transition-colors" size={20} />
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-medium rounded-md backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-neutral-100 mb-3 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 mb-5 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* HUD Metrics Dashboard */}
                  <div className="space-y-3 mb-5">
                    <div className="bg-primary-200/20 border border-accent-500/20 rounded-lg p-3 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-neutral-500 uppercase tracking-wider">Impacto</span>
                        <div className="hud-data text-lg font-display font-bold text-accent-500">
                          {project.impact}
                        </div>
                      </div>
                      <div className="text-xs text-neutral-400">{project.impactLabel}</div>
                    </div>
                    
                    <div className="bg-primary-200/10 border border-accent-500/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500 uppercase tracking-wider">{project.metricLabel}</span>
                        <div className="hud-data text-sm font-mono font-semibold text-accent-400">
                          {project.metric}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
          );
        })}
      </div>

      <div className="text-center mt-12 relative z-10">
        <HudBorder variant="outlined" intensity="subtle" className="inline-block">
          <Button variant="outline" size="lg" href="/projects" className="border-0">
            Ver Todos os Cases
            <ExternalLink className="ml-2" size={20} />
          </Button>
        </HudBorder>
      </div>
    </Section>
  );
}

