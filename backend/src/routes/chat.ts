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
          temperature: 0.8,
          max_tokens: 500,
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

