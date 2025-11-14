import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HudBorder, HudCorner, HudGrid } from '@/components/ui/HudEffects';
import { ArrowLeft, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Consultoria: IA para Negócio Próprio',
  description:
    'Case de consultoria: empreendedor que não sabia como aplicar IA no negócio aprendeu a usar chatbots e aumentou conversão em 35%.',
};

export default function ChatbotPage() {
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
              IA para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
                Negócio Próprio
              </span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Empreendedor que não sabia como aplicar IA no negócio aprendeu a usar chatbots e aumentou conversão em 35%. 
              Aprendeu estratégia, ferramentas e métricas.
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
                  <div className="hud-data text-4xl font-display font-bold text-accent-500 mb-2">35%</div>
                  <div className="text-sm text-neutral-400">Aumento na conversão</div>
                </div>
                <div>
                  <div className="hud-data text-4xl font-display font-bold text-accent-500 mb-2">&lt;2s</div>
                  <div className="text-sm text-neutral-400">Tempo de resposta</div>
                </div>
                <div>
                  <div className="hud-data text-4xl font-display font-bold text-accent-500 mb-2">4.8/5</div>
                  <div className="text-sm text-neutral-400">Satisfação</div>
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
                O empreendedor tinha um e-commerce mas não sabia como usar IA para melhorar o atendimento e aumentar vendas. 
                Sabia que chatbots poderiam ajudar, mas não tinha conhecimento sobre:
              </p>
              <ul className="mt-4 space-y-2 text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-accent-500 mt-1" size={18} />
                  <span>Qual plataforma de chatbot escolher</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-accent-500 mt-1" size={18} />
                  <span>Como configurar o chatbot para conversão</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-accent-500 mt-1" size={18} />
                  <span>Como medir o impacto no negócio</span>
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
                Através da consultoria, o empreendedor aprendeu:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="text-accent-400" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 mb-1">Estratégia de Chatbot</h3>
                    <p className="text-sm text-neutral-400">
                      Aprendeu a definir objetivos claros e criar fluxos de conversa que convertem visitantes em clientes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-accent-400" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 mb-1">Ferramentas e Integração</h3>
                    <p className="text-sm text-neutral-400">
                      Aprendeu a escolher e integrar a ferramenta certa com o e-commerce existente.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-accent-400" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 mb-1">Métricas e Acompanhamento</h3>
                    <p className="text-sm text-neutral-400">
                      Aprendeu a medir conversão, satisfação e ROI do chatbot no negócio.
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

