import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { config } from '../config';

const chatMessageSchema = z.object({
  message: z.string().min(1, 'Mensagem não pode estar vazia').max(5000, 'Mensagem muito longa'),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
      })
    )
    .optional()
    .default([]),
});

type ChatMessage = z.infer<typeof chatMessageSchema>;

const SYSTEM_PROMPT = `Você é um assistente de IA especializado em ajudar usuários com questões sobre engenharia de software, inteligência artificial aplicada, arquitetura de sistemas e desenvolvimento de software.

Você é profissional, técnico e direto ao ponto. Sempre forneça respostas úteis e práticas, com exemplos de código quando relevante.

Seja conciso mas completo. Use português brasileiro.`;

export async function chatRoutes(fastify: FastifyInstance) {
  // POST /api/chat - Enviar mensagem para o assistente de IA
  fastify.post<{
    Body: ChatMessage;
  }>('/api/chat', async (request, reply) => {
    try {
      // Validar dados de entrada
      const validatedData = chatMessageSchema.parse(request.body);

      // Verificar se a API key está configurada
      if (!config.openRouter.apiKey) {
        fastify.log.error('OPENROUTER_API_KEY não configurada');
        return reply.status(500).send({
          error: {
            message: 'Serviço de IA não configurado. Entre em contato com o administrador.',
          },
        });
      }

      // Construir histórico de mensagens
      const messages = [
        {
          role: 'system' as const,
          content: SYSTEM_PROMPT,
        },
        ...validatedData.conversationHistory,
        {
          role: 'user' as const,
          content: validatedData.message,
        },
      ];

      // Fazer requisição para OpenRouter
      const response = await fetch(`${config.openRouter.baseUrl}/chat/completions`, {
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
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        fastify.log.error('Erro na API do OpenRouter:', errorData);
        
        return reply.status(response.status).send({
          error: {
            message: 'Erro ao processar mensagem com a IA',
            details: errorData.error?.message || 'Erro desconhecido',
          },
        });
      }

      const data = await response.json();

      // Extrair resposta do assistente
      const assistantMessage = data.choices?.[0]?.message?.content;

      if (!assistantMessage) {
        fastify.log.error('Resposta inválida do OpenRouter:', data);
        return reply.status(500).send({
          error: {
            message: 'Resposta inválida do serviço de IA',
          },
        });
      }

      // Log da interação (sem dados sensíveis)
      fastify.log.info('Mensagem processada com sucesso', {
        messageLength: validatedData.message.length,
        responseLength: assistantMessage.length,
        model: config.openRouter.model,
      });

      return {
        success: true,
        message: assistantMessage,
        usage: data.usage || null,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          error: {
            message: 'Dados inválidos',
            details: error.errors,
          },
        });
      }

      fastify.log.error('Erro ao processar chat:', error);
      return reply.status(500).send({
        error: {
          message: 'Erro ao processar mensagem',
        },
      });
    }
  });
}

