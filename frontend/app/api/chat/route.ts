import { NextRequest, NextResponse } from 'next/server';
import { createRequire } from 'module';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

// Carrega .env apenas em desenvolvimento local (no Render/Vercel as variáveis vêm do process.env automaticamente)
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  try {
    const require = createRequire(import.meta.url);
    const dotenv = require('dotenv');
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    // Tentar carregar .env da raiz do monorepo (apenas localmente)
    const rootEnvPath = resolve(__dirname, '../../../../.env');
    if (existsSync(rootEnvPath)) {
      dotenv.config({ path: rootEnvPath });
      console.log('[Chat API] Carregando .env local de:', rootEnvPath);
    }
  } catch {
    // Ignorar erros de carregamento de .env (no Render/Vercel não é necessário)
    console.log('[Chat API] Usando variáveis de ambiente do sistema (Render/Vercel/produção)');
  }
}

type RawHistoryMessage = {
  role?: string;
  content?: string;
};

type ConversationMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type ClientInfo = {
  name: string;
  area: string;
};

type ChatPayload = {
  message: string;
  conversationHistory: ConversationMessage[];
  clientInfo?: ClientInfo;
};

type ChatSuccess = {
  type: 'success';
  message: string;
  usage?: Record<string, number> | null;
};

type BackendError = {
  type: 'error';
  status: number;
  retryable: boolean;
  message: string;
};

type BackendResult = ChatSuccess | BackendError;

