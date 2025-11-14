import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function blogRoutes(fastify: FastifyInstance) {
  // GET /api/blog - Lista todos os posts
  fastify.get('/api/blog', async (request, reply) => {
    try {
      const { featured, limit = '10', offset = '0' } = request.query as {
        featured?: string;
        limit?: string;
        offset?: string;
      };

      const where = featured === 'true' ? { featured: true } : {};
      const take = parseInt(limit, 10);
      const skip = parseInt(offset, 10);

      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where,
          take,
          skip,
          orderBy: { publishedAt: 'desc' },
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            publishedAt: true,
            readTime: true,
            tags: true,
            featured: true,
            views: true,
          },
        }),
        prisma.post.count({ where }),
      ]);

      return {
        posts,
        total,
        limit: take,
        offset: skip,
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: {
          message: 'Erro ao buscar posts',
        },
      });
    }
  });

  // GET /api/blog/:slug - Busca post específico
  fastify.get<{ Params: { slug: string } }>('/api/blog/:slug', async (request, reply) => {
    try {
      const { slug } = request.params;

      const post = await prisma.post.findUnique({
        where: { slug },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!post) {
        return reply.status(404).send({
          error: {
            message: 'Post não encontrado',
          },
        });
      }

      // Incrementar views
      await prisma.post.update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
      });

      return {
        post: {
          ...post,
          views: post.views + 1,
        },
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: {
          message: 'Erro ao buscar post',
        },
      });
    }
  });
}

