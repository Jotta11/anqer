export const site = {
  meta: {
    title: "Anqer Technology — Software sob demanda",
    description:
      "Software house brasileira especializada em desenvolvimento web, mobile e sistemas customizados. Construído com rigor.",
    url: "https://anqer.tech",
    locale: "pt_BR",
    siteName: "Anqer Technology",
  },
  navbar: {
    logo: "Anqer",
    links: [
      { label: "Produto", href: "#product" },
      { label: "Lab", href: "#lab" },
      { label: "Processo", href: "#workflow" },
      { label: "Integrações", href: "#integration" },
    ],
    cta: { label: "Fale Conosco", href: "#contact" },
  },
  hero: {
    location: { label: "LOCALIZAÇÃO", value: "Palmas, TO" },
    contact: { label: "CONTATO", value: "contato@anqer.tech" },
    phone: "(+55) 63 ...",
    headline_line1: "Tecnologia que entrega.",
    headline_line2: "Construída com rigor.",
    subline:
      "Software sob medida para empresas que não se contentam com o genérico.",
    principles: [
      { icon: "circle", label: "VISÃO" },
      { icon: "square", label: "PRECISÃO" },
      { icon: "triangle", label: "RIGOR" },
    ],
  },
  ecosystem: {
    eyebrow: "ECOSSISTEMA",
    title: "Onde tecnologia encontra parceria.",
    logos: [
      { name: "Cliente Alpha", src: "/assets/logos/placeholder-1.svg" },
      { name: "Cliente Beta", src: "/assets/logos/placeholder-2.svg" },
      { name: "Cliente Gamma", src: "/assets/logos/placeholder-3.svg" },
      { name: "Cliente Delta", src: "/assets/logos/placeholder-4.svg" },
      { name: "Cliente Epsilon", src: "/assets/logos/placeholder-5.svg" },
      { name: "Cliente Zeta", src: "/assets/logos/placeholder-6.svg" },
      { name: "Cliente Eta", src: "/assets/logos/placeholder-7.svg" },
      { name: "Cliente Theta", src: "/assets/logos/placeholder-8.svg" },
    ],
  },
  corePlatform: {
    eyebrow: "SOBRE",
    title_line1: "A plataforma central.",
    title_line2: "Ferramentas que entregam.",
    /**
     * Cada item corresponde a um estado do scroll pinado (4 estados, ~300vh cada).
     * Conteúdo cycla: subtitle (2 linhas no topo direito), category (big text central
     * direito), e 4 labels nos rodapé (system+performance, 2 colunas × 2 linhas).
     */
    items: [
      {
        number: "01",
        label: "Web",
        category: "Web",
        title: "Desenvolvimento Web Avançado",
        subtitle_line1: "Sites Institucionais e",
        subtitle_line2: "Aplicações SaaS",
        labels: {
          system: { name: "STACK", value: "NEXT.JS" },
          performance: { name: "FOCO", value: "RIGOR" },
        },
        description:
          "Sites institucionais, landing pages e SaaS construídos com Next.js, TypeScript e infraestrutura moderna.",
      },
      {
        number: "02",
        label: "Mobile",
        category: "Mobile",
        title: "Aplicativos Mobile",
        subtitle_line1: "Apps Nativos e",
        subtitle_line2: "Cross-Platform",
        labels: {
          system: { name: "STACK", value: "REACT NATIVE" },
          performance: { name: "FOCO", value: "FLUIDEZ" },
        },
        description:
          "Apps nativos e cross-platform para iOS e Android, com foco em performance e experiência.",
      },
      {
        number: "03",
        label: "Auto",
        category: "Auto",
        title: "Sistemas e Automação",
        subtitle_line1: "ERPs, Dashboards e",
        subtitle_line2: "Integrações Customizadas",
        labels: {
          system: { name: "STACK", value: "API-FIRST" },
          performance: { name: "FOCO", value: "AUTOMAÇÃO" },
        },
        description:
          "ERPs, dashboards, integrações e automações sob demanda para fluxos específicos do seu negócio.",
      },
      {
        number: "04",
        label: "Cloud",
        category: "Cloud",
        title: "Infraestrutura Escalável",
        subtitle_line1: "Cloud, DevOps e",
        subtitle_line2: "Segurança Robusta",
        labels: {
          system: { name: "STACK", value: "AWS · GCP" },
          performance: { name: "FOCO", value: "SLA 99.9%" },
        },
        description:
          "Cloud, DevOps, monitoramento e segurança. Tudo o que sustenta operações sérias.",
      },
    ],
  },
  features: {
    eyebrow: "OS RECURSOS",
    title: "Engenharia que se sustenta.",
    tags: [
      "SISTEMA",
      "TEMPO REAL",
      "CONECTADO",
      "INTELIGENTE",
      "ENTERPRISE",
      "PERFORMANCE",
      "PREDITIVO",
      "INTEGRADO",
      "EFICIÊNCIA",
      "CONFIÁVEL",
    ],
    pillars: [
      {
        icon: "circle",
        label: "CONFIÁVEL",
        title: "Operação contínua",
        description:
          "Arquiteturas resilientes, observabilidade e SLAs claros.",
      },
      {
        icon: "square",
        label: "ESCALÁVEL",
        title: "Pronto para crescer",
        description:
          "Infraestrutura elástica que acompanha o ritmo do seu negócio.",
      },
      {
        icon: "triangle",
        label: "AUTOMATIZADO",
        title: "Menos repetição",
        description:
          "Pipelines, integrações e fluxos que liberam o time do trabalho manual.",
      },
    ],
  },
  workflow: {
    eyebrow: "PROCESSO",
    title: "Como construímos.",
    badge: {
      left: "FLUXO",        // equivalente ao "PARTIAL" do Quantara
      right: "ETAPA",       // equivalente ao "TASK" do Quantara
      // O state_label "[0X]" é atualizado pelo motion conforme o scroll
    },
    steps: [
      {
        number: "01",
        title: "Descoberta",
        description:
          "Entendemos o problema, mapeamos escopo e definimos objetivos.",
      },
      {
        number: "02",
        title: "Arquitetura",
        description:
          "Desenhamos a solução técnica, escolhemos stack e prototipamos.",
      },
      {
        number: "03",
        title: "Desenvolvimento",
        description: "Sprints com entregas incrementais e código limpo.",
      },
      {
        number: "04",
        title: "Entrega",
        description:
          "Deploy, monitoramento, ajustes e evolução contínua.",
      },
    ],
  },
  pricing: {
    eyebrow: "ACESSE INTELIGÊNCIA · NOS SEUS TERMOS",
    title: "Modelos de parceria flexíveis.",
    plans: [
      {
        name: "Sob Demanda",
        price: "Projeto fechado",
        description: "Para escopos definidos e entregas pontuais",
        features: [
          "Escopo fechado",
          "Entrega única",
          "Suporte pós-lançamento 30 dias",
          "Documentação completa",
        ],
        highlighted: false,
        cta: { label: "Fale Conosco", href: "#contact" },
      },
      {
        name: "Crescimento",
        price: "A partir de R$ X / mês",
        description: "Para empresas em evolução contínua",
        features: [
          "Sprints quinzenais",
          "Evolução de produto",
          "Analytics & insights",
          "Suporte prioritário",
        ],
        highlighted: true,
        cta: { label: "Conversar", href: "#contact" },
      },
      {
        name: "Parceria Estratégica",
        price: "Sob consulta",
        description: "Para operações que exigem dedicação contínua",
        features: [
          "Time dedicado",
          "SLA personalizado",
          "Roadmap conjunto",
          "Suporte 24/7",
        ],
        highlighted: false,
        cta: { label: "Solicitar Proposta", href: "#contact" },
      },
    ],
  },
  integration: {
    eyebrow: "INTEGRAÇÃO",
    status: "● MÓDULOS ATIVOS",
    title: "Sistemas conectados. Inteligência unificada.",
    description:
      "Integramos com as ferramentas que já fazem parte do seu fluxo. APIs, webhooks, bancos legados e plataformas de mercado.",
    modules: [
      { name: "API", icon: "circle" },
      { name: "Webhook", icon: "square" },
      { name: "Database", icon: "triangle" },
      { name: "Cloud", icon: "hexagon" },
      { name: "Analytics", icon: "diamond" },
      { name: "Auth", icon: "shield" },
      { name: "Payments", icon: "pentagon" },
    ],
  },
  finalCta: {
    eyebrow: "DEMO PERSONALIZADA",
    title: "Pronto para ver a Anqer em ação?",
    cta: { label: "Fale Conosco", href: "#contact" },
  },
  footer: {
    logo: "Anqer",
    columns: {
      explore: {
        title: "Explorar",
        links: [
          { label: "Produto", href: "#product" },
          { label: "Soluções", href: "#solutions" },
          { label: "Cases", href: "#cases" },
          { label: "Blog", href: "#blog" },
        ],
      },
      utilities: {
        title: "Utilitários",
        links: [
          { label: "Style Guide", href: "#style-guide" },
          { label: "Licença", href: "#license" },
          { label: "Changelog", href: "#changelog" },
          { label: "Instruções", href: "#instructions" },
        ],
      },
      sayHello: { title: "Diga Olá", value: "contato@anqer.tech" },
      contact: { title: "Contato", value: "(+55) 63 ..." },
    },
    copyright: "Anqer Technology © 2026 · Palmas, TO · Brasil",
  },
} as const;

export type Site = typeof site;