type OpenRouterResult = ChatSuccess | { type: 'error'; status: number; message: string };

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const JSON_HEADERS = {
  'Content-Type': 'application/json',
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

const FALLBACK_MESSAGE = (userMessage: string) => `Obrigado pela sua mensagem: "${userMessage}".

Atualmente, estou em desenvolvimento e em breve estarei totalmente funcional para ajudar com questões sobre:
- Engenharia de software
- Inteligência artificial aplicada
- Arquitetura de sistemas
- Desenvolvimento de software

Por enquanto, sinta-se à vontade para entrar em contato através do formulário de contato para uma consultoria personalizada!`;

export async function POST(request: NextRequest) {
  try {
    console.log('[Chat API] Requisição recebida');
    console.log('[Chat API] URL da requisição:', request.url);
    console.log('[Chat API] Headers da requisição:', Object.fromEntries(request.headers.entries()));
    const startTime = Date.now();
    
    let requestBody: { message?: string; conversationHistory?: RawHistoryMessage[]; clientInfo?: ClientInfo } | null = null;

    try {
      console.log('[Chat API] Parseando body da requisição...');
      requestBody = await request.json();
      console.log('[Chat API] Body parseado:', { 
        hasMessage: !!requestBody?.message,
        messageLength: requestBody?.message?.length,
        historyLength: requestBody?.conversationHistory?.length,
        hasClientInfo: !!requestBody?.clientInfo
      });
    } catch (error) {
      console.error('[Chat API] Erro ao parsear body:', error);
      return NextResponse.json({ error: { message: 'Corpo da requisição inválido' } }, { status: 400 });
    }

    const { message, conversationHistory, clientInfo } = requestBody || {};

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      console.error('[Chat API] Mensagem inválida ou vazia');
      return NextResponse.json({ error: { message: 'Mensagem é obrigatória' } }, { status: 400 });
    }
    
    console.log('[Chat API] Processando mensagem:', message.substring(0, 50) + '...');

    const sanitizedHistory = sanitizeHistory(conversationHistory);
    const trimmedMessage = message.trim();
    const payload: ChatPayload = {
      message: trimmedMessage,
      conversationHistory: sanitizedHistory,
      clientInfo: clientInfo,
    };

    const backendUrl = getBackendUrl();
    const canProxyToBackend = shouldProxyToBackend(backendUrl);
    const hasOpenRouterKey = !!process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim().length > 0;

    console.log('[Chat API] Backend URL:', backendUrl);
    console.log('[Chat API] Pode fazer proxy para backend:', canProxyToBackend);
    console.log('[Chat API] NODE_ENV:', process.env.NODE_ENV);
    console.log('[Chat API] OPENROUTER_API_KEY disponível?', hasOpenRouterKey);
    console.log('[Chat API] OPENROUTER_API_KEY tamanho:', process.env.OPENROUTER_API_KEY?.length || 0);

    // Se temos OPENROUTER_API_KEY válida, vamos direto para OpenRouter (mais rápido)
    // Só tentamos o backend se não tivermos a chave OpenRouter
    if (canProxyToBackend && !hasOpenRouterKey) {
      console.log('[Chat API] Tentando proxy para backend (timeout de 3s)...');
      try {
        // Criar um timeout curto para o backend (3 segundos)
        const backendResultPromise = proxyToBackend(payload, backendUrl);
        const backendResult = await Promise.race([
          backendResultPromise,
          new Promise<BackendResult>((resolve) => {
            setTimeout(() => {
              resolve({
                type: 'error',
                status: 504,
                retryable: true,
                message: 'Backend timeout',
              });
            }, 3000);
          }),
        ]);

        console.log('[Chat API] Resultado do backend:', backendResult.type);

        if (backendResult.type === 'success') {
          const duration = Date.now() - startTime;
          console.log(`[Chat API] Sucesso! Retornando resposta em ${duration}ms`);
          return NextResponse.json(
            {
              message: backendResult.message,
              usage: backendResult.usage ?? null,
            },
            { status: 200, headers: JSON_HEADERS }
          );
        }

        if (!backendResult.retryable && backendResult.status !== 504) {
          const duration = Date.now() - startTime;
          console.log(`[Chat API] Erro não retryable. Retornando erro em ${duration}ms`);
          return NextResponse.json({ error: { message: backendResult.message } }, { status: backendResult.status });
        }

        console.warn('[Chat API] Backend indisponível ou timeout, mas sem OPENROUTER_API_KEY para fallback');
      } catch (error) {
        console.warn('[Chat API] Erro ao tentar backend:', error);
      }
    } else if (hasOpenRouterKey) {
      console.log('[Chat API] OPENROUTER_API_KEY disponível, pulando backend e indo direto para OpenRouter');
    }

    console.log('[Chat API] Chamando OpenRouter diretamente...');
    const openRouterResult = await callOpenRouter(payload);
    console.log('[Chat API] Resultado do OpenRouter:', openRouterResult.type);

    if (openRouterResult.type === 'success') {
      const duration = Date.now() - startTime;
      console.log(`[Chat API] Sucesso com OpenRouter! Retornando resposta em ${duration}ms`);
      return NextResponse.json(
        {
          message: openRouterResult.message,
          usage: openRouterResult.usage ?? null,
        },
        { status: 200, headers: JSON_HEADERS }
      );
    }

    if (hasOpenRouterKey) {
      const duration = Date.now() - startTime;
      console.log(`[Chat API] Erro do OpenRouter. Retornando erro em ${duration}ms`);
      return NextResponse.json(
        { error: { message: openRouterResult.message } },
        { status: openRouterResult.status, headers: JSON_HEADERS }
      );
    }

    console.warn('[Chat API] Sem backend ou API key, retornando resposta mockada');
    const duration = Date.now() - startTime;
    console.log(`[Chat API] Retornando fallback em ${duration}ms`);
    return NextResponse.json(
      { message: FALLBACK_MESSAGE(trimmedMessage) },
      {
        status: 200,
        headers: JSON_HEADERS,
      }
    );
  } catch (error) {
    console.error('[Chat API] Erro não tratado na rota:', error);
    console.error('[Chat API] Stack do erro:', error instanceof Error ? error.stack : 'N/A');
    return NextResponse.json(
      { 
        error: { 
          message: error instanceof Error ? error.message : 'Erro interno do servidor' 
        } 
      },
      { status: 500, headers: JSON_HEADERS }
    );
  }
}

function sanitizeHistory(history?: RawHistoryMessage[]): ConversationMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((msg) => msg && typeof msg.content === 'string')
    .map((msg): ConversationMessage => {
      const role = msg.role === 'assistant' || msg.role === 'system' 
        ? (msg.role as 'assistant' | 'system')
        : 'user';
      return {
        role,
        content: (msg.content || '').trim(),
      };
    })
    .filter((msg) => msg.content.length > 0)
    .slice(-10);
}

