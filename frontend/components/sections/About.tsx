import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { HudBorder, HudCorner, HudGrid } from '../ui/HudEffects';
import { Code, Brain, Zap, Target } from 'lucide-react';

const expertise = [
  {
    icon: Brain,
    title: 'Aprenda a Usar IA Corretamente',
    description:
      'Você não precisa ser técnico. Ensino como usar IA de forma assertiva: quais ferramentas escolher, como fazer prompts eficientes e evitar erros comuns.',
    metric: '90%',
    metricLabel: 'Redução de erros',
  },
  {
    icon: Code,
    title: 'Aplicação Prática no Seu Contexto',
    description:
      'Não apenas teoria genérica. Mostro como aplicar IA no seu trabalho, negócio ou projeto específico. Orientação personalizada e direta.',
    metric: '100%',
    metricLabel: 'Foco prático',
  },
  {
    icon: Zap,
    title: 'Eficiência Imediata',
    description:
      'Saia da consultoria sabendo exatamente o que fazer. Sem perder tempo com tentativas e erros. Aplicação direta e resultados rápidos.',
    metric: '80%',
    metricLabel: 'Ganho de tempo',
  },
  {
    icon: Target,
    title: 'Resultados Reais',
    description:
      'Cada pessoa termina com um plano claro: o que usar, como usar e como medir se está funcionando. Não apenas teoria, mas ação.',
    metric: '100%',
    metricLabel: 'Foco em ação',
  },
];

export function About() {
  return (
    <Section
      title="Para quem não sabe usar IA corretamente"
      subtitle="Aprenda a aplicar IA de forma assertiva e eficiente, sem perder tempo com tentativas e erros"
      className="relative"
    >
      {/* HUD Grid Background */}
      <HudGrid density="sparse" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
        {expertise.map((item) => {
          const Icon = item.icon;
          return (
            <HudBorder
              key={item.title}
              variant="glow"
              intensity="medium"
              className="group transition-all duration-500 hover:scale-[1.02]"
            >
              <Card hover={false} className="p-6 h-full bg-primary-100/30 backdrop-blur-sm border-0">
                <HudCorner position="top-left" size="sm" />
                <HudCorner position="top-right" size="sm" />
                
                {/* Icon with HUD effect */}
                <div className="relative w-14 h-14 mb-5">
                  <div className="absolute inset-0 bg-accent-500/10 rounded-lg blur-sm group-hover:bg-accent-500/20 transition-colors" />
                  <div className="relative w-full h-full bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-lg flex items-center justify-center border border-accent-500/30">
                    <Icon className="text-accent-400 group-hover:text-accent-500 transition-colors" size={28} />
                  </div>
                </div>

                {/* Metric Display */}
                <div className="mb-4">
                  <div className="hud-data text-2xl font-display font-bold text-accent-500 mb-1">
                    {item.metric}
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">
                    {item.metricLabel}
                  </div>
                </div>

                <h3 className="text-xl font-display font-semibold text-neutral-100 mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{item.description}</p>
              </Card>
            </HudBorder>
          );
        })}
      </div>

      {/* Personal Note with HUD styling */}
      <div className="mt-20 lg:mt-24 max-w-4xl mx-auto relative z-10">
        <HudBorder variant="grid" intensity="subtle" className="group">
          <Card variant="elevated" className="p-8 md:p-12 bg-primary-100/40 backdrop-blur-sm border-0 relative overflow-hidden">
            <HudGrid density="sparse" />
            <HudCorner position="all" size="md" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-accent-500" />
                <span className="hud-data text-sm uppercase tracking-widest">Sobre a Consultoria</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-display font-bold text-neutral-100 mb-6 tracking-tight">
                Consultoria de IA Aplicada
              </h3>
              
              <div className="space-y-4 text-neutral-300 leading-relaxed">
                <p className="text-lg">
                  Você já tentou usar IA e não funcionou? Não sabe qual ferramenta escolher? Faz prompts e não obtém o resultado esperado?{' '}
                  <span className="text-accent-400 font-semibold">Você não está sozinho</span>.
                </p>
                <p className="text-lg">
                  Minha consultoria é para <span className="text-accent-400 font-semibold">pessoas que querem usar IA corretamente</span>, mas não sabem como. 
                  Ensino: <strong className="text-neutral-200">quais</strong> ferramentas usar, <strong className="text-neutral-200">como</strong> fazer prompts eficientes,{' '}
                  <strong className="text-neutral-200">quando</strong> usar IA e <strong className="text-neutral-200">quando não usar</strong>. 
                  Sem teoria genérica — apenas <span className="text-accent-400 font-semibold">orientação prática para o seu caso específico</span>.
                </p>
                <p className="text-lg">
                  Ideal para profissionais, empreendedores e pessoas que sabem que IA pode ajudar, mas não conseguem aplicar de forma eficiente.
                </p>
              </div>

              {/* HUD Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-neutral-800/50">
                <div>
                  <div className="hud-data text-2xl font-display font-bold text-accent-500 mb-1">
                    5+
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Anos</div>
                </div>
                <div>
                  <div className="hud-data text-2xl font-display font-bold text-accent-500 mb-1">
                    20+
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Projetos</div>
                </div>
                <div>
                  <div className="hud-data text-2xl font-display font-bold text-accent-500 mb-1">
                    100%
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Foco</div>
                </div>
              </div>
            </div>
          </Card>
        </HudBorder>
      </div>
    </Section>
  );
}

