import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Mail, MessageSquare, ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <Section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Pronto para aprender a usar IA corretamente?
        </h2>
        <p className="text-xl md:text-2xl text-primary-100 mb-10 max-w-2xl mx-auto">
          Agende uma consultoria e aprenda como usar IA de forma assertiva e eficiente. 
          Sem teoria genérica — apenas orientação prática para o seu caso específico.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-primary-600 hover:bg-neutral-100"
            href="/contact"
          >
            <Mail className="mr-2" size={20} />
            Agendar Consultoria
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white/10"
            href="/contact"
          >
            <MessageSquare className="mr-2" size={20} />
            Falar Agora
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-primary-500/30">
          <div>
            <div className="text-3xl font-bold mb-2">⚡</div>
            <h3 className="font-semibold mb-2">Resposta Rápida</h3>
            <p className="text-primary-100 text-sm">
              Retorno em até 24 horas
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">🎯</div>
            <h3 className="font-semibold mb-2">Foco em Aplicação</h3>
            <p className="text-primary-100 text-sm">
              Orientação prática, não apenas teoria
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">📊</div>
            <h3 className="font-semibold mb-2">Resultados Mensuráveis</h3>
            <p className="text-primary-100 text-sm">
              Métricas claras e roadmap definido
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

