import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import './App.css'
import logo from './assets/logo.png'
import profileImg from './assets/profile.jpeg'
import bioLinkBg from './assets/bio-link-bg.png'
import VMLogin from './VMLogin'
import Dashboard from './Dashboard'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ background: '#050505', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Carregando...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

import {
  MessageCircle,
  Instagram,
  ChevronRight,
  TrendingUp,
  LineChart,
  Target,
  Users,
  Search,
  Settings,
  Briefcase,
  Eye,
  Check,
  X,
  LogOut
} from 'lucide-react'

// --- GLOBAL COMPONENTS ---

function PremiumNav() {
  return (
    <nav className="premium-nav-bar">
      <div className="nav-container">
        {/* Left: Logo */}
        <Link to="/" className="nav-brand">
          <img src={logo} alt="Vinícius Matoba" className="nav-logo" />
        </Link>

        {/* Center: Desktop Links */}
        <div className="nav-links">
          <Link to="/metodo-vm" className="nav-link">Método VM</Link>
          <Link to="/diagnostico" className="nav-link">Diagnóstico Estratégico</Link>
        </div>

        {/* Right: CTA (Desktop) */}
        <div className="nav-cta">
          <Link to="/diagnostico" className="btn-vm-green-small">
            Agendar Diagnóstico
          </Link>
        </div>
      </div>
    </nav>
  );
}

function FloatingCTA() {
  return (
    <a
      href="https://wa.me/5519984522494?text=Olá!+Vi+seu+site+e+quero+agendar+um+diagnóstico+estratégico"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-cta-expanded"
      aria-label="Agendar via WhatsApp"
    >
      <MessageCircle size={24} />
      <span>Agendar Diagnóstico Estratégico</span>
    </a>
  );
}

// --- PAGE COMPONENTS ---

const VM_STEPS = [
  {
    title: 'Diagnosticar',
    description: 'Entender o cenário atual e identificar gargalos estratégicos.',
    icon: <Search className="mb-1 cycle-icon-base" />
  },
  {
    title: 'Posicionar',
    description: 'Definir como o mercado deve perceber o seu negócio.',
    icon: <Target className="mb-1 cycle-icon-base" />
  },
  {
    title: 'Planejar',
    description: 'Estruturar a estratégia de comunicação e crescimento.',
    icon: <Briefcase className="mb-1 cycle-icon-base" />
  },
  {
    title: 'Executar',
    description: 'Colocar o plano em prática com consistência.',
    icon: <Check className="mb-1 cycle-icon-base" />
  },
  {
    title: 'Analisar',
    description: 'Avaliar dados para entender o que realmente funciona.',
    icon: <LineChart className="mb-1 cycle-icon-base" />
  },
  {
    title: 'Otimizar',
    description: 'Ajustar continuamente a estratégia para evoluir.',
    icon: <TrendingUp className="mb-1 cycle-icon-base" />
  }
];

