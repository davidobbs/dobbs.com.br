'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Calendar,
  CheckCircle,
  CheckSquare,
  Clock,
  LineChart,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Shield,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

const highlightStats = [
  {
    value: '30+',
    label: 'Produtos com IA em produção',
    description: 'Agentes, copilotos e automações desenhados para operações críticas.',
  },
  {
    value: '25%',
    label: 'redução média de tempo',
    description: 'Processos de atendimento, compliance e engenharia em clientes recentes.',
  },
  {
    value: 'R$ 5M+',
    label: 'eficiência destravada',
    description: 'Economia recorrente e novas receitas projetadas pelos projetos entregues.',
  },
];

const serviceTracks = [
  {
    title: 'AI Strategy Sprint',
    icon: Target,
    description: 'Workshops executivos e análise técnica para transformar objetivos em um roadmap claro.',
    outcomes: 'Blueprint acionável em 10 dias',
    bullets: [
      'Mapeamento de processos críticos e gargalos',
      'Canvas de maturidade e priorização por ROI',
      'Arquitetura de alto nível e plano de quick wins',
    ],
  },
  {
    title: 'Implementação guiada',
    icon: Brain,
    description: 'Time híbrido (cliente + Dobbs) prototipando e colocando soluções em produção.',
    outcomes: 'PoC -> produção em ciclos de 3-6 semanas',
    bullets: [
      'Prototipação com dados reais e avaliação de riscos',
      'Integrações com sistemas internos e automações',
      'Teste de qualidade e mecanismos de feedback humano',
    ],
  },
  {
    title: 'Operação & escala',
    icon: Shield,
    description: 'Governança, observabilidade e evolução contínua para manter os resultados.',
    outcomes: 'KPIs monitorados e time capacitado',
    bullets: [
      'Runbooks e monitoramento de métricas de IA',
      'Treinamento e capacitação do time interno',
      'Suporte tático para evolução de modelos e prompts',
    ],
  },
];

const processSteps = [
  {
    title: 'Descoberta e priorização',
    duration: 'Semana 1',
    description:
      'Imersão com lideranças, squads e dados para alinhar objetivos de negócio ao impacto esperado.',
    highlights: [
      'Entrevistas com stakeholders e levantamento técnico',
      'Estudo de processos e diagnósticos já existentes',
    ],
    icon: Users,
  },
  {
    title: 'Blueprint e prototipação',
    duration: 'Semanas 2-3',
    description:
      'Modelamos a arquitetura detalhada, definimos guardrails e prototipamos com dados reais.',
    highlights: [
      'Arquitetura alvo, integrações e requisitos de segurança',
      'Piloto funcional para medir qualidade e aderência',
    ],
    icon: Sparkles,
  },
  {
    title: 'Implementação & automação',
    duration: 'Semanas 4-6',
    description:
      'Construção, integrações, testes e planos de rollback para levar o produto a produção.',
    highlights: [
      'Pipelines de dados, conectores e automações críticas',
      'Avaliações contínuas e alinhamento com compliance',
    ],
    icon: LineChart,
  },
  {
    title: 'Go-live e acompanhamento',
    duration: 'Contínuo',
    description: 'Treinamento do time, monitoramento de KPIs e ciclos rápidos de melhoria.',
    highlights: [
      'Playbooks de operação e transferência de conhecimento',
      'Dashboards e rituais quinzenais com indicadores',
    ],
    icon: Shield,
  },
];

const faqs = [
  {
    question: 'Qual é o escopo mínimo do trabalho?',
    answer:
      'Começamos com um Strategy Sprint de 2 semanas para diagnosticar oportunidades e montar o roadmap. A partir daí seguimos para implementação sob demanda ou acompanhamos squads internos.',
  },
  {
    question: 'Vocês assinam NDA e lidam com dados sensíveis?',
    answer:
      'Sim. Trabalhamos com NDAs mútuos, ambientes isolados e configuramos políticas de acesso alinhadas com jurídico e compliance antes de manipular qualquer dado estratégico.',
  },
  {
    question: 'Já tenho um time interno, vocês atuam junto com ele?',
    answer:
      'Preferimos trabalhar de forma integrada. Montamos rituais compartilhados, definimos ownership claro para cada área e deixamos documentação detalhada para continuidade sem dependências.',
  },
  {
    question: 'Há suporte e treinamento após ir para produção?',
    answer:
      'Sim. Incluímos playbooks de operação, treinamentos dedicados e pacotes de acompanhamento mensal para garantir evolução contínua, métricas saudáveis e governança de IA.',
  },
];

