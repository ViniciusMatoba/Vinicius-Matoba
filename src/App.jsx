import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import './App.css'
import logo from './assets/logo.png'
import heroHomeNewImg from './assets/hero-home-new.png'
import bioLinkBg from './assets/bio-link-bg.png'
import metodoCicloImg from './assets/metodo-ciclo.jpeg.png'
import metodoHeroBg from './assets/metodo-hero-bg.jfif'
import metodoFooterBg from './assets/metodo-footer-bg.png'
import VMLogin from './VMLogin'
import Dashboard from './Dashboard'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import InteractiveDiagnosis from './InteractiveDiagnosis'; // New Tool

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
          <a href="#metodo" className="nav-link">Método</a>
          <a href="#diagnostico" className="nav-link">Diagnóstico</a>
        </div>

        {/* Right: CTA (Desktop) */}
        <div className="nav-cta">
          <a href="#agendar" className="btn-vm-green-small">
            Agendar Diagnóstico
          </a>
        </div>
      </div>
    </nav>
  );
}

function FloatingCTA() {
  return (
    <a
      href="#agendar"
      className="floating-cta-expanded"
      aria-label="Agendar Diagnóstico"
    >
      <MessageCircle size={24} />
      <span>Agendar Diagnóstico</span>
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
      <section className="premium-hero-section bg-hero-cycle" style={{ backgroundImage: `url(${metodoCicloImg})` }}>
        <div className="hero-overlay-soft"></div>
        <div className="container-premium hero-grid-premium">
          <div className="hero-content-left">
            <h1 className="hero-title-premium">
              Estratégia antes da postagem.
            </h1>
            <p className="hero-subtitle-premium">
              Transformo presença digital em crescimento previsível <br className="desktop-only-br" /> através do <strong>Método VM — Ciclo de Crescimento Digital.</strong>
            </p>
            <div className="hero-buttons-wrapper">
              <a href="#agendar" className="btn-vm-green-large">
                Agendar Diagnóstico Estratégico
              </a>
              <a href="#metodo" className="btn-outline-navy">
                Conhecer o Método VM
              </a>
            </div>
          </div>
          <div className="hero-content-right">
            <div className="hero-image-frame">
              <img src={heroHomeNewImg} alt="Vinícius Matoba" className="hero-img-consultant" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE MARKET PROBLEM */}
      <section id="market-problem" className="premium-section bg-soft-gray">
        <div className="container-premium text-center">
          <h2 className="premium-section-title max-width-1000 margin-auto">
            A maioria das empresas não tem um problema de marketing.<br />
            <span className="text-accent-green">Tem um problema de estratégia.</span>
          </h2>
          <p className="premium-section-text max-width-800 margin-auto mt-4">
            Muitos negócios postam com frequência, criam conteúdo e investem muito tempo tentando crescer. <br className="desktop-only-br" /> Mas os resultados não vêm. Isso acontece porque a execução está vindo antes de entender o público, o posicionamento e a própria estratégia.
          </p>
        </div>
      </section>

      {/* SECTION 3 — ABOUT VINÍCIUS MATOBA */}
      <section id="sobre" className="premium-section bg-base-white">
        <div className="container-premium authority-grid">
          <div className="authority-text">
            <h2 className="premium-section-title">Estratégia orientada a resultados.</h2>
            <div className="premium-section-text mt-4">
              <p>Sou Vinícius Matoba, estrategista digital.</p>
              <p>Minha trajetória não começou na criação de conteúdo, <br className="desktop-only-br" /> mas em ambientes corporativos focados em processos, dados e tomada de decisão.</p>
              <p>Trago essa visão analítica para o digital: meu objetivo é construir sistemas de aquisição de clientes <br className="desktop-only-br" /> que dependam menos de achismos e mais de estratégia validada.</p>
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

      {/* SECTION 4 — MÉTODO VM INTRO */}
      <section id="metodo" className="premium-section bg-metodo-hero" style={{ backgroundImage: `url(${metodoHeroBg})` }}>
        <div className="container-premium text-center">
          <h2 className="premium-section-title max-width-800 margin-auto">A Engenharia do Crescimento</h2>
          <p className="premium-section-text max-width-800 margin-auto mt-3 mb-5">
            O Método VM não é uma promessa mágica, <br className="desktop-only-br" /> é um processo estruturado aplicado ao marketing digital.
          </p>

          {/* SECTION 5 — INTERACTIVE METHOD DIAGRAM */}
          <div className="metodo-ciclo-photo-container mb-5">
            <img
              src={metodoCicloImg}
              alt="Método VM - Ciclo de Crescimento"
              className="margin-auto"
              style={{ maxWidth: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', backgroundColor: 'white', padding: '1rem' }}
            />
          </div>

          <p className="orbital-subtext text-navy opacity-70 mb-5">
            <span className="text-accent-green font-bold">O ciclo de crescimento que transforma presença em lucro.</span>
          </p>
        </div>
      </section>

      {/* SECTION 6 — METHOD EXPLANATION */}
      <section className="premium-section bg-base-white">
        <div className="container-premium">
          <h2 className="premium-section-title text-center mb-5">Como funciona cada etapa do ciclo</h2>
          <div className="benefits-premium-grid">
            {VM_STEPS.map((step, index) => (
              <div key={index} className="benefit-premium-card border-navy hover-glow">
                <div className="icon-wrapper-navy mb-3">{step.icon}</div>
                <p className="mt-2 text-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — DIAGNÓSTICO ESTRATÉGICO */}
      <section id="diagnostico" className="premium-section bg-soft-gray">
        <div className="container-premium text-center">
          <h2 className="premium-section-title mb-3">Ponto de Partida: Diagnóstico de Maturidade</h2>
          <p className="premium-section-text max-width-800 margin-auto mb-5">
            Uma análise profunda para identificar o que trava seu crescimento hoje, <br className="desktop-only-br" /> mapear gargalos na aquisição e traçar o plano de ação ideal.
          </p>

          {/* EMBEDDED DIAGNOSIS TOOL */}
          <div className="embedded-diagnosis-wrapper" style={{ marginTop: '2rem' }}>
            <InteractiveDiagnosis isEmbedded={true} />
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CALL TO ACTION */}
      <section id="agendar" className="premium-section bg-navy text-white text-center">
        <div className="container-premium">
          <h2 className="premium-section-title text-white">O primeiro passo é entender o seu cenário.</h2>
          <p className="premium-section-text text-white opacity-80 max-width-800 margin-auto mt-3 mb-5">
            Escolha um horário para conversarmos sobre a implementação do Método VM no seu negócio.
          </p>
          <a
            href="https://wa.me/5519984522494?text=Olá+Vinícius,+completei+o+diagnóstico+e+quero+agendar+minha+conversa+estratégica"
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
      </section>

      <footer className="section-padding premium-footer bg-premium-footer" style={{ backgroundImage: `url(${metodoFooterBg})`, color: 'white', textAlign: 'center' }}>
        <img src={logo} alt="Logo VM" style={{ width: '180px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>© 2026 Vinícius Matoba. Estratégia Digital. Todos os direitos reservados.</p>
        <Link to="/login" className="footer-login-link" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--accent-green)', textDecoration: 'none', fontSize: '0.85rem' }}>
          Acesso Agência
        </Link>
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
      image: metodoCicloImg,
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
            <img src={heroHomeNewImg} alt="Vinícius Matoba" className="bio-profile-img" />
          </div>
          <div className="bio-profile-text">
            <h1 className="bio-name">Vinícius Matoba</h1>
            <p className="bio-description">
              Estrategista digital para negócios locais. <br/> Ajudo empresas a escalarem com previsibilidade através de processos validados e decisões orientadas por dados.
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
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/metodo-vm" element={<LandingPage />} />
        <Route path="/linknabio" element={<BioLink />} />
        <Route path="/login" element={<VMLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        {/* Redirect old pages to home for a cleaner experience */}
        <Route path="/metodo" element={<LandingPage />} />
        <Route path="/reuniao-estrategica" element={<LandingPage />} />
        <Route path="/diagnostico-estrategico" element={<LandingPage />} />
        <Route path="/ferramenta-diagnostico" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
