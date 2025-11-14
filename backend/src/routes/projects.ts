import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function projectsRoutes(fastify: FastifyInstance) {
  // GET /api/projects - Lista todos os projetos
  fastify.get('/api/projects', async (request, reply) => {
    try {
      const { featured, limit = '10', offset = '0' } = request.query as {
        featured?: string;
        limit?: string;
        offset?: string;
      };

      const where = featured === 'true' ? { featured: true } : {};
      const take = parseInt(limit, 10);
      const skip = parseInt(offset, 10);

      const [projects, total] = await Promise.all([
        prisma.project.findMany({
          where,
          take,
          skip,
          orderBy: { publishedAt: 'desc' },
        }),
        prisma.project.count({ where }),
      ]);

      return {
        projects,
        total,
        limit: take,
        offset: skip,
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: {
          message: 'Erro ao buscar projetos',
        },
      });
    }
  });

  // GET /api/projects/:slug - Busca projeto específico
  fastify.get<{ Params: { slug: string } }>('/api/projects/:slug', async (request, reply) => {
    try {
      const { slug } = request.params;

      const project = await prisma.project.findUnique({
        where: { slug },
      });

      if (!project) {
        return reply.status(404).send({
          error: {
            message: 'Projeto não encontrado',
          },
        });
      }

      return {
        project,
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: {
          message: 'Erro ao buscar projeto',
        },
      });
    }
  });
}