function buildMessages(payload: ChatPayload) {
  // Adicionar contexto do cliente ao SYSTEM_PROMPT se disponível
  let enhancedSystemPrompt = SYSTEM_PROMPT;
  
  if (payload.clientInfo) {
    enhancedSystemPrompt += `\n\nCONTEXTO DO CLIENTE (use para personalizar e converter):\n- Nome: ${payload.clientInfo.name}\n- Área de atuação: ${payload.clientInfo.area}\n\nINSTRUÇÕES CRÍTICAS:\n- Use o nome do cliente (${payload.clientInfo.name}) quando apropriado para criar conexão pessoal\n- Adapte TODAS as perguntas e exemplos para a área de ${payload.clientInfo.area}\n- Descubra desafios específicos da área ${payload.clientInfo.area}\n- Conecte as dores da área ${payload.clientInfo.area} com as metodologias do Davi\n- Sempre mencione: "O Davi tem metodologias específicas para ${payload.clientInfo.area} que economizam tempo"\n- Enfatize: "Ele ensina a técnica aplicada em ${payload.clientInfo.area}"\n- Guie passo a passo: faça perguntas sobre desafios em ${payload.clientInfo.area}\n- Crie urgência: "Na sua área (${payload.clientInfo.area}), o Davi já ajudou pessoas a economizar X tempo"\n- Direcione intencionalmente: "Para ${payload.clientInfo.area}, a consultoria do Davi é especialmente valiosa porque..."\n\nOBJETIVO: Converter ${payload.clientInfo.name} (área: ${payload.clientInfo.area}) em consultoria, guiando a conversa passo a passo com perguntas intencionais sobre desafios na área dele.`;
  }

  const messages: ConversationMessage[] = [
    {
      role: 'system',
      content: enhancedSystemPrompt,
    },
    ...payload.conversationHistory,
    {
      role: 'user',
      content: payload.message,
    },
  ];

  const totalChars = messages.reduce((acc, msg) => acc + msg.content.length, 0);

  if (totalChars > 10000) {
    return [messages[0], messages[messages.length - 1]];
  }

  return messages;
}

function getBackendUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  return rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
}

function shouldProxyToBackend(backendUrl: string) {
  if (!backendUrl) {
    return false;
  }

  const normalized = backendUrl.toLowerCase();
  const isLocalhost =
    normalized.includes('localhost') || normalized.includes('127.0.0.1') || normalized.includes('0.0.0.0');

  if (process.env.NODE_ENV === 'production' && isLocalhost) {
    return false;
  }

  return true;
}

