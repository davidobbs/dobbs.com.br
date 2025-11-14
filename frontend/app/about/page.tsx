import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HudBorder, HudCorner, HudGrid, HudGlow } from '@/components/ui/HudEffects';
import {
  Code,
  Brain,
  Zap,
  Target,
  Award,
  Layers,
  Sparkles,
  LineChart,
  Users,
  BookOpen,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

const stats = [
  {
    value: '50+',
    label: 'pessoas orientadas',
    detail: 'Aprenderam a usar IA de forma assertiva e eficiente.',
  },
  {
    value: '90%',
    label: 'redução de erros',
    detail: 'Pessoas que aprenderam a usar IA corretamente.',
  },
  {
    value: '100%',
    label: 'foco prático',
    detail: 'Orientação personalizada para cada caso específico.',
  },
];

const toolkit = [
  {
    category: 'IA aplicada',
    items: [
      'LLMs (GPT, Claude, Llama)',
      'Agentes orquestrados',
      'RAG e vetorização',
      'Avaliação e observabilidade',
    ],
  },
  {
    category: 'Engenharia',
    items: ['TypeScript/Node.js', 'Python', 'Go', 'React/Next.js', 'Fastify/Nest'],
  },
  {
    category: 'Arquitetura',
    items: ['Event-driven', 'Domain-driven design', 'Micro frontends', 'Clean Architecture'],
  },
  {
    category: 'Plataforma',
    items: ['AWS/GCP', 'Docker/Kubernetes', 'Terraform', 'CI/CD', 'Monitoring & tracing'],
  },
];

const focusAreas = [
  {
    title: 'Aprender a Usar IA',
    icon: Target,
    description: 'Ensino como usar IA de forma assertiva: ferramentas, prompts e quando usar.',
    bullets: [
      'Quais ferramentas escolher para cada caso',
      'Como fazer prompts eficientes',
      'Quando usar IA e quando não usar',
    ],
  },
  {
    title: 'Aplicação Prática',
    icon: Layers,
    description: 'Orientação personalizada para aplicar IA no seu trabalho ou negócio.',
    bullets: [
      'Aplicação no seu contexto específico',
      'Evitar tentativas e erros',
      'Resultados imediatos e mensuráveis',
    ],
  },
  {
    title: 'Eficiência Garantida',
    icon: LineChart,
    description: 'Saia da consultoria sabendo exatamente o que fazer e como medir.',
    bullets: [
      'Plano claro de ação',
      'Métricas para acompanhar',
      'Evolução contínua',
    ],
  },
];

const principles = [
  {
    icon: Target,
    title: 'Clareza de Aplicação',
    description: 'Cada pessoa sai sabendo exatamente como usar IA no seu caso.',
  },
  {
    icon: Code,
    title: 'Orientação Prática',
    description: 'Não apenas teoria, mas aplicação direta e resultados rápidos.',
  },
  {
    icon: Sparkles,
    title: 'Personalização',
    description: 'Cada consultoria é adaptada ao seu contexto e necessidades.',
  },
  {
    icon: Users,
    title: 'Foco em Pessoas',
    description: 'Para quem quer usar IA corretamente, mas não sabe como.',
  },
];

export const metadata = {
  title: 'Sobre',
  description: 'Consultoria de IA para pessoas que querem aprender a usar IA de forma assertiva e eficiente.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section with HUD */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-primary-50">
        <HudGrid density="sparse" />
        <HudGlow color="accent" size="lg" position="top" />
        
        <div className="container-custom relative z-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/30 text-accent-500 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-sm">
                <Sparkles size={14} />
                <span className="uppercase tracking-wider">Sobre a Consultoria</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-100 leading-tight tracking-tight">
                Aprenda a usar{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
                  IA corretamente
                </span>
              </h1>
              
              <p className="text-lg text-neutral-300 leading-relaxed">
                Consultoria para pessoas que querem usar IA de verdade, mas não sabem por onde começar. 
                Não apenas tecnologia, mas <strong className="text-neutral-100">como aplicar</strong> de forma 
                assertiva e eficiente.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" size="lg" variant="primary">
                  Agendar Consultoria
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button href="/projects" variant="outline" size="lg">
                  Ver Cases
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {stats.map((stat) => (
                  <HudBorder key={stat.label} variant="glow" intensity="subtle" className="group">
                    <div className="p-4 bg-primary-100/30 backdrop-blur-sm border-0">
                      <HudCorner position="top-left" size="sm" />
                      <HudCorner position="top-right" size="sm" />
                      <div className="hud-data text-3xl font-display font-bold text-accent-500 mb-1">
                        {stat.value}
                      </div>
                      <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1">
                        {stat.label}
                      </p>
                      <p className="text-xs text-neutral-500 mt-2">{stat.detail}</p>
                    </div>
                  </HudBorder>
                ))}
              </div>
            </div>
            
            <HudBorder variant="grid" intensity="medium" className="lg:col-span-2">
              <Card variant="elevated" className="p-8 bg-primary-100/40 backdrop-blur-sm border-0">
                <HudCorner position="all" size="md" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-1 w-8 bg-accent-500" />
                    <span className="hud-data text-xs uppercase tracking-widest">Hoje</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-semibold mb-4 text-neutral-100">
                    Consultoria para quem quer usar IA corretamente
                  </h3>
                  
                  <p className="text-neutral-300 mb-6 leading-relaxed">
                    Ensino pessoas a usar IA de forma assertiva e eficiente. Não apenas teoria genérica, 
                    mas orientação prática para o seu caso específico.
                  </p>
                  
                  <div className="space-y-3 text-sm text-neutral-300">
                    <div className="flex items-center gap-3">
                      <Brain className="text-accent-400" size={18} />
                      <span>Quais ferramentas usar e quando</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="text-accent-400" size={18} />
                      <span>Como fazer prompts eficientes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="text-accent-400" size={18} />
                      <span>Aplicação prática no seu contexto</span>
                    </div>
                  </div>
                </div>
              </Card>
            </HudBorder>
          </div>
        </div>
      </section>

      {/* Focus Areas with HUD */}
      <Section className="relative bg-primary-50/50">
        <HudGrid density="normal" />
        <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/30 text-accent-500 px-4 py-2 rounded-full text-xs font-medium mb-4 backdrop-blur-sm">
            <Target size={14} />
            <span className="uppercase tracking-wider">Como Funciona</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-100 mb-4 tracking-tight">
            Onde costumo gerar mais valor
          </h2>
          <p className="text-neutral-400 text-lg">
            Do aprendizado básico à aplicação avançada, atuo com estruturas modulares que se encaixam na realidade de cada pessoa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {focusAreas.map(({ title, description, bullets, icon: Icon }) => (
            <HudBorder key={title} variant="glow" intensity="medium" className="group">
              <Card className="p-6 bg-primary-100/30 backdrop-blur-sm border-0 flex flex-col gap-5 h-full">
                <HudCorner position="top-left" size="sm" />
                <HudCorner position="top-right" size="sm" />
                
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-accent-500/10 rounded-lg blur-sm group-hover:bg-accent-500/20 transition-colors" />
                    <div className="relative w-full h-full bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-lg flex items-center justify-center border border-accent-500/30">
                      <Icon className="text-accent-400 group-hover:text-accent-500 transition-colors" size={22} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-neutral-100">{title}</h3>
                    <p className="text-sm text-neutral-400">{description}</p>
                  </div>
                </div>
                
                <ul className="space-y-3 text-sm text-neutral-300">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </HudBorder>
          ))}
        </div>
      </Section>

      {/* Toolkit with HUD */}
      <Section className="relative bg-primary-50">
        <HudGrid density="sparse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-accent-500" />
              <span className="hud-data text-xs uppercase tracking-widest">Toolkit</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-neutral-100 mb-6 tracking-tight">
              Tecnologia que domino
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {toolkit.map((skill) => (
                <HudBorder key={skill.category} variant="glow" intensity="subtle">
                  <Card className="p-5 bg-primary-100/30 backdrop-blur-sm border-0">
                    <HudCorner position="top-left" size="sm" />
                    <h3 className="text-lg font-display font-semibold mb-3 text-neutral-100">{skill.category}</h3>
                    <ul className="space-y-2 text-sm text-neutral-300">
                      {skill.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </HudBorder>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-accent-500" />
              <span className="hud-data text-xs uppercase tracking-widest">Valores</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-neutral-100 mb-6 tracking-tight">
              Como tomo decisões
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {principles.map(({ icon: Icon, title, description }) => (
                <HudBorder key={title} variant="glow" intensity="subtle">
                  <Card className="p-6 text-center bg-primary-100/30 backdrop-blur-sm border-0">
                    <HudCorner position="all" size="sm" />
                    <Icon className="mx-auto mb-4 text-accent-400" size={30} />
                    <h3 className="font-display font-semibold mb-2 text-neutral-100">{title}</h3>
                    <p className="text-sm text-neutral-400">{description}</p>
                  </Card>
                </HudBorder>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="relative bg-primary-50/50">
        <HudGrid density="sparse" />
        <div className="text-center relative z-10">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-neutral-100 mb-4 tracking-tight">
            Pronto para aprender a usar IA corretamente?
          </h3>
          <p className="text-neutral-400 mb-6 text-lg max-w-2xl mx-auto">
            Agende uma consultoria e aprenda como usar IA de forma assertiva e eficiente. 
            Sem teoria genérica — apenas orientação prática para o seu caso específico.
          </p>
          <HudBorder variant="outlined" intensity="medium" className="inline-block">
            <Button size="lg" href="/contact" variant="primary" className="border-0">
              Agendar Consultoria
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </HudBorder>
        </div>
      </Section>
    </>
  );
}