function LandingPage() {
  return (
    <div className="landing-wrapper bg-base-white">
      <PremiumNav />

      {/* SECTION 1 — HERO */}
      <section className="premium-hero-section">
        <div className="container-premium hero-grid-premium">
          <div className="hero-content-left">
            <h1 className="hero-title-premium">
              Estratégia antes da postagem.
            </h1>
            <p className="hero-subtitle-premium">
              Transformo presença digital em crescimento previsível através do <strong>Método VM — Ciclo de Crescimento Digital.</strong>
            </p>
            <div className="hero-buttons-wrapper">
              <Link to="/diagnostico" className="btn-vm-green-large">
                Agendar Diagnóstico Estratégico
              </Link>
              <Link to="/metodo-vm" className="btn-outline-navy">
                Conhecer o Método VM
              </Link>
            </div>
          </div>
          <div className="hero-content-right">
            <div className="hero-image-frame">
              <img src={profileImg} alt="Vinícius Matoba" className="hero-img-consultant" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — MARKET PROBLEM */}
      <section className="premium-section bg-soft-gray">
        <div className="container-premium text-center">
          <h2 className="premium-section-title max-width-1000 margin-auto">
            A maioria das empresas não tem um problema de marketing.<br />
            <span className="text-accent-green">Tem um problema de estratégia.</span>
          </h2>
          <p className="premium-section-text max-width-800 margin-auto mt-4">
            Muitos negócios postam com frequência, criam conteúdo e investem muito tempo tentando crescer. Mas os resultados não vêm. Isso acontece porque a execução está vindo antes de entender o público, o posicionamento e a própria estratégia.
          </p>
        </div>
      </section>

      {/* SECTION 3 — AUTHORITY (VINÍCIUS MATOBA) */}
      <section className="premium-section bg-base-white">
        <div className="container-premium authority-grid">
          <div className="authority-text">
            <h2 className="premium-section-title">Estratégia orientada a resultados.</h2>
            <div className="premium-section-text mt-4">
              <p>Sou Vinícius Matoba, estrategista digital.</p>
              <p>Minha trajetória não começou na criação de conteúdo, mas em ambientes corporativos focados em processos, dados e tomada de decisão.</p>
              <p>Trago essa visão analítica para o digital: meu objetivo é construir sistemas de aquisição de clientes que dependam menos de achismos e mais de estratégia validada.</p>
            </div>
          </div>
          <div className="authority-stats bg-navy text-white">
            <div className="stat-item">
              <span className="stat-icon"><Target size={32} /></span>
              <p>Estratégia</p>
            </div>
            <div className="stat-item">
              <span className="stat-icon"><TrendingUp size={32} /></span>
              <p>Crescimento</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — MÉTODO VM PREVIEW */}
      <section className="premium-section bg-soft-gray">
        <div className="container-premium text-center">
          <h2 className="premium-section-title max-width-800 margin-auto">O motor do seu crescimento.</h2>
          <p className="premium-section-text max-width-800 margin-auto mt-3 mb-5">
            O Método VM não é uma promessa mágica, é um processo de engenharia aplicado ao marketing digital.
          </p>

          <div className="method-preview-box">
            <div className="preview-badges">
              <span>Diagnosticar</span>
              <ChevronRight size={16} />
              <span>Posicionar</span>
              <ChevronRight size={16} />
              <span>Planejar</span>
              <ChevronRight size={16} />
              <span>Executar</span>
              <ChevronRight size={16} />
              <span>Analisar</span>
              <ChevronRight size={16} />
              <span>Otimizar</span>
            </div>
          </div>

          <div className="mt-5">
            <Link to="/metodo-vm" className="btn-outline-navy btn-large">
              Explorar o Método VM
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — BENEFITS */}
      <section className="premium-section bg-base-white">
        <div className="container-premium">
          <h2 className="premium-section-title text-center mb-5">O que muda com uma estratégia sólida</h2>
          <div className="benefits-premium-grid">
            <div className="benefit-premium-card">
              <Check size={24} className="text-accent-green mb-3" />
              <h3>Clareza de Direção</h3>
              <p>Saber exatamente o que postar, para quem e com qual objetivo.</p>
            </div>
            <div className="benefit-premium-card">
              <Check size={24} className="text-accent-green mb-3" />
              <h3>Posicionamento Forte</h3>
              <p>Ser percebido pelo mercado com alto valor, fugindo da guerra de preços.</p>
            </div>
            <div className="benefit-premium-card">
              <Check size={24} className="text-accent-green mb-3" />
              <h3>Crescimento Previsível</h3>
              <p>Deixar de depender da sorte e criar um processo replicável de vendas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="premium-section bg-navy text-white text-center">
        <div className="container-premium">
          <h2 className="premium-section-title text-white">Vamos analisar o seu cenário?</h2>
          <p className="premium-section-text text-white opacity-80 max-width-800 margin-auto mt-3 mb-5">
            O primeiro passo para destravar seu crescimento digital é entender a fundo onde o seu negócio está e para onde ele deve ir.
          </p>
          <Link to="/diagnostico" className="btn-vm-green-large">
            Agendar Diagnóstico Estratégico
          </Link>
        </div>
      </section>

      <footer className="section-padding premium-footer" style={{ backgroundColor: '#0B222C', color: 'white', textAlign: 'center' }}>
        <img src={logo} alt="Logo VM" style={{ width: '180px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>© 2026 Vinícius Matoba. Estratégia Digital. Todos os direitos reservados.</p>
        <Link to="/login" className="footer-login-link" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--accent-green)', textDecoration: 'none', fontSize: '0.85rem' }}>
          Acesso Agência
        </Link>
      </footer>

      {/* FLOATING ACTION BUTTON */}
      <FloatingCTA />
    </div>
  );
}

