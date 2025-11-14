import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário padrão
  const user = await prisma.user.upsert({
    where: { email: 'davi@dobbs.com.br' },
    update: {},
    create: {
      email: 'davi@dobbs.com.br',
      name: 'Davi Dobbs',
      role: 'admin',
    },
  });

  console.log('✅ Usuário criado:', user.email);

  // Criar posts de exemplo
  const posts = [
    {
      title: 'Como Implementar Agentes de IA em Produção',
      slug: 'agents-in-production',
      excerpt:
        'Guia completo sobre arquitetura, monitoramento e boas práticas para colocar agentes de IA em produção com segurança e escalabilidade.',
      content: `# Como Implementar Agentes de IA em Produção

Implementar agentes de IA em produção é um desafio que vai além de simplesmente fazer o modelo funcionar. Requer arquitetura sólida, monitoramento robusto e estratégias de fallback.

## Arquitetura Recomendada

A arquitetura de um sistema com agentes de IA deve considerar:

1. **Isolamento**: Cada agente deve rodar em um container isolado
2. **Queue System**: Use filas para gerenciar requisições assíncronas
3. **Circuit Breaker**: Implemente circuit breakers para proteger contra falhas em cascata
4. **Rate Limiting**: Controle a taxa de requisições para evitar custos excessivos

## Monitoramento e Observabilidade

É essencial monitorar:

- Latência de resposta
- Taxa de erro
- Custos por requisição
- Qualidade das respostas (usando métricas customizadas)

## Conclusão

Implementar agentes de IA em produção requer planejamento cuidadoso e arquitetura robusta. O investimento em infraestrutura adequada paga dividendos em confiabilidade e escalabilidade.`,
      readTime: 12,
      featured: true,
      tags: ['IA', 'Arquitetura', 'Produção'],
      publishedAt: new Date('2024-03-15'),
      authorId: user.id,
    },
    {
      title: 'Reduzindo Custos com Automação Inteligente',
      slug: 'cost-reduction-automation',
      excerpt:
        'Estudo de caso real: como reduzimos 60% dos custos operacionais de uma empresa usando LLMs e automação de processos.',
      content: `# Reduzindo Custos com Automação Inteligente

Neste estudo de caso, mostramos como reduzimos 60% dos custos operacionais de uma empresa usando LLMs e automação de processos.

## O Problema

A empresa processava manualmente milhares de documentos por mês, gerando custos altos com mão de obra e erros frequentes.

## A Solução

Implementamos um sistema de processamento inteligente usando:

- LLMs para extração de informações
- Validação automática de dados
- Integração com sistemas existentes

## Resultados

- **60% de redução** nos custos operacionais
- **95% de precisão** na extração de dados
- **80% mais rápido** que o processo manual

## Conclusão

A automação inteligente não é apenas sobre tecnologia, mas sobre criar valor real para o negócio.`,
      readTime: 8,
      featured: true,
      tags: ['Automação', 'Negócios', 'IA'],
      publishedAt: new Date('2024-03-10'),
      authorId: user.id,
    },
    {
      title: 'Arquitetura de Software para Sistemas com IA',
      slug: 'ai-architecture',
      excerpt:
        'Padrões arquiteturais, decisões de design e trade-offs ao construir sistemas que integram modelos de IA de forma escalável.',
      content: `# Arquitetura de Software para Sistemas com IA

Construir sistemas que integram IA requer decisões arquiteturais cuidadosas. Neste artigo, exploramos padrões e trade-offs.

## Padrões Arquiteturais

### 1. API Gateway Pattern
Centralize o acesso a múltiplos modelos de IA através de um gateway único.

### 2. Adapter Pattern
Use adapters para abstrair diferentes provedores de IA (OpenAI, Anthropic, etc).

### 3. Strategy Pattern
Permita trocar estratégias de IA sem modificar o código cliente.

## Trade-offs Importantes

- **Latência vs Custo**: Modelos mais rápidos são mais caros
- **Precisão vs Velocidade**: Modelos maiores são mais precisos mas mais lentos
- **On-premise vs Cloud**: Controle vs Escalabilidade

## Conclusão

A arquitetura de sistemas com IA deve balancear performance, custo e manutenibilidade.`,
      readTime: 15,
      featured: true,
      tags: ['Arquitetura', 'IA', 'Engenharia'],
      publishedAt: new Date('2024-03-05'),
      authorId: user.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log(`✅ ${posts.length} posts criados`);

  // Criar projetos de exemplo
  const projects = [
    {
      title: 'Sistema de Automação com IA',
      slug: 'automation-system',
      description:
        'Plataforma que reduz 80% do tempo de processamento de documentos através de LLMs e processamento inteligente.',
      tags: ['IA', 'Automação', 'LLMs', 'Python'],
      impact: 'Redução de 80% no tempo de processamento',
      metrics: {
        timeReduction: '80%',
        accuracy: '95%',
        costReduction: '60%',
      },
      featured: true,
      publishedAt: new Date('2024-03-01'),
    },
    {
      title: 'Agente Conversacional para E-commerce',
      slug: 'chatbot',
      description:
        'Chatbot inteligente que aumenta conversão em 35% através de recomendações personalizadas e atendimento 24/7.',
      tags: ['IA', 'E-commerce', 'Chatbot', 'Node.js'],
      impact: 'Aumento de 35% na conversão',
      metrics: {
        conversionIncrease: '35%',
        responseTime: '<2s',
        satisfaction: '4.8/5',
      },
      featured: true,
      publishedAt: new Date('2024-02-15'),
    },
    {
      title: 'Arquitetura de Microserviços Escalável',
      slug: 'microservices',
      description:
        'Sistema distribuído que suporta milhões de requisições com alta disponibilidade e baixa latência.',
      tags: ['Arquitetura', 'Microserviços', 'Kubernetes', 'Go'],
      impact: '99.9% de uptime, <100ms latência',
      metrics: {
        uptime: '99.9%',
        latency: '<100ms',
        throughput: '10k req/s',
      },
      featured: true,
      publishedAt: new Date('2024-02-01'),
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log(`✅ ${projects.length} projetos criados`);

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

