import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { HudBorder, HudGrid } from '../ui/HudEffects';
import { Sparkles, ArrowRight, Zap, Target, BarChart } from 'lucide-react';

export function CTA() {
  return (
    <Section className="relative bg-primary-50">
      <HudGrid density="sparse" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/30 text-accent-500 px-4 py-2 rounded-full text-xs font-medium mb-6 backdrop-blur-sm">
          <Sparkles size={14} />
          <span className="uppercase tracking-wider">Pronto para Começar?</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-100 mb-4 tracking-tight">
          Pronto para aprender a usar{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
            IA corretamente
          </span>
          ?
        </h2>
        <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Agende uma consultoria e aprenda como usar IA de forma assertiva e eficiente. 
          Sem teoria genérica — apenas orientação prática para o seu caso específico.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <HudBorder variant="glow" intensity="medium" className="inline-block">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className="border-0"
            >
              Agendar Consultoria
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </HudBorder>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-neutral-800/50">
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-500/10 rounded-lg border border-accent-500/30 mb-3">
              <Zap className="text-accent-400" size={24} />
            </div>
            <h3 className="font-display font-semibold mb-2 text-neutral-100">Resposta Rápida</h3>
            <p className="text-neutral-400 text-sm">
              Retorno em até 24 horas
            </p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-500/10 rounded-lg border border-accent-500/30 mb-3">
              <Target className="text-accent-400" size={24} />
            </div>
            <h3 className="font-display font-semibold mb-2 text-neutral-100">Foco em Aplicação</h3>
            <p className="text-neutral-400 text-sm">
              Orientação prática, não apenas teoria
            </p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-500/10 rounded-lg border border-accent-500/30 mb-3">
              <BarChart className="text-accent-400" size={24} />
            </div>
            <h3 className="font-display font-semibold mb-2 text-neutral-100">Resultados Mensuráveis</h3>
            <p className="text-neutral-400 text-sm">
              Métricas claras e roadmap definido
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

