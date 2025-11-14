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
  'llms-production': {
    title: 'Quando Usar IA e Quando Não Usar',
    date: '2024-02-28',
    readTime: '10 min',
    tags: ['Estratégia', 'IA', 'Decisão'],
    content: `
# Quando Usar IA e Quando Não Usar

Nem tudo precisa de IA. Aprenda a identificar quando IA realmente ajuda e quando é melhor fazer manualmente.

## Quando Usar IA

### 1. Tarefas Repetitivas e Padronizadas
IA é excelente para tarefas que seguem padrões claros e são repetidas frequentemente.

### 2. Processamento de Grandes Volumes de Dados
Quando você precisa processar muitos dados rapidamente, IA pode ser uma solução eficiente.

### 3. Análise e Extração de Informações
IA é muito boa em encontrar padrões e extrair informações relevantes de textos, imagens ou dados.

### 4. Geração de Conteúdo Auxiliar
Para criar rascunhos, sugestões ou conteúdo de apoio, IA pode acelerar significativamente o trabalho.

## Quando NÃO Usar IA

### 1. Decisões Críticas sem Supervisão
Nunca deixe IA tomar decisões importantes sem revisão humana.

### 2. Tarefas Simples que Você Já Faz Bem
Se você já faz algo rápido e bem, não precisa de IA para isso.

### 3. Quando o Custo Supera o Benefício
Se implementar IA é mais caro ou demorado que fazer manualmente, não vale a pena.

### 4. Dados Sensíveis sem Proteção Adequada
Não use IA com dados sensíveis sem garantir privacidade e segurança.

## Conclusão

A chave é usar IA como ferramenta, não como substituto do pensamento crítico. Avalie cada caso e decida se IA realmente agrega valor.
    `,
  },
  'clean-code-ai': {
    title: 'Erros Comuns ao Usar IA e Como Evitar',
    date: '2024-02-15',
    readTime: '11 min',
    tags: ['Erros', 'IA', 'Boas Práticas'],
    content: `
# Erros Comuns ao Usar IA e Como Evitar

Os erros mais comuns que pessoas cometem ao usar IA e como evitá-los. Aprenda com os erros de outros.

## Erro 1: Prompts Vagos ou Genéricos

### O Problema
Fazer perguntas muito genéricas como "me ajude com meu projeto" não funciona.

### A Solução
Seja específico: "Crie um plano de 5 passos para implementar autenticação JWT em uma API Node.js usando TypeScript".

## Erro 2: Não Revisar ou Validar Resultados

### O Problema
Aceitar tudo que a IA retorna sem verificar se está correto.

### A Solução
Sempre revise, teste e valide os resultados. IA pode cometer erros.

## Erro 3: Usar IA para Tudo

### O Problema
Tentar usar IA para tarefas que seriam mais rápidas manualmente.

### A Solução
Use IA para tarefas que realmente se beneficiam dela. Nem tudo precisa de IA.

## Erro 4: Não Fornecer Contexto Adequado

### O Problema
Não dar contexto suficiente para a IA entender o que você precisa.

### A Solução
Forneça contexto relevante: objetivo, restrições, exemplos e formato desejado.

## Erro 5: Não Iterar ou Refinar

### O Problema
Aceitar a primeira resposta sem tentar melhorar.

### A Solução
Itere: peça clarificações, refinamentos e melhorias. A primeira resposta raramente é a melhor.

## Conclusão

Evitar esses erros comuns pode transformar sua experiência com IA de frustrante para produtiva. Lembre-se: IA é uma ferramenta poderosa, mas precisa ser usada com inteligência.
    `,
  },
  'rpa-ai-automation': {
    title: 'IA para Profissionais: Aplicação Prática',
    date: '2024-02-20',
    readTime: '9 min',
    tags: ['Profissional', 'Aplicação', 'IA'],
    content: `
# IA para Profissionais: Aplicação Prática

Como profissionais de diferentes áreas podem usar IA no trabalho. Exemplos práticos e casos reais.

## Para Desenvolvedores

### Geração de Código
Use IA para gerar boilerplate, testes unitários e documentação. Sempre revise o código gerado.

### Debugging e Análise
Cole erros e stack traces para a IA ajudar a identificar problemas.

### Refatoração
Peça para a IA sugerir melhorias de código, otimizações e padrões.

## Para Escritores e Criadores de Conteúdo

### Ideias e Estrutura
Use IA para brainstorm de ideias e criar estruturas de artigos.

### Revisão e Edição
Peça para a IA revisar gramática, clareza e estilo.

### Adaptação de Conteúdo
Transforme um artigo longo em posts de redes sociais ou vice-versa.

## Para Analistas e Pesquisadores

### Análise de Dados
Use IA para identificar padrões, gerar insights e criar visualizações.

### Resumo de Documentos
Extraia pontos principais de relatórios longos rapidamente.

### Pesquisa
Peça para a IA resumir artigos, papers e documentos relevantes.

## Para Gerentes e Líderes

### Planejamento e Estratégia
Use IA para criar planos de ação, estruturar projetos e identificar riscos.

### Comunicação
Gere rascunhos de emails, apresentações e relatórios.

### Análise de Métricas
Peça para a IA analisar dados e sugerir ações baseadas em resultados.

## Conclusão

IA pode ser aplicada em praticamente qualquer área profissional. A chave é entender como ela pode complementar seu trabalho, não substituí-lo.
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

