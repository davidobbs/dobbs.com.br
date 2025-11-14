import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { config } from './config';
import { logger } from './utils/logger';
import { healthRoutes } from './routes/health';
import { blogRoutes } from './routes/blog';
import { projectsRoutes } from './routes/projects';
import { contactRoutes } from './routes/contact';
import { chatRoutes } from './routes/chat';

const fastify = Fastify({
  logger: logger,
  requestIdLogLabel: 'reqId',
  genReqId: () => crypto.randomUUID(),
});

// Função para configurar plugins e rotas
async function setupFastify() {
  // Plugins de segurança e CORS
  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  });

  await fastify.register(cors, {
    origin: config.corsOrigins,
    credentials: true,
  });

  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // Rotas
  await fastify.register(healthRoutes);
  await fastify.register(blogRoutes);
  await fastify.register(projectsRoutes);
  await fastify.register(contactRoutes);
  await fastify.register(chatRoutes);
}

// Error handler global
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(error.statusCode || 500).send({
    error: {
      message: error.message || 'Internal Server Error',
      statusCode: error.statusCode || 500,
      requestId: request.id,
    },
  });
});

// Iniciar servidor
async function start() {
  try {
    // Configurar plugins e rotas
    await setupFastify();

    // Iniciar servidor
    await fastify.listen({ port: config.port, host: config.host });
    logger.info(`🚀 Backend rodando em http://${config.host}:${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();

