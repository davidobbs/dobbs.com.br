import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import rateLimit from '@fastify/rate-limit';
import { config } from '../config';

const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Mensagem não pode estar vazia')
    .max(2000, 'Mensagem muito longa (máximo 2000 caracteres)')
    .trim(),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string().max(2000, 'Mensagem do histórico muito longa').trim(),
      })
    )
    .max(20, 'Histórico de conversa muito longo (máximo 20 mensagens)')
    .optional()
    .default([]),
});

type ChatMessage = z.infer<typeof chatMessageSchema>;

type OpenRouterErrorResponse = {
  error?: {
    message?: string;
  };
};

type OpenRouterChatResponse = {
  choices?: Array<{
    message?: {
      role?: string;
      content?: string;
    };
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    [key: string]: number | undefined;
  };
};

const SYSTEM_PROMPT = `Você é o assistente de IA do Davi Dobbs. Seu objetivo é ter conversas breves, interativas e aprender com cada usuário para melhorar suas respostas.

REGRAS DE OURO:
1. **Seja BREVE**: Máximo 3-4 frases por resposta. Evite parágrafos longos.
2. **Foque na INTERAÇÃO**: Faça perguntas de follow-up para entender melhor o que o usuário precisa.
3. **APRENDA com o usuário**: Observe o tom, estilo e necessidades dele. Adapte suas respostas gradualmente.
4. **Use FORMATO**: Quebre texto com quebras de linha. Use **negrito** para destacar pontos importantes.

SOBRE O DAVI (resumo):
- Engenheiro de Software especializado em IA aplicada
- Consultoria prática: ensina pessoas a usar IA corretamente (não teoria genérica)
- Foco: ferramentas certas, prompts eficientes, aplicação prática
- Resultados: 50+ pessoas orientadas, 90% redução de erros
- Stack: LLMs, agentes, RAG, TypeScript/Python/Go, React/Next.js, AWS/GCP, Docker/K8s

ESTILO DE COMUNICAÇÃO:
- Amigável e descontraído, mas profissional
- Respostas curtas e diretas (3-4 frases máximo)
- Sempre faça uma pergunta de follow-up quando apropriado
- Use português brasileiro natural
- Aprenda o tom do usuário e adapte-se gradualmente

FORMATAÇÃO:
- Use quebras de linha para separar ideias
- **Negrito** para destacar pontos importantes
- Listas curtas quando necessário (máx 3 itens)
- Evite blocos de texto grandes

APRENDIZADO ADAPTATIVO:
- Observe se o usuário prefere respostas técnicas ou simples
- Note se ele quer detalhes ou apenas o essencial
- Adapte o tom: mais formal se ele for formal, mais casual se ele for casual
- Aprenda com perguntas anteriores para dar respostas mais assertivas

CONSULTORIA:
- Explique brevemente: orientação prática personalizada para usar IA corretamente
- Se perguntar sobre preços: direcione para /contact ou contato@dobbs.com.br
- Sugira /about para mais detalhes quando apropriado

TECNOLOGIA:
- Seja técnico mas acessível
- Dê exemplos práticos breves
- Se não souber, seja honesto e sugira onde encontrar

Lembre-se: INTERAÇÃO > Informação. Melhor uma conversa curta e útil do que um monólogo longo.`;

