import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HudBorder, HudCorner, HudGrid } from '@/components/ui/HudEffects';
import { ArrowLeft, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Consultoria: Aprendendo a Usar IA para Automação',
  description:
    'Case de consultoria: pessoa que não sabia usar IA aprendeu a automatizar processos e reduziu 80% do tempo de trabalho.',
};

export default function AutomationSystemPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-primary-50">
        <HudGrid density="sparse" />
        <div className="container-custom relative z-10 py-24">
          <Button variant="ghost" size="sm" href="/projects" className="mb-8">
            <ArrowLeft className="mr-2" size={16} />
            Voltar aos Cases
          </Button>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/30 text-accent-500 px-4 py-2 rounded-full text-xs font-medium mb-6 backdrop-blur-sm">
              <Target size={14} />
              <span className="uppercase tracking-wider">Case de Consultoria</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-100 mb-6 leading-tight tracking-tight">
              Aprendendo a Usar IA para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
                Automação
              </span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Pessoa que não sabia usar IA aprendeu a automatizar processos e reduziu 80% do tempo de trabalho. 
              Aprendeu quais ferramentas usar e como fazer prompts eficientes.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <Section className="relative">
        <HudGrid density="normal" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          {/* Metrics */}
          <HudBorder variant="glow" intensity="medium">
            <Card className="p-8 bg-primary-100/30 backdrop-blur-sm border-0">
              <HudCorner position="all" size="md" />
              <h2 className="text-2xl font-display font-bold text-neutral-100 mb-6">Resultados Alcançados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="hud-data text-4xl font-display font-bold text-accent-500 mb-2">80%</div>
                  <div className="text-sm text-neutral-400">Redução no tempo</div>
                </div>
                <div>
                  <div className="hud-data text-4xl font-display font-bold text-accent-500 mb-2">2.5h → 30min</div>
                  <div className="text-sm text-neutral-400">Eficiência</div>
                </div>
                <div>
                  <div className="hud-data text-4xl font-display font-bold text-accent-500 mb-2">95%</div>
                  <div className="text-sm text-neutral-400">Precisão</div>
                </div>
              </div>
            </Card>
          </HudBorder>

          {/* Challenge */}
          <HudBorder variant="glow" intensity="subtle">
            <Card className="p-8 bg-primary-100/30 backdrop-blur-sm border-0">
              <HudCorner position="top-left" size="sm" />
              <HudCorner position="top-right" size="sm" />
              <h2 className="text-2xl font-display font-bold text-neutral-100 mb-4">O Desafio</h2>
              <p className="text-neutral-300 leading-relaxed">
                A pessoa tinha processos repetitivos que consumiam muito tempo, mas não sabia como usar IA para automatizar. 
                Tentou algumas ferramentas, mas não conseguia resultados satisfatórios por falta de conhecimento sobre:
              </p>
              <ul className="mt-4 space-y-2 text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-accent-500 mt-1" size={18} />
                  <span>Quais ferramentas escolher para cada tipo de automação</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-accent-500 mt-1" size={18} />
                  <span>Como fazer prompts eficientes para automação</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-accent-500 mt-1" size={18} />
                  <span>Quando usar IA e quando fazer manualmente</span>
                </li>
              </ul>
            </Card>
          </HudBorder>

          {/* Solution */}
          <HudBorder variant="glow" intensity="subtle">
            <Card className="p-8 bg-primary-100/30 backdrop-blur-sm border-0">
              <HudCorner position="top-left" size="sm" />
              <HudCorner position="top-right" size="sm" />
              <h2 className="text-2xl font-display font-bold text-neutral-100 mb-4">A Solução</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Através da consultoria, a pessoa aprendeu:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="text-accent-400" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 mb-1">Ferramentas Certas</h3>
                    <p className="text-sm text-neutral-400">
                      Aprendeu a escolher as ferramentas adequadas para cada tipo de automação (LLMs, RPA, scripts).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-accent-400" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 mb-1">Prompts Eficientes</h3>
                    <p className="text-sm text-neutral-400">
                      Aprendeu técnicas para criar prompts que geram resultados precisos e confiáveis.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-accent-400" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 mb-1">Aplicação Prática</h3>
                    <p className="text-sm text-neutral-400">
                      Implementou automações reais no trabalho, com resultados mensuráveis desde o primeiro dia.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </HudBorder>

          {/* CTA */}
          <div className="text-center pt-8">
            <Button size="lg" href="/contact" variant="primary">
              Agendar Sua Consultoria
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