function FullSitePage() {
  return (
    <div className="full-site-wrapper">
      <header className="site-mini-header">
        <Link to="/" className="back-link">
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Voltar para o Início
        </Link>
        <img src={logo} alt="Logo VM" className="mini-logo" />
      </header>

      {/* SECTION: SOBRE (WHO IS VINICIUS) - MOVED TO TOP */}
      <section className="section-padding bio-section-home">
        <div className="container-narrow mb-4">
          <h2 className="strategic-headline text-center">Quem é Vinicius Matoba:</h2>
        </div>
        <div className="bio-grid-home">
          <div className="photo-container-home">
            <div className="photo-frame">
              <img src={profileImg} alt="Vinícius Matoba" className="photo-frame-img" />
            </div>
          </div>
          <div className="bio-text-content">
            <h2 className="mb-2">Estratégia não nasce do acaso.<br />Nasce de experiência.</h2>
            <div className="consultative-text">
              <p className="mb-2">
                Minha trajetória profissional não começou no marketing digital. Começou em ambientes corporativos exigentes, onde estratégia, decisão e responsabilidade impactam resultados reais.
              </p>

              <div className="trajectory-blocks">
                <div className="trajectory-item">
                  <strong>Multinacionais & Tradução</strong>
                  <p>Atuei como tradutor em multinacionais do setor automobilístico, incluindo a Toyota, trabalhando diretamente com gerências e alta direção.</p>
                </div>
                <div className="trajectory-item">
                  <strong>Recursos Humanos (6 Anos)</strong>
                  <p>Construí uma carreira sólida no RH, com foco em Recrutamento e Seleção, desenvolvimento e apoio direto a colaboradores.</p>
                </div>
                <div className="trajectory-item">
                  <strong>Custos & Contabilidade</strong>
                  <p>Atuei na área de custos — aprendendo a olhar números como direcionamento estratégico, não apenas como relatório.</p>
                </div>
              </div>

              <div className="differentiator-box">
                <p>Essa combinação me deu algo que poucos possuem:</p>
                <h4 className="differentiator-text">Visão estratégica baseada em pessoas, processos e dados.</h4>
              </div>

              <p className="mb-2">
                Com formação em Publicidade e Propaganda e especializações em marketing digital e tráfego pago, desenvolvi meu próprio modelo de trabalho: <strong>O Método VM — Ciclo de Crescimento Digital.</strong>
              </p>

              <div className="final-authority-punch">
                <p>Porque Marketing não é sobre aparecer.</p>
                <p className="highlight-green">É sobre direcionar o crescimento.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: METHOD INTRO & CTA */}
      <section className="strategic-method-fold section-padding bg-light">
        <div className="container-narrow text-center">
          <h2 className="strategic-headline">
            Crescimento não é improviso.<br />
            <span className="text-secondary-green">É processo.</span>
          </h2>

          <div className="strategic-body mb-4">
            <h4 className="method-name mb-3">Método VM — Ciclo de Crescimento Digital</h4>
            <p>Para transformar redes sociais em um canal previsível de aquisição, não basta postar mais.</p>
            <p className="highlight-text-navy">É preciso estruturar.</p>
          </div>

          <div className="site-cta-group mt-4">
            <Link to="/metodo-vm" className="btn-site-navy">
              Conheça o Método VM
            </Link>
            <Link to="/metodo-vm#planos" className="btn-site-green">
              Verificar os Planos
            </Link>
          </div>
        </div>
      </section>


      {/* SECTION: STRATEGIC SIXTH FOLD (ENTRY PROCESS) */}
      <section className="strategic-entry-fold section-padding">
        <div className="container-narrow text-center">
          <h2 className="strategic-headline">Como funciona a reunião estratégica</h2>

          <div className="entry-intro-box">
            <p className="large-text">O primeiro passo não é contratar.</p>
            <p className="accent-text">É entender.</p>
          </div>

          <div className="entry-benefits-grid">
            <div className="benefit-item">
              <Check size={24} className="icon-check" />
              <p>Analisar seu cenário atual</p>
            </div>
            <div className="benefit-item">
              <Check size={24} className="icon-check" />
              <p>Entender seu modelo de negócio</p>
            </div>
            <div className="benefit-item">
              <Check size={24} className="icon-check" />
              <p>Identificar gargalos de aquisição</p>
            </div>
            <div className="benefit-item">
              <Check size={24} className="icon-check" />
              <p>Avaliar se o Método VM faz sentido para você</p>
            </div>
          </div>

          <div className="final-cta-block">
            <h3 className="cta-question">Pronto para estruturar seu crescimento?</h3>
            <a
              href="https://wa.me/5519984522494?text=Olá+Vinícius,+quero+agendar+minha+reunião+estratégica"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-strategic-final"
            >
              Agendar Reunião Estratégica
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <div className="vm-footer-access">
        <Link to="/login" className="btn-access-backstage">
          <span>Acessar Agência VM</span>
          <ChevronRight size={16} />
        </Link>
      </div>
      <footer className="section-padding premium-footer" style={{ backgroundColor: '#0F2D3A', color: 'white', textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <p style={{ opacity: 0.6 }}>© 2026 VM Estratégia Digital. Todos os direitos reservados.</p>
      </footer>
      <FloatingCTA />
    </div>
  );
}

function MetodoVMPage() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="metodo-vm-page-wrapper bg-base-white">
      <PremiumNav />

      {/* SECTION 1 — HERO */}
      <section className="premium-hero-section">
        <div className="container-premium text-center">
          <h1 className="hero-title-premium max-width-1000 margin-auto">Método VM — Ciclo de Crescimento Digital</h1>
          <p className="hero-subtitle-premium max-width-800 margin-auto mt-4">
            Um processo estratégico contínuo para transformar presença digital em crescimento previsível.
          </p>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="premium-section bg-soft-gray">
        <div className="container-premium text-center">
          <h2 className="premium-section-title">A maioria das estratégias digitais falha por um motivo simples.</h2>
          <div className="premium-section-text mt-4 max-width-800 margin-auto">
            <p className="font-bold text-navy mb-3">A execução vindo antes do planejamento.</p>
            <p>Muitos negócios criam posts, sobem campanhas e gravam vídeos sem responder as perguntas fundamentais do próprio negócio. Quando você executa sem estratégia, gasta tempo e dinheiro para atrair o cliente errado.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE STRATEGIC CYCLE (ORBITAL) */}
      <section className="premium-section bg-navy text-white text-center">
        <div className="container-premium">
          <h2 className="premium-section-title text-white">Crescimento digital é um ciclo.</h2>
          <p className="premium-section-text text-white opacity-80 max-width-800 margin-auto mb-5">
            Um sistema cíclico projetado para melhorar continuamente a aquisição de clientes.
          </p>

          <div className="orbital-diagram-container">
            <div className="orbital-center">
              Método VM<br /><span>Ciclo de Crescimento Digital</span>
            </div>

            {/* The circular track line */}
            <div className="orbital-track"></div>

            {VM_STEPS.map((step, idx) => {
              // 6 steps = 60 degrees each. Subtract 90 to start from top.
              const angle = (idx * 60) - 90;

              return (
                <div
                  key={idx}
                  className={`orbital-node ${activeStep === idx ? 'active' : ''}`}
                  style={{ '--angle': `${angle}deg` }}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                >
                  <div className="orbital-node-circle">
                    {step.icon}
                  </div>
                  <div className="orbital-node-label">{step.title}</div>

                  {/* Tooltip */}
                  <div className="orbital-tooltip">
                    <strong>{step.title}</strong>
                    <p>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="orbital-subtext text-white opacity-70 mt-5">
            Diagnosticar → Posicionar → Planejar → Executar → Analisar → Otimizar<br />
            <span className="text-green font-bold">E o ciclo recomeça.</span>
          </p>
        </div>
      </section>

      {/* SECTION 4 — EXPLANATION OF EACH STEP */}
      <section className="premium-section bg-base-white">
        <div className="container-premium">
          <h2 className="premium-section-title text-center mb-5">Como funciona cada etapa do ciclo</h2>
          <div className="benefits-premium-grid">
            {VM_STEPS.map((step, index) => (
              <div key={index} className="benefit-premium-card border-navy hover-glow">
                <div className="icon-wrapper-navy mb-3">{step.icon}</div>
                <h3 className="text-navy font-bold">{step.title}</h3>
                <p className="mt-2 text-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CTA */}
      <section className="premium-section bg-soft-gray text-center">
        <div className="container-premium">
          <h2 className="premium-section-title">O primeiro passo é entender o seu cenário.</h2>
          <p className="premium-section-text max-width-800 margin-auto mt-3 mb-5">
            Nenhuma implementação do Método VM começa com execução. Tudo parte de um diagnóstico profundo.
          </p>
          <Link to="/diagnostico" className="btn-vm-green-large">
            Agendar Diagnóstico Estratégico
          </Link>
        </div>
      </section>

      <footer className="section-padding premium-footer" style={{ backgroundColor: '#0B222C', color: 'white', textAlign: 'center' }}>
        <img src={logo} alt="Logo VM" style={{ width: '180px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>© 2026 Vinícius Matoba. Estratégia Digital. Todos os direitos reservados.</p>
      </footer>

      <FloatingCTA />
    </div>
  );
}

function BioLink() {
  const cards = [
    {
      title: "Eu quero uma Reunião Estratégica",
      subtitle: "Descubra os gargalos que impedem seu lucro.",
      image: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=800",
      link: "/reuniao-estrategica",
      isModal: false,
      isInternal: true
    },
    {
      title: "Crescimento Estruturado — Método VM",
      subtitle: "Posicionamento, conteúdo e tráfego por dados.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
      link: "/metodo-vm",
      isModal: false,
      isInternal: true
    },
    {
      title: "Visitar Site Oficial",
      subtitle: "Conheça meu trabalho, metodologia e história.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800",
      link: "/",
      isModal: false,
      isInternal: true
    },
    {
      title: "Conversar no WhatsApp",
      subtitle: "Fale diretamente com Vinícius Matoba.",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800",
      link: "https://wa.me/5519984522494",
      isModal: false
    }
  ];

  return (
    <div className="bio-container" style={{ backgroundImage: `url(${bioLinkBg})` }}>
      <div className="bio-overlay-bg"></div>
      {/* 1. TOPO DE AUTORIDADE */}
      <header className="bio-header">
        <div className="bio-profile-card">
          <div className="bio-profile-wrapper">
            <img src={profileImg} alt="Vinícius Matoba" className="bio-profile-img" />
          </div>
          <div className="bio-profile-text">
            <h1 className="bio-name">Vinícius Matoba</h1>
            <p className="bio-description">
              Estrategista digital para negócios locais. Estruturo crescimento previsível através do Método VM — posicionamento, conteúdo e reunião estratégica orientada por dados.
            </p>
          </div>
        </div>
      </header>

      {/* 2. CARDS VISUAIS "FORMATO 2026" */}
      <main className="bio-main">
        <div className="bio-cards-grid">
          {cards.map((card, idx) => (
            card.isInternal ? (
              <Link key={idx} to={card.link} className="bio-card">
                <div className="bio-card-bg" style={{ backgroundImage: `url(${card.image})` }}></div>
                <div className="bio-card-overlay"></div>
                <div className="bio-card-content">
                  <h2 className="bio-card-title">{card.title}</h2>
                  <p className="bio-card-subtitle">{card.subtitle}</p>
                </div>
              </Link>
            ) : (
              <a key={idx} href={card.link} target="_blank" rel="noopener noreferrer" className="bio-card">
                <div className="bio-card-bg" style={{ backgroundImage: `url(${card.image})` }}></div>
                <div className="bio-card-overlay"></div>
                <div className="bio-card-content">
                  <h2 className="bio-card-title">{card.title}</h2>
                  <p className="bio-card-subtitle">{card.subtitle}</p>
                </div>
              </a>
            )
          ))}
        </div>
      </main>

      <footer className="footer-triangle-container">
        <div className="footer-triangle">
          <img src={logo} alt="Logo" className="logo-white" />
        </div>
      </footer>
    </div>
  );
}

function ReuniaoEstrategicaPage() {
  return (
    <div className="metodo-wrapper" translate="no" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="site-mini-header">
        <Link to="/linknabio" className="back-link">
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Voltar para os Links
        </Link>
        <img src={logo} alt="Logo VM" className="mini-logo" />
      </header>

      <section className="strategic-method-fold section-padding" style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <div className="container-narrow text-center">
          <div className="vm-step-counter">O Primeiro Passo</div>
          <h2 className="strategic-headline mb-5" style={{ color: 'var(--primary-navy)', fontSize: '2.2rem' }}>
            Como funciona a nossa<br />
            <span className="text-secondary-green">Reunião Estratégica:</span>
          </h2>

          <div className="entry-benefits-grid mb-5" style={{ display: 'grid', gap: '1.5rem', textAlign: 'left', maxWidth: '600px', margin: '0 auto 3rem' }}>
            <div className="benefit-item" style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '1.2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15, 45, 58, 0.05)' }}>
              <Check size={24} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Analisar seu cenário atual de ponta a ponta</p>
            </div>
            <div className="benefit-item" style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '1.2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15, 45, 58, 0.05)' }}>
              <Check size={24} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Entender profundamente seu modelo de negócio</p>
            </div>
            <div className="benefit-item" style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '1.2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15, 45, 58, 0.05)' }}>
              <Check size={24} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Identificar os reais gargalos de aquisição</p>
            </div>
            <div className="benefit-item" style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '1.2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(15, 45, 58, 0.05)' }}>
              <Check size={24} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Avaliar se o Método VM é a melhor solução agora</p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://wa.me/5519984522494?text=Olá+Vinícius,+conheci+as+etapas+pelo+site+e+quero+agendar+minha+reunião+estratégica"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-cta-wa"
              style={{ padding: '1.3rem 3rem', fontSize: '1.2rem' }}
            >
              Agendar Minha Reunião Estratégica <ChevronRight size={22} />
            </a>
          </div>
        </div>
      </section>

      <footer className="section-padding premium-footer" style={{ backgroundColor: '#0F2D3A', color: 'white', textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <p style={{ opacity: 0.6 }}>© 2026 VM Estratégia Digital. Todos os direitos reservados.</p>
      </footer>
      <FloatingCTA />
    </div>
  );
}

function DiagnosticoPage() {
  return (
    <div className="diagnostico-page-wrapper">
      <PremiumNav />

      {/* SECTION 1 — HERO */}
      <section className="premium-hero-section">
        <div className="container-premium text-center">
          <h1 className="hero-title-premium max-width-1000 margin-auto">Diagnóstico Estratégico de Crescimento Digital</h1>
          <p className="hero-subtitle-premium max-width-800 margin-auto mt-4 mb-5">
            Uma análise estruturada para entender o que está travando o crescimento do seu negócio e quais caminhos estratégicos podem destravar resultados.
          </p>
          <div className="cta-wrapper-diagnostico mt-5">
            <a
              href="https://wa.me/5519984522494?text=Olá!+Quero+agendar+meu+diagnóstico+estratégico"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-vm-green-large"
            >
              Agendar Diagnóstico Estratégico
            </a>
            <div className="info-text-mini mt-4">
              <span>Duração: 45 minutos</span>
              <span className="separator">•</span>
              <span>Formato: Online</span>
              <span className="separator">•</span>
              <span>Custo: Gratuito</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="premium-section bg-soft-gray">
        <div className="container-premium text-center">
          <h2 className="premium-section-title">A maioria das empresas tenta crescer executando antes de entender.</h2>
          <div className="premium-section-text margin-auto mt-4 max-width-800">
            <p className="mb-4">Muitos negócios estão presentes nas redes sociais. Postam conteúdo, testam campanhas, e seguem tendências.</p>
            <p className="font-bold text-navy my-4">Mas sem clareza estratégica, o resultado é simples:</p>
            <ul className="strategic-list-minimal center-list mb-0">
              <li>esforço alto</li>
              <li>retorno baixo</li>
              <li>crescimento inconsistente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT HAPPENS DURING THE DIAGNOSIS */}
      <section className="premium-section bg-base-white">
        <div className="container-premium">
          <div className="two-col-grid">
            <div className="grid-text-side">
              <h2 className="premium-section-title">O que acontece durante o diagnóstico estratégico</h2>
              <p className="premium-section-text mb-4 mt-3 opacity-80">Durante a conversa analisamos os principais pontos do seu cenário digital.</p>
              <ul className="strategic-check-list">
                <li>Seu posicionamento atual</li>
                <li>Como seu negócio está sendo percebido</li>
                <li>Sua comunicação digital</li>
                <li>Possíveis gargalos estratégicos</li>
                <li>Oportunidades de crescimento</li>
              </ul>
            </div>
            <div className="grid-visual-side bg-navy-accent" style={{ borderRadius: '12px' }}>
              <div className="visual-content-placeholder">
                <Target size={80} className="text-accent-green opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT YOU GET FROM THE CALL */}
      <section className="premium-section bg-soft-gray">
        <div className="container-premium">
          <h2 className="premium-section-title text-center mb-5">O que você leva dessa conversa</h2>
          <div className="benefits-premium-grid">
            {[
              { title: 'Clareza sobre seu posicionamento', icon: <Eye size={32} /> },
              { title: 'Identificação de gargalos estratégicos', icon: <TrendingUp size={32} /> },
              { title: 'Direcionamento de crescimento', icon: <Target size={32} /> },
              { title: 'Recomendações práticas', icon: <Settings size={32} /> }
            ].map((item, idx) => (
              <div key={idx} className="benefit-premium-card border-navy text-center">
                <div className="icon-wrapper-green mx-auto mb-3" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2f5ec', color: 'var(--accent-green)', borderRadius: '50%' }}>{item.icon}</div>
                <h3 className="font-bold">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 & 6 — WHO THIS IS FOR / NOT FOR */}
      <section className="premium-section bg-base-white">
        <div className="container-premium">
          <div className="qualification-grid-premium">
            <div className="qual-box-premium border-green bg-soft-green">
              <h2 className="premium-section-title" style={{ fontSize: '1.8rem' }}>Essa conversa é para você se</h2>
              <ul className="strategic-check-list mt-4">
                <li>Quer crescer com estratégia</li>
                <li>Sente que está executando sem clareza</li>
                <li>Quer melhorar posicionamento digital</li>
                <li>Busca crescimento previsível</li>
              </ul>
            </div>
            <div className="qual-box-premium border-gray bg-soft-gray">
              <h2 className="premium-section-title text-gray" style={{ fontSize: '1.8rem' }}>Essa conversa não é para você se</h2>
              <ul className="strategic-list-minimal mt-4">
                <li>Procura apenas alguém para fazer posts soltos</li>
                <li>Busca "fórmulas mágicas" e soluções rápidas sem estratégia</li>
                <li>Não está disposto a analisar a fundo o seu negócio</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — ABOUT VINÍCIUS MATOBA */}
      <section className="premium-section bg-soft-gray">
        <div className="container-premium authority-grid">
          <div className="authority-text">
            <h2 className="premium-section-title">Quem conduz o diagnóstico</h2>
            <div className="premium-section-text mt-4">
              <p>Sou Vinícius Matoba, estrategista digital.</p>
              <p>Ajudo empresas e profissionais a transformarem presença digital em crescimento estruturado através do Método VM — Ciclo de Crescimento Digital.</p>
              <p className="font-bold text-navy mt-3">Meu trabalho começa com estratégia antes da execução.</p>
            </div>
          </div>
          <div className="authority-image text-center">
            <img src={profileImg} alt="Vinícius Matoba" className="premium-bio-img" style={{ maxWidth: '300px' }} />
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CALL TO ACTION */}
      <section className="premium-section bg-navy text-white text-center">
        <div className="container-premium">
          <h2 className="premium-section-title text-white">Vamos analisar o seu cenário?</h2>
          <p className="premium-section-text text-white opacity-80 mb-5 max-width-800 margin-auto mt-3">
            Escolha um horário disponível para o diagnóstico estratégico.
          </p>

          <div className="cta-final-box-diag mt-4">
            <a
              href="https://wa.me/5519984522494?text=Olá!+Quero+agendar+meu+diagnóstico+estratégico"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-vm-green-large"
            >
              Agendar Diagnóstico Estratégico
            </a>
            <div className="info-text-mini text-white opacity-70 mt-4">
              <span>Duração: 45 minutos</span>
              <span className="separator text-green">•</span>
              <span>Formato: Online</span>
              <span className="separator text-green">•</span>
              <span>Custo: Gratuito</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-padding" style={{ backgroundColor: '#05161D', color: 'white', textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '180px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <p style={{ opacity: 0.5 }}>© 2026 VM Estratégia Digital. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/linknabio" element={<BioLink />} />
        <Route path="/reuniao-estrategica" element={<ReuniaoEstrategicaPage />} />
        <Route path="/diagnostico" element={<DiagnosticoPage />} />
        <Route path="/metodo-vm" element={<MetodoVMPage />} />
        <Route path="/site" element={<FullSitePage />} />
        <Route path="/login" element={<VMLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