export async function chatRoutes(fastify: FastifyInstance) {
  // Rate limiting específico para chat (mais restritivo que o global de 100/min)
  // Aplicado apenas na rota /api/chat
  await fastify.register(rateLimit, {
    max: 20, // 20 requisições por minuto por IP (mais restritivo para chat)
    timeWindow: '1 minute',
    skipOnError: false,
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
    },
  });

  // POST /api/chat - Enviar mensagem para o assistente de IA
  fastify.post<{
    Body: ChatMessage;
  }>('/api/chat', async (request, reply) => {
    // Log de segurança (sem dados sensíveis)
    fastify.log.info(
      {
        ip: request.ip,
        userAgent: request.headers['user-agent'],
        requestId: request.id,
      },
      'Requisição de chat recebida'
    );
    try {
      // Validar dados de entrada
      const validatedData = chatMessageSchema.parse(request.body);

      // Verificar se a API key está configurada e válida
      if (!config.openRouter.apiKey || config.openRouter.apiKey.trim().length === 0) {
        fastify.log.error('OPENROUTER_API_KEY não configurada ou inválida');
        return reply.status(503).send({
          error: {
            message: 'Serviço de IA temporariamente indisponível. Tente novamente mais tarde.',
          },
        });
      }

      // Validar formato da API key (deve começar com sk-or-v1-)
      if (!config.openRouter.apiKey.startsWith('sk-or-v1-')) {
        fastify.log.error('OPENROUTER_API_KEY com formato inválido');
        return reply.status(503).send({
          error: {
            message: 'Serviço de IA temporariamente indisponível.',
          },
        });
      }

      // Sanitizar e validar histórico de conversa
      const sanitizedHistory = validatedData.conversationHistory
        .filter((msg) => msg.content && msg.content.trim().length > 0)
        .slice(-10); // Limitar a últimas 10 mensagens para evitar payload muito grande

      // Construir histórico de mensagens (limitar tamanho total)
      const messages = [
        {
          role: 'system' as const,
          content: SYSTEM_PROMPT,
        },
        ...sanitizedHistory,
        {
          role: 'user' as const,
          content: validatedData.message.trim(),
        },
      ];

      // Validar tamanho total do payload
      const totalChars = messages.reduce((acc, msg) => acc + msg.content.length, 0);
      if (totalChars > 10000) {
        fastify.log.warn({ totalChars }, 'Payload muito grande, truncando histórico');
        // Manter apenas system prompt e última mensagem se payload for muito grande
        messages.splice(1, messages.length - 2);
      }

      // Timeout para requisição OpenRouter (30 segundos)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      let response: Response;
      try {
        // Fazer requisição para OpenRouter
        response = await fetch(`${config.openRouter.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.openRouter.apiKey}`,
            'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
            'X-Title': 'Dobbs Blog - Assistente de IA',
          },
          body: JSON.stringify({
            model: config.openRouter.model,
            messages,
            temperature: 0.8,
            max_tokens: 500,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          fastify.log.warn('Timeout na requisição para OpenRouter');
          return reply.status(504).send({
            error: {
              message: 'Tempo de resposta excedido. Por favor, tente novamente.',
            },
          });
        }
        
        fastify.log.error({ fetchError }, 'Erro ao fazer requisição para OpenRouter');
        return reply.status(502).send({
          error: {
            message: 'Erro ao conectar com o serviço de IA. Tente novamente mais tarde.',
          },
        });
      }

      if (!response.ok) {
        let errorData: OpenRouterErrorResponse = {};
        try {
          errorData = (await response.json()) as OpenRouterErrorResponse;
        } catch (parseError) {
          fastify.log.warn({ parseError }, 'Falha ao interpretar resposta de erro do OpenRouter');
        }
        fastify.log.error({ errorData }, 'Erro na API do OpenRouter');

        return reply.status(response.status).send({
          error: {
            message: 'Erro ao processar mensagem com a IA',
            details: errorData.error?.message || 'Erro desconhecido',
          },
        });
      }

      const data = (await response.json()) as OpenRouterChatResponse;

      // Extrair resposta do assistente
      const assistantMessage = data.choices?.[0]?.message?.content;

      if (!assistantMessage) {
        fastify.log.error({ data }, 'Resposta inválida do OpenRouter');
        return reply.status(500).send({
          error: {
            message: 'Resposta inválida do serviço de IA',
          },
        });
      }

      // Log da interação (sem dados sensíveis)
      fastify.log.info(
        {
          requestId: request.id,
          ip: request.ip,
          messageLength: validatedData.message.length,
          responseLength: assistantMessage.length,
          model: config.openRouter.model,
          tokensUsed: data.usage?.total_tokens || 0,
        },
        'Mensagem processada com sucesso'
      );

      return {
        success: true,
        message: assistantMessage,
        usage: data.usage || null,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        fastify.log.warn(
          {
            requestId: request.id,
            ip: request.ip,
            errors: error.errors,
          },
          'Validação de dados falhou'
        );
        return reply.status(400).send({
          error: {
            message: 'Dados inválidos',
            details: error.errors,
          },
        });
      }

      fastify.log.error(
        {
          requestId: request.id,
          ip: request.ip,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        'Erro ao processar chat'
      );
      return reply.status(500).send({
        error: {
          message: 'Erro ao processar mensagem. Tente novamente mais tarde.',
        },
      });
    }
  });
}

