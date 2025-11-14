import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validação básica
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: { message: 'Nome, email e mensagem são obrigatórios' } },
        { status: 400 }
      );
    }

    // Se houver API_URL configurada, tenta enviar para o backend
    if (API_URL) {
      try {
        const response = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
          return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
      } catch (fetchError) {
        console.error('Error calling external API:', fetchError);
        // Continua para o fallback mockado
      }
    }

    // Fallback: retorna sucesso (em produção, você pode integrar com email service, etc)
    // Por enquanto, apenas loga e retorna sucesso
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      company: body.company,
      subject: body.subject,
      message: body.message,
    });

    return NextResponse.json({
      success: true,
      message: 'Mensagem recebida com sucesso! Entraremos em contato em breve.',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: { message: 'Erro ao enviar mensagem. Por favor, tente novamente.' } },
      { status: 500 }
    );
  }
}

