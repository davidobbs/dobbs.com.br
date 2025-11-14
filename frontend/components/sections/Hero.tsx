import { Button } from '../ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50" />
      
      {/* HUD Lines Effect */}
      <div className="absolute inset-0 bg-grid-pattern-dense bg-grid-dense opacity-30" />
      
      {/* Accent Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent-500/10 border border-accent-500/30 text-accent-500 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in backdrop-blur-sm">
            <Sparkles size={16} className="text-accent-500" />
            <span className="font-display">Consultor Especializado em IA Aplicada</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-neutral-100 mb-6 leading-tight tracking-tight">
            Aplicando{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
              IA de forma
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
              assertiva e eficiente
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Consultoria para pessoas que querem usar IA de verdade, mas não sabem por onde começar. 
            Não apenas tecnologia, mas <strong className="text-neutral-300">como aplicar</strong> de forma 
            assertiva e eficiente no seu dia a dia ou negócio.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="primary" size="lg" href="/contact">
              Agendar Consultoria
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button variant="outline" size="lg" href="/about">
              Como Funciona
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-neutral-800">
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-500 mb-2">
                5+
              </div>
              <div className="text-sm text-neutral-400">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-500 mb-2">
                50+
              </div>
              <div className="text-sm text-neutral-400">Pessoas Orientadas</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-500 mb-2">
                100%
              </div>
              <div className="text-sm text-neutral-400">Foco em Aplicação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent-500/30 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-accent-500 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}

