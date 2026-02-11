import React, { useState } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import './App.css'
import logo from './assets/logo.png'
import profileImg from './assets/profile.jpeg'

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
  X,
  ChevronLeft
} from 'lucide-react'

const VM_STEPS = [
  {
    number: '01',
    title: 'Diagnóstico Estratégico',
    description: 'Análise de perfil, concorrentes e mapeamento técnico de gargalos.',
    result: 'Clareza total do plano.',
    icon: <Search className="mb-1" style={{ color: '#0F2D3A' }} />,
    cta: 'Iniciar Diagnóstico'
  },
  {
    number: '02',
    title: 'Posicionamento & Estratégia',
    description: 'Definição de persona, proposta de valor e funil de vendas direto.',
    result: 'Autoridade imediata.',
    icon: <Target className="mb-1" style={{ color: '#0F2D3A' }} />,
    cta: 'Definir Estratégia'
  },
  {
    number: '03',
    title: 'Planejamento de Conteúdo',
    description: 'Linha editorial e calendário focado 100% em conversão.',
    result: 'Conteúdo que gera clientes.',
    icon: <Briefcase className="mb-1" style={{ color: '#0F2D3A' }} />,
    cta: 'Planejar Conteúdo'
  },
  {
    number: '04',
    title: 'Execução & Gestão',
    description: 'Criação de pautas, legendas e presença consistente de marca.',
    result: 'Presença profissional.',
    icon: <Settings className="mb-1" style={{ color: '#0F2D3A' }} />,
    cta: 'Contratar Gestão'
  },
  {
    number: '05',
    title: 'Aquisição (Tráfego Pago)',
    description: 'Campanhas de Meta Ads focadas em público local e leads qualificados.',
    result: 'Fluxo de clientes constante.',
    icon: <TrendingUp className="mb-1" style={{ color: '#0F2D3A' }} />,
    cta: 'Escalar Tráfego'
  },
  {
    number: '06',
    title: 'Análise & Otimização',
    description: 'Relatórios mensais de performance e ajustes contínuos de rota.',
    result: 'Crescimento sustentável.',
    icon: <LineChart className="mb-1" style={{ color: '#0F2D3A' }} />,
    cta: 'Ver Relatórios'
  }
];