async function proxyToBackend(payload: ChatPayload, backendUrl: string): Promise<BackendResult> {
  const backendChatUrl = `${backendUrl}/api/chat`;
  console.log('[Chat API] Fazendo proxy para backend:', backendChatUrl);
  console.log('[Chat API] Payload sendo enviado:', { 
    messageLength: payload.message.length, 
    historyLength: payload.conversationHistory.length,
    hasClientInfo: !!payload.clientInfo
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 segundos de timeout

  try {
    const response = await fetch(backendChatUrl, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log('[Chat API] Status da resposta do backend:', response.status);
    console.log('[Chat API] Headers da resposta:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      let errorData: { error?: { message?: string } } = {};
      try {
        const text = await response.text();
        console.log('[Chat API] Resposta de erro (texto):', text.substring(0, 500));
        errorData = JSON.parse(text);
      } catch (parseError) {
        console.error('[Chat API] Erro ao parsear resposta de erro:', parseError);
        errorData = {};
      }
      
      const message =
        errorData?.error?.message ||
        (response.status === 401 
          ? 'Erro de autenticação no backend. Verifique se o backend está configurado corretamente.'
          : response.status >= 500 
          ? 'Serviço de IA indisponível no momento.' 
          : 'Erro ao processar mensagem.');

      console.error('[Chat API] Erro do backend:', { status: response.status, message });

      return {
        type: 'error',
        status: response.status,
        retryable: response.status >= 500 || response.status === 401,
        message,
      };
    }

    const data = await response.json();
    const aiMessage = data.message || data.error?.message;

    if (!aiMessage) {
      return { type: 'error', status: 502, retryable: true, message: 'Resposta inválida do backend.' };
    }

    return {
      type: 'success',
      message: aiMessage,
      usage: data.usage || null,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('[Chat API] Timeout ao chamar backend após 60 segundos');
      return {
        type: 'error',
        status: 504,
        retryable: true,
        message: 'Tempo de resposta excedido. Tente novamente.',
      };
    }
    
    console.error('[Chat API] Erro ao chamar backend:', error);
    console.error('[Chat API] Tipo do erro:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('[Chat API] Mensagem do erro:', error instanceof Error ? error.message : String(error));
    
    return {
      type: 'error',
      status: 503,
      retryable: true,
      message: 'Backend indisponível.',
    };
  }
}

async function callOpenRouter(payload: ChatPayload): Promise<OpenRouterResult> {
  // No Render/Vercel, as variáveis vêm diretamente do process.env (configuradas no painel)
  // Em desenvolvimento local, tentar carregar do .env se necessário
  let apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey && process.env.NODE_ENV !== 'production') {
    // Apenas em desenvolvimento local, tentar carregar do .env
    try {
      const { createRequire } = await import('module');
      const require = createRequire(import.meta.url);
      const dotenv = require('dotenv');
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const rootEnvPath = resolve(__dirname, '../../../../.env');
      dotenv.config({ path: rootEnvPath });
      apiKey = process.env.OPENROUTER_API_KEY;
      console.log('[Chat API] Recarregando .env local');
    } catch {
      // Ignorar erros - no Render/Vercel não precisa carregar .env
      console.log('[Chat API] Usando variáveis do sistema');
    }
  }

  console.log('[Chat API] Verificando OPENROUTER_API_KEY:', apiKey ? 'Configurada (tamanho: ' + apiKey.length + ')' : 'NÃO CONFIGURADA');
  console.log('[Chat API] OPENROUTER_API_KEY existe?', !!apiKey);
  console.log('[Chat API] OPENROUTER_API_KEY valor (primeiros 10 chars):', apiKey ? apiKey.substring(0, 10) + '...' : 'vazia');
  console.log('[Chat API] OPENROUTER_MODEL:', process.env.OPENROUTER_MODEL);
  console.log('[Chat API] NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);

  if (!apiKey || apiKey.trim().length === 0) {
    console.warn('[Chat API] OPENROUTER_API_KEY não configurada ou vazia');
    return {
      type: 'error',
      status: 503,
      message: 'OPENROUTER_API_KEY não configurada. Configure a variável no .env da raiz do projeto.',
    };
  }

  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const messages = buildMessages(payload);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        ...JSON_HEADERS,
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': siteUrl,
        'X-Title': 'Dobbs Blog - Assistente de IA',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.8,
        max_tokens: 1500, // Aumentado para garantir mensagens completas
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData?.error?.message || 'Erro ao processar mensagem com a IA.';
      return { type: 'error', status: response.status, message };
    }

    const data = await response.json();
    const choice = data.choices?.[0];
    const assistantMessage = choice?.message?.content?.trim();

    if (!assistantMessage) {
      console.error('[Chat API] Resposta vazia ou inválida do OpenRouter:', { 
        hasChoices: !!data.choices,
        choicesLength: data.choices?.length,
        finishReason: choice?.finish_reason 
      });
      return { type: 'error', status: 502, message: 'Resposta inválida do serviço de IA.' };
    }

    // Verificar se a resposta foi cortada (finish_reason === 'length')
    if (choice?.finish_reason === 'length') {
      console.warn('[Chat API] Resposta pode ter sido cortada por limite de tokens. Mensagem recebida tem', assistantMessage.length, 'caracteres');
      // Ainda retornamos a mensagem, mas logamos o aviso
    }

    console.log('[Chat API] Mensagem completa recebida:', { 
      messageLength: assistantMessage.length,
      finishReason: choice?.finish_reason,
      tokensUsed: data.usage?.total_tokens 
    });

    return {
      type: 'success',
      message: assistantMessage,
      usage: data.usage || null,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      return { type: 'error', status: 504, message: 'Tempo de resposta excedido. Por favor, tente novamente.' };
    }

    console.error('[Chat API] Erro ao chamar OpenRouter:', error);
    return { type: 'error', status: 502, message: 'Erro ao conectar com o serviço de IA.' };
  }
}