const contactDetails = [
  {
    title: 'Email direto',
    description: 'Envie briefing com contexto e objetivos — respondo em até 24h.',
    value: 'contato@dobbs.com.br',
    icon: Mail,
    link: 'mailto:contato@dobbs.com.br',
    linkLabel: 'Enviar email',
  },
  {
    title: 'Chamada estratégica',
    description: '20 minutos para alinhar expectativas e priorizar próximos passos.',
    value: 'Agenda de segunda a sexta, 9h às 19h (BRT)',
    icon: Phone,
  },
  {
    title: 'Canais dedicados',
    description: 'Durante os projetos mantemos um canal exclusivo (Slack/WhatsApp) com quem decide.',
    value: 'Tempo médio de resposta: < 2h em horário comercial',
    icon: MessageSquare,
  },
];

const briefingTips = [
  'Contexto do negócio e processo que deseja transformar',
  'Sistemas e bases de dados disponíveis hoje',
  'Metas, restrições e indicadores que serão acompanhados',
  'Time envolvido e prazos críticos',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <>
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <CheckCircle size={64} className="mx-auto mb-6 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Mensagem enviada!</h1>
              <p className="text-lg text-primary-100 mb-8">
                Obrigado pelo contato. Retorno com um diagnóstico inicial em até 24 horas úteis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" href="/">
                  Voltar ao início
                </Button>
                <Button variant="primary" size="lg" href="#contato">
                  Enviar novo briefing
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-24">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary-100/70 mb-4">Consultoria em IA aplicada</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Estratégia, engenharia e operação de IA com foco em resultado real
            </h1>
            <p className="text-xl text-primary-50/90 mb-8">
              Trabalhamos lado a lado com o seu time para diagnosticar oportunidades, construir agentes
              inteligentes, automatizar processos e garantir governança contínua.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#contato" size="lg">
                Descrever desafio
              </Button>
              <Button href="mailto:contato@dobbs.com.br" variant="secondary" size="lg">
                Falar diretamente comigo
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                'Discovery com executivos e squads para alinhar valor de negócio',
                'Arquitetura e guardrails desenhados para ambientes críticos',
                'KPIs, dashboards e aprendizado contínuo após o go-live',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <ArrowUpRight className="mt-1 text-accent-400" size={18} />
                  <p className="text-sm text-primary-50/90">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <Card variant="elevated" className="p-8 bg-white/10 border-white/20">
            <p className="text-sm uppercase tracking-[0.35em] text-primary-100/70 mb-4">Resultados recentes</p>
            <div className="space-y-6">
              <div>
                <p className="text-4xl font-display font-bold">-38%</p>
                <p className="text-primary-100/80">Tempo total de atendimento em uma operação financeira</p>
              </div>
              <div className="border-t border-white/10 pt-6">
                <p className="text-4xl font-display font-bold">+R$ 1,2M</p>
                <p className="text-primary-100/80">Receita anual estimada com copiloto comercial</p>
              </div>
              <div className="border-t border-white/10 pt-6">
                <p className="text-4xl font-display font-bold">6 semanas</p>
                <p className="text-primary-100/80">Do diagnóstico ao go-live do primeiro agente</p>
              </div>
              <p className="text-sm text-primary-50/80">
                Dados reais de projetos recentes (2019-2024) com fintechs, indústria e saúde.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <Section className="bg-neutral-900/30 border-y border-neutral-800/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlightStats.map((stat) => (
            <Card
              key={stat.label}
              variant="outlined"
              className="p-6 bg-primary-900/40 border-accent-500/30"
            >
              <p className="text-4xl font-display font-semibold text-neutral-50">{stat.value}</p>
              <p className="text-accent-400 font-medium mt-2 uppercase tracking-wide text-xs">
                {stat.label}
              </p>
              <p className="text-sm text-neutral-400 mt-3">{stat.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Consultoria ponta a ponta"
        subtitle="Do diagnóstico ao scale-up, atuo com um playbook validado em empresas de tecnologia, serviços financeiros e indústria."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceTracks.map(({ title, description, bullets, icon: Icon, outcomes }) => (
            <Card key={title} variant="elevated" className="h-full p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-accent-500/10 text-accent-400">
                  <Icon size={22} />
                </div>
                <h3 className="text-2xl font-semibold text-neutral-50">{title}</h3>
              </div>
              <p className="text-neutral-400">{description}</p>
              <ul className="space-y-3">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-300">
                    <CheckSquare className="mt-1 text-accent-400" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-accent-400 font-medium border-t border-neutral-800/70 pt-4 mt-auto">
                {outcomes}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        className="bg-primary-900/20 border-y border-neutral-800/70"
        title="Como conduzimos os projetos"
        subtitle="Processo iterativo com checkpoints semanais, decisões baseadas em dados e um só foco: ROI rápido."
      >
        <div className="space-y-6">
          {processSteps.map(({ title, duration, description, highlights, icon: Icon }, index) => (
            <Card key={title} variant="default" className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-accent-500/10 text-accent-400 flex items-center justify-center font-display text-2xl">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{duration}</p>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-semibold text-neutral-50">{title}</h3>
                      <Icon size={22} className="text-accent-400" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-neutral-400">{description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {highlights.map((item) => (
                      <div key={item} className="bg-primary-900/40 border border-neutral-800/60 rounded-xl p-4 text-sm text-neutral-300">
                        <ArrowUpRight className="text-accent-400 mb-2" size={16} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-neutral-900/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500 mb-4">Próximos passos</p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-50 mb-6">
              Diagnóstico gratuito em uma chamada de 30 minutos
            </h2>
            <p className="text-neutral-400 mb-6">
              Compartilhe onde está hoje, o que já foi tentado e quais métricas precisa mover. Vamos definir juntos
              o escopo inicial e as hipóteses mais seguras para validar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#contato" size="lg">
                Quero enviar briefing
              </Button>
              <Button href="mailto:contato@dobbs.com.br" variant="outline" size="lg">
                Falar com Davi
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-6 bg-primary-900/50 border-neutral-800/60">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-accent-400" size={20} />
                <p className="text-sm text-neutral-400">Tipos de entrega</p>
              </div>
              <ul className="space-y-3 text-sm text-neutral-300">
                <li className="flex items-center gap-2">
                  <Sparkles size={16} className="text-accent-400" />
                  Strategy + Diagnostic Sprint
                </li>
                <li className="flex items-center gap-2">
                  <LineChart size={16} className="text-accent-400" />
                  Implementação e automações sob medida
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-accent-400" />
                  Operação assistida e governança
                </li>
              </ul>
            </Card>
            <Card className="p-6 bg-primary-900/50 border-neutral-800/60">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-accent-400" size={20} />
                <p className="text-sm text-neutral-400">Disponibilidade</p>
              </div>
              <p className="text-lg font-semibold text-neutral-50 mb-3">Novos projetos a cada trimestre</p>
              <p className="text-sm text-neutral-400">
                Reservo apenas duas implementações simultâneas para garantir foco total. Slots atuais: 1 vaga para o próximo
                mês e 2 vagas para o trimestre seguinte.
              </p>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {contactDetails.map(({ title, description, value, icon: Icon, link, linkLabel }) => (
            <Card key={title} className="p-6 bg-primary-900/40 border-neutral-800/60">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="text-accent-400" size={22} />
                <h3 className="text-lg font-semibold text-neutral-50">{title}</h3>
              </div>
              <p className="text-sm text-neutral-400 mb-3">{description}</p>
              <p className="text-neutral-50 font-medium">{value}</p>
              {link && linkLabel && (
                <Button href={link} variant="ghost" size="sm" className="mt-4 w-fit px-0 text-accent-400">
                  {linkLabel}
                </Button>
              )}
            </Card>
          ))}
        </div>
      </Section>

      <Section id="contato">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500 mb-4">Briefing ideal</p>
            <h2 className="text-3xl font-display font-semibold text-neutral-50 mb-6">
              Quanto mais contexto, mais preciso o diagnóstico
            </h2>
            <p className="text-neutral-400 mb-6">
              Use o formulário ao lado para contar sobre o desafio. Em geral respondo com perguntas adicionais,
              referências e próximos passos sugeridos.
            </p>
            <div className="space-y-3">
              {briefingTips.map((tip) => (
                <div key={tip} className="flex items-start gap-3 text-sm text-neutral-300">
                  <Clock size={16} className="mt-1 text-accent-400" />
                  {tip}
                </div>
              ))}
            </div>
          </div>
          <Card variant="elevated" className="p-8 md:p-10">
            <h3 className="text-2xl font-bold text-neutral-50 mb-6">Envie sua mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                  placeholder="Seu nome completo"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <Input
                label="Empresa (opcional)"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nome da sua empresa"
              />

              <Input
                label="Assunto"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Ex: Copiloto para time jurídico, automação de onboarding..."
              />

              <Textarea
                label="Mensagem"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
                rows={6}
                placeholder="Compartilhe contexto atual, desafios, stakeholders e métricas que deseja mover."
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Enviar mensagem
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </Section>

      <Section
        className="bg-neutral-900/30"
        title="Perguntas frequentes"
        subtitle="Transparência desde o primeiro contato. Caso não encontre sua resposta, escreva para contato@dobbs.com.br."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <Card key={faq.question} className="p-6 bg-primary-900/40 border-neutral-800/60">
              <h3 className="text-xl font-semibold text-neutral-50 mb-3">{faq.question}</h3>
              <p className="text-sm text-neutral-300">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
