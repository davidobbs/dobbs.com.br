import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

const posts = {
  'agents-in-production': {
    title: 'Como Implementar Agentes de IA em Produção',
    date: '2024-03-15',
    readTime: '12 min',
    tags: ['IA', 'Arquitetura', 'Produção'],
    content: `
# Como Implementar Agentes de IA em Produção

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

Implementar agentes de IA em produção requer planejamento cuidadoso e arquitetura robusta. O investimento em infraestrutura adequada paga dividendos em confiabilidade e escalabilidade.
    `,
  },
  'cost-reduction-automation': {
    title: 'Reduzindo Custos com Automação Inteligente',
    date: '2024-03-10',
    readTime: '8 min',
    tags: ['Automação', 'Negócios', 'IA'],
    content: `
# Reduzindo Custos com Automação Inteligente

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

A automação inteligente não é apenas sobre tecnologia, mas sobre criar valor real para o negócio.
    `,
  },
  'ai-architecture': {
    title: 'Arquitetura de Software para Sistemas com IA',
    date: '2024-03-05',
    readTime: '15 min',
    tags: ['Arquitetura', 'IA', 'Engenharia'],
    content: `
# Arquitetura de Software para Sistemas com IA

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

A arquitetura de sistemas com IA deve balancear performance, custo e manutenibilidade.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({
    slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <Button variant="ghost" size="sm" href="/blog" className="mb-8 text-white hover:bg-white/10">
            <ArrowLeft className="mr-2" size={16} />
            Voltar ao Blog
          </Button>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center space-x-6 text-primary-100">
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={18} />
                <span>{post.readTime} de leitura</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" className="p-8 md:p-12">
            <article className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap">{post.content}</div>
            </article>
          </Card>
        </div>
      </Section>
    </>
  );
}

