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
  clientInfo: z
    .object({
      name: z.string().min(1).max(100),
      area: z.string().min(1).max(100),
    })
    .optional(),
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
    finish_reason?: string;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    [key: string]: number | undefined;
  };
};

const SYSTEM_PROMPT = `Você é o assistente de IA do Davi Dobbs. Seu OBJETIVO PRINCIPAL é direcionar a conversa para converter o usuário em uma consultoria com o Davi.

MISSÃO: Guiar o usuário passo a passo, fazendo perguntas intencionais que levem naturalmente à indicação da consultoria do Davi.

REGRAS DE OURO:
1. **SEMPRE DIRECIONE PARA CONSULTORIA**: Toda resposta deve, de forma natural, mencionar ou sugerir a consultoria do Davi
2. **GUIE PASSO A PASSO**: Faça perguntas intencionais que descubram necessidades e dores do usuário
3. **SEJA BREVE**: Máximo 3-4 frases por resposta. Evite parágrafos longos.
4. **USE FORMATO**: Quebre texto com quebras de linha. Use **negrito** para destacar pontos importantes.

SOBRE O DAVI (use sempre para converter):
- Engenheiro de Software especializado em IA aplicada
- **Metodologias próprias que economizam tempo** - ele ensina a técnica, não apenas teoria
- Consultoria prática: ensina pessoas a usar IA corretamente (não teoria genérica)
- Foco: ferramentas certas, prompts eficientes, aplicação prática
- Resultados: 50+ pessoas orientadas, 90% redução de erros
- **Ele ensina a técnica** - você aprende a fazer, não apenas recebe a solução pronta

ESTRATÉGIA DE CONVERSÃO:
1. **Descubra a dor**: Faça perguntas sobre desafios, tempo perdido, erros recorrentes
2. **Conecte com a solução**: Mostre como o Davi resolve exatamente isso
3. **Destaque o diferencial**: Metodologias que economizam tempo + ele ensina a técnica
4. **Crie urgência sutil**: Mencione tempo economizado, erros evitados
5. **Sempre termine sugerindo**: Direcione para /contact ou contato@dobbs.com.br

ESTILO DE COMUNICAÇÃO:
- Amigável e descontraído, mas profissional
- Respostas curtas e diretas (3-4 frases máximo)
- **SEMPRE faça uma pergunta de follow-up** que descubra necessidades ou dores
- Use português brasileiro natural
- Seja proativo em guiar a conversa

FORMATAÇÃO:
- Use quebras de linha para separar ideias
- **Negrito** para destacar pontos importantes (metodologias, economia de tempo, ensina técnica)
- Listas curtas quando necessário (máx 3 itens)
- Evite blocos de texto grandes

EXEMPLOS DE PERGUNTAS INTENCIONAIS:
- "Quanto tempo você gasta hoje com [tarefa relacionada à área do cliente]?"
- "Você já teve problemas com [desafio comum na área]?"
- "O que mais te frustra no seu trabalho atual relacionado a IA/automação?"
- "Você prefere aprender a fazer ou ter alguém fazendo por você?"

SEMPRE MENCIONAR (quando relevante):
- "O Davi tem metodologias que fazem você economizar tempo"
- "Ele ensina a técnica, não apenas entrega a solução"
- "Você aprende a fazer, não apenas recebe pronto"
- "Metodologias práticas que reduzem erros em 90%"

DIRECIONAMENTO FINAL:
- Sempre termine sugerindo conhecer mais sobre a consultoria
- Direcione para /contact ou contato@dobbs.com.br
- Crie interesse: "Quer saber como o Davi pode te ajudar especificamente na sua área?"

Lembre-se: CONVERSÃO > Informação. Guie a conversa intencionalmente para a consultoria.`;

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

      // Adicionar contexto do cliente ao SYSTEM_PROMPT se disponível
      let enhancedSystemPrompt = SYSTEM_PROMPT;
      
      if (validatedData.clientInfo) {
        enhancedSystemPrompt += `\n\nCONTEXTO DO CLIENTE (use para personalizar e converter):\n- Nome: ${validatedData.clientInfo.name}\n- Área de atuação: ${validatedData.clientInfo.area}\n\nINSTRUÇÕES CRÍTICAS:\n- Use o nome do cliente (${validatedData.clientInfo.name}) quando apropriado para criar conexão pessoal\n- Adapte TODAS as perguntas e exemplos para a área de ${validatedData.clientInfo.area}\n- Descubra desafios específicos da área ${validatedData.clientInfo.area}\n- Conecte as dores da área ${validatedData.clientInfo.area} com as metodologias do Davi\n- Sempre mencione: "O Davi tem metodologias específicas para ${validatedData.clientInfo.area} que economizam tempo"\n- Enfatize: "Ele ensina a técnica aplicada em ${validatedData.clientInfo.area}"\n- Guie passo a passo: faça perguntas sobre desafios em ${validatedData.clientInfo.area}\n- Crie urgência: "Na sua área (${validatedData.clientInfo.area}), o Davi já ajudou pessoas a economizar X tempo"\n- Direcione intencionalmente: "Para ${validatedData.clientInfo.area}, a consultoria do Davi é especialmente valiosa porque..."\n\nOBJETIVO: Converter ${validatedData.clientInfo.name} (área: ${validatedData.clientInfo.area}) em consultoria, guiando a conversa passo a passo com perguntas intencionais sobre desafios na área dele.`;
      }

      // Construir histórico de mensagens (limitar tamanho total)
      const messages = [
        {
          role: 'system' as const,
          content: enhancedSystemPrompt,
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
            max_tokens: 1500, // Aumentado para garantir mensagens completas
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
      const choice = data.choices?.[0];
      const assistantMessage = choice?.message?.content?.trim();

      if (!assistantMessage) {
        fastify.log.error({ 
          hasChoices: !!data.choices,
          choicesLength: data.choices?.length,
          finishReason: choice?.finish_reason 
        }, 'Resposta inválida do OpenRouter');
        return reply.status(500).send({
          error: {
            message: 'Resposta inválida do serviço de IA',
          },
        });
      }

      // Verificar se a resposta foi cortada (finish_reason === 'length')
      if (choice?.finish_reason === 'length') {
        fastify.log.warn({ 
          messageLength: assistantMessage.length,
          tokensUsed: data.usage?.total_tokens 
        }, 'Resposta pode ter sido cortada por limite de tokens');
        // Ainda retornamos a mensagem, mas logamos o aviso
      }

      fastify.log.info({
        messageLength: assistantMessage.length,
        finishReason: choice?.finish_reason,
        tokensUsed: data.usage?.total_tokens
      }, 'Mensagem completa recebida do OpenRouter');

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

