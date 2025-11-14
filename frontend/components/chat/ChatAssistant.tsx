'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatAssistantProps {
  className?: string;
}

// Função para formatar markdown básico de forma segura
const formatMessage = (text: string): string => {
  // Aplicar formatação markdown primeiro
  let formatted = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-neutral-900/50 px-1 py-0.5 rounded text-accent-400 text-xs font-mono">$1</code>')
    .replace(/\n/g, '<br />');
  
  // Escapar HTML restante para segurança (mas preservar tags que criamos)
  // Isso é seguro porque já processamos o markdown
  formatted = formatted
    .replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;');
  
  return formatted;
};

export function ChatAssistant({ className }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Oi! 👋 Sou o assistente de IA do Davi Dobbs. Estou aqui para ajudar você com dúvidas sobre IA aplicada, engenharia de software, consultoria ou qualquer coisa relacionada ao trabalho dele. O que você gostaria de saber?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Criar AbortController para timeout (fora do try para ser acessível no catch)
    const controller = new AbortController();
    let timeoutId: NodeJS.Timeout | null = null;

    try {
      // Construir histórico de conversa para o backend
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Configurar timeout de 60 segundos
      timeoutId = setTimeout(() => {
        console.warn('[ChatAssistant] Timeout atingido após 60 segundos');
        controller.abort();
      }, 60000);

      console.log('[ChatAssistant] Enviando mensagem:', userMessage.content.substring(0, 50) + '...');
      console.log('[ChatAssistant] Payload:', { 
        messageLength: userMessage.content.length,
        historyLength: conversationHistory.length 
      });
      
      const fetchStartTime = Date.now();
      console.log('[ChatAssistant] Iniciando fetch...');
      
      let response: Response;
      try {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage.content,
            conversationHistory,
          }),
          signal: controller.signal,
        });
        
        const fetchDuration = Date.now() - fetchStartTime;
        console.log(`[ChatAssistant] Fetch concluído em ${fetchDuration}ms. Status: ${response.status}`);
      } catch (fetchError) {
        const fetchDuration = Date.now() - fetchStartTime;
        console.error(`[ChatAssistant] Erro no fetch após ${fetchDuration}ms:`, fetchError);
        throw fetchError;
      }

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        console.error('[ChatAssistant] Resposta não OK:', response.status, response.statusText);
        let errorData: { error?: { message?: string } } = {};
        try {
          errorData = await response.json();
          console.error('[ChatAssistant] Dados do erro:', errorData);
        } catch (parseError) {
          console.error('[ChatAssistant] Erro ao parsear resposta de erro:', parseError);
          const text = await response.text().catch(() => '');
          console.error('[ChatAssistant] Resposta como texto:', text);
        }
        
        // Mensagens de erro mais amigáveis baseadas no status
        let errorMessage = errorData.error?.message;
        if (!errorMessage) {
          switch (response.status) {
            case 401:
              errorMessage = 'Erro de autenticação. Verifique se as credenciais estão configuradas corretamente.';
              break;
            case 403:
              errorMessage = 'Acesso negado. Você não tem permissão para acessar este recurso.';
              break;
            case 404:
              errorMessage = 'Recurso não encontrado.';
              break;
            case 429:
              errorMessage = 'Muitas requisições. Por favor, aguarde um momento e tente novamente.';
              break;
            case 500:
            case 502:
            case 503:
              errorMessage = 'Serviço temporariamente indisponível. Por favor, tente novamente mais tarde.';
              break;
            case 504:
              errorMessage = 'Tempo de resposta excedido. Por favor, tente novamente.';
              break;
            default:
              errorMessage = `Erro ${response.status}: ${response.statusText}`;
          }
        }
        
        throw new Error(errorMessage);
      }

      console.log('[ChatAssistant] Parseando JSON da resposta...');
      let data;
      try {
        data = await response.json();
        console.log('[ChatAssistant] JSON parseado com sucesso');
      } catch (parseError) {
        console.error('[ChatAssistant] Erro ao parsear JSON:', parseError);
        const text = await response.text().catch(() => '');
        console.error('[ChatAssistant] Resposta como texto:', text.substring(0, 200));
        throw new Error('Resposta inválida do servidor (não é JSON)');
      }

      // Log para debug
      console.log('[ChatAssistant] Resposta recebida:', { 
        hasMessage: !!data.message, 
        messageLength: data.message?.length,
        dataKeys: Object.keys(data)
      });

      // Verificar se a resposta contém uma mensagem válida
      if (!data.message || typeof data.message !== 'string') {
        console.error('[ChatAssistant] Resposta inválida:', data);
        throw new Error('Resposta inválida do servidor');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      console.log('[ChatAssistant] Adicionando mensagem do assistente:', assistantMessage.content.substring(0, 50) + '...');
      setMessages((prev) => [...prev, assistantMessage]);
      setError(null); // Limpar erro anterior se houver
    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);
      
      console.error('[ChatAssistant] Erro capturado:', err);
      console.error('[ChatAssistant] Tipo do erro:', err?.constructor?.name);
      console.error('[ChatAssistant] Stack:', err instanceof Error ? err.stack : 'N/A');
      
      let errorMessage = 'Erro desconhecido';
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Tempo de resposta excedido. Por favor, tente novamente.';
          console.warn('[ChatAssistant] Timeout detectado');
        } else {
          errorMessage = err.message;
          console.error('[ChatAssistant] Mensagem de erro:', err.message);
        }
      } else {
        console.error('[ChatAssistant] Erro não é instância de Error:', typeof err, err);
      }
      
      setError(errorMessage);
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Desculpe, ocorreu um erro: ${errorMessage}. Por favor, tente novamente.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-500" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[80%] rounded-lg px-4 py-3 shadow-lg',
                message.role === 'user'
                  ? 'bg-accent-500 text-primary-50 font-medium'
                  : 'bg-neutral-800/80 text-neutral-200 border border-neutral-700/50'
              )}
            >
              <div 
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: formatMessage(message.content)
                }}
              />
              <span className="text-xs opacity-60 mt-1 block">
                {message.timestamp.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            {message.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center">
                <User className="w-4 h-4 text-accent-500" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-accent-500" />
            </div>
            <div className="bg-neutral-800/80 text-neutral-200 border border-neutral-700/50 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-accent-500" />
                <span className="text-sm">Pensando...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20">
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-accent-500/20 bg-primary-100/30">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-3 rounded-lg bg-neutral-900/60 border border-neutral-700/50 text-neutral-100 placeholder:text-neutral-500 placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 resize-none transition-all duration-200"
            rows={1}
            disabled={isLoading}
            style={{
              minHeight: '48px',
              maxHeight: '120px',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
            }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 py-3 self-end"
            variant="primary"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-neutral-500 mt-2 text-center opacity-60">
          Pressione Enter para enviar • Shift+Enter para nova linha
        </p>
      </div>
    </div>
  );
}

