'use client';

import { useState } from 'react';
import { Bot, X, Minimize2 } from 'lucide-react';
import { ChatAssistant } from './ChatAssistant';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const restoreChat = () => {
    setIsMinimized(false);
  };

  return (
    <>
      {/* Botão Flutuante */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent-500 hover:bg-accent-400 text-primary-50 shadow-2xl shadow-accent-500/50 hover:shadow-accent-500/70 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-accent-500/50 group"
          aria-label="Abrir assistente de IA"
        >
          <Bot className="w-6 h-6 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-primary-50 animate-pulse" />
        </button>
      )}

      {/* Modal do Chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[600px] md:h-[700px] transition-all duration-300">
          <div className="relative h-full flex flex-col bg-primary-100/50 backdrop-blur-sm rounded-xl border border-accent-500/20 shadow-2xl overflow-hidden">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-100 to-primary-50/50 border-b border-accent-500/20 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-500/20 border border-accent-500/30">
                  <Bot className="w-5 h-5 text-accent-500" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-neutral-100">Assistente de IA</h3>
                  <p className="text-xs text-neutral-400">Especializado em engenharia de software e IA aplicada</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isMinimized && (
                  <button
                    onClick={minimizeChat}
                    className="p-2 text-neutral-400 hover:text-accent-500 transition-colors rounded-lg hover:bg-neutral-800/50"
                    aria-label="Minimizar chat"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  className="p-2 text-neutral-400 hover:text-accent-500 transition-colors rounded-lg hover:bg-neutral-800/50"
                  aria-label="Fechar chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conteúdo do Chat */}
            {!isMinimized ? (
              <div className="flex-1 overflow-hidden">
                <ChatAssistant className="h-full" />
              </div>
            ) : (
              <button
                onClick={restoreChat}
                className="p-4 bg-gradient-to-r from-primary-100 to-primary-50/50 border-t border-accent-500/20 flex items-center justify-between hover:bg-primary-100/70 transition-colors flex-shrink-0"
                aria-label="Restaurar chat"
              >
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-accent-500" />
                  <span className="text-sm font-medium text-neutral-200">Assistente de IA</span>
                </div>
                <span className="text-xs text-neutral-400">Clique para expandir</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Overlay (opcional - para fechar ao clicar fora) */}
      {isOpen && !isMinimized && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={minimizeChat}
          aria-hidden="true"
        />
      )}
    </>
  );
}

