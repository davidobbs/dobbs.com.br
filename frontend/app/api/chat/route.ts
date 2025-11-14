import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route para o chat assistant
 * Por enquanto retorna uma resposta mockada, mas pode ser integrada com um serviço de IA real
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: { message: 'Mensagem é obrigatória' } },
        { status: 400 }
      );
    }

    // Por enquanto, retornamos uma resposta mockada
    // Em produção, você pode integrar com OpenAI, Anthropic, ou outro serviço de IA
    const mockResponse = `Obrigado pela sua mensagem: "${message}". 

Atualmente, estou em desenvolvimento e em breve estarei totalmente funcional para ajudar com questões sobre:
- Engenharia de software
- Inteligência artificial aplicada
- Arquitetura de sistemas
- Desenvolvimento de software

Por enquanto, sinta-se à vontade para entrar em contato através do formulário de contato para uma consultoria personalizada!`;

    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      message: mockResponse,
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: { message: 'Erro ao processar mensagem. Por favor, tente novamente.' } },
      { status: 500 }
    );
  }
}

