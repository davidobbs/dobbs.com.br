import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export async function contactRoutes(fastify: FastifyInstance) {
  // POST /api/contact - Enviar mensagem de contato
  fastify.post<{
    Body: z.infer<typeof contactSchema>;
  }>('/api/contact', async (request, reply) => {
    try {
      const validatedData = contactSchema.parse(request.body);

      // Salvar no banco de dados
      const { prisma } = await import('../lib/prisma');
      const contact = await prisma.contact.create({
        data: validatedData,
      });

      fastify.log.info('Nova mensagem de contato salva:', contact.id);

      // TODO: Implementar envio de email (usar Resend, SendGrid, etc)

      return {
        success: true,
        message: 'Mensagem enviada com sucesso!',
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

      fastify.log.error(error);
      return reply.status(500).send({
        error: {
          message: 'Erro ao processar mensagem',
        },
      });
    }
  });
}