function MethodologyModal({ isOpen, onClose }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  if (!isOpen) return null;

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  const next = () => setCurrent((prev) => (prev + 1) % VM_STEPS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + VM_STEPS.length) % VM_STEPS.length);

  return (
    <div className="method-modal-overlay" onClick={onClose}>
      <div
        className="method-modal-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button className="modal-close-btn" onClick={onClose}><X size={32} /></button>

        <div className="modal-carousel-container">
          <button className="nav-btn prev" onClick={prev}><ChevronLeft size={36} /></button>

          <div className="modal-step-card">
            <span className="modal-step-number">{VM_STEPS[current].number}</span>
            <div className="modal-icon-wrapper">
              {VM_STEPS[current].icon}
            </div>
            <h3 className="modal-step-title">{VM_STEPS[current].title}</h3>
            <p className="modal-step-description">{VM_STEPS[current].description}</p>
            <div className="modal-step-result">
              <strong>Resultado:</strong> {VM_STEPS[current].result}
            </div>
            <Link to="/linknabio" onClick={onClose} className="btn-card-elite mt-2">
              {VM_STEPS[current].cta} <ChevronRight size={14} />
            </Link>
          </div>

          <button className="nav-btn next" onClick={next}><ChevronRight size={36} /></button>
        </div>

        <div className="modal-navigation-dots">
          {VM_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="landing-wrapper">
      {/* SECTION: HERO & DATA BANNER */}
      <section className="hero-container">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Crescimento real não vem de seguidores.<br />
            Vem de estratégia e aquisição de clientes.
          </h1>
          <p className="hero-text">
            Estar presente nas redes é obrigatório — mas não basta.
            63,9% da população mundial usa redes sociais. No Brasil, o Instagram é o canal de maior oportunidade local.
          </p>
          <div className="hero-source">Fonte: SmartInsights / Hootsuite.</div>
          <div style={{ marginTop: '3rem' }}>
            <a
              href="https://wa.me/5519984522494?text=Olá!+Vi+seu+site+e+quero+agendar+um+diagnóstico+estratégico"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              AGENDE seu Diagnóstico Estratégico <ChevronRight size={18} style={{ marginLeft: '8px' }} />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION: SOBRE (ELITE MODE) */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="intelligence-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center' }}>
          <div className="photo-container">
            <div className="photo-frame">
              <img src={profileImg} alt="Vinícius Matoba" className="photo-frame-img" />
            </div>
          </div>
          <div style={{ paddingLeft: '2rem' }}>
            <h3 className="consultative-label">ESTRATEGISTA DIGITAL</h3>
            <h2 className="mb-2">Muitos sabem apertar botões. Poucos entendem de negócios.</h2>
            <div className="consultative-text">
              <p className="mb-1">
                Meu nome é <strong>Vinícius Matoba</strong> e minha atuação foca no seu lucro.
                Mais do que gerenciar redes, eu estruturo processos que transformam atenção em faturamento.
              </p>
              <p className="mb-1">
                O tráfego pago é o combustível, mas a estratégia é o motor do seu crescimento digital.
                Se você busca escala sustentável fundamentada em dados reais, <strong>estamos alinhados</strong>.
              </p>
              <p className="mb-2" style={{ fontWeight: 600, color: '#0F2D3A' }}>
                "Meu trabalho não é postar no Instagram. É estruturar um processo contínuo de aquisição de clientes para o seu negócio."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: MÉTODO VM EM 6 ETAPAS */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="text-center mb-4">
          <h3 className="consultative-label">METODOLOGIA DE ELITE</h3>
          <h2>Método VM em 6 Etapas</h2>
          <p style={{ maxWidth: '700px', margin: '1rem auto', opacity: 0.7 }}>
            Um ecossistema completo desenhado para transformar sua presença digital em uma máquina de vendas.
          </p>
          <button className="btn-understand" onClick={() => setIsModalOpen(true)}>
            <Eye size={18} /> Entenda como funciona
          </button>
        </div>

        <div className="footer-benchmarks">
          Benchmarks baseados em Hootsuite, SproutSocial e metodologias de Pedro Sobral/Rafael Kiso.
        </div>
      </section>

      <MethodologyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <footer className="section-padding" style={{ backgroundColor: '#0F2D3A', color: 'white', textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <p style={{ opacity: 0.6 }}>© 2026 VM Estratégia Digital. Todos os direitos reservados.</p>
      </footer>
    </div >
  )
}

function BioLink() {
  return (
    <div className="container-full">
      <header className="header-compact">
        <div className="profile-image-compact">
          <img src={profileImg} alt="Vinícius Matoba" className="profile-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1 className="profile-name-bio">Vinícius Matoba</h1>
        <p className="profile-specialty-bio">Estrategista Digital de Alta Performance</p>
      </header>

      <main className="links-compact">
        <div className="links-box">
          {/* Site */}
          <a
            href="/"
            className="link-button"
          >
            <Briefcase size={18} /> Site
          </a>

          {/* Instagram Profissional */}
          <a
            href="https://www.instagram.com/viniciusmatoba/?igsh=MXgzOGdwcG15bGg2OA=="
            target="_blank"
            className="link-button"
          >
            <Instagram size={18} /> Instagram Profissional
          </a>

          {/* Falar com Estrategista */}
          <a
            href="https://wa.me/5519984522494"
            target="_blank"
            className="link-button"
          >
            <MessageCircle size={18} /> Falar com Estrategista
          </a>

          {/* Agende seu Diagnóstico */}
          <a
            href="https://wa.me/5519984522494?text=Quero+um+diagnóstico+estratégico"
            target="_blank"
            className="link-button btn-animate link-button-highlight"
          >
            <Target size={18} /> AGENDE seu Diagnóstico
          </a>
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/linknabio" element={<BioLink />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export default App
