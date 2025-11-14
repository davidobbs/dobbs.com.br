import { ChatAssistant } from '@/components/chat/ChatAssistant';
import { Section } from '@/components/ui/Section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assistente de IA',
  description: 'Converse com o assistente de IA especializado em engenharia de software e IA aplicada',
};

export default function ChatPage() {
  return (
    <Section className="min-h-[calc(100vh-8rem)] py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
              Assistente de IA
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Converse comigo sobre engenharia de software, inteligência artificial aplicada,
              arquitetura de sistemas e desenvolvimento. Estou aqui para ajudar!
            </p>
          </div>
          <div className="h-[600px] md:h-[700px]">
            <ChatAssistant />
          </div>
        </div>
      </div>
    </Section>
  );
}

