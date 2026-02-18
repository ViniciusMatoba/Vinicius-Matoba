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
    title: 'DIAGNOSTICAR',
    description: 'Análise de Bio, Instagram e Funil. Objetivo: Identificar onde você perde oportunidades.',
    icon: <Search className="mb-1" style={{ color: '#0F2D3A' }} />
  },
  {
    title: 'POSICIONAR',
    description: 'Definição de Persona, Autoridade e Oferta Clara. Resultado: Deixar de ser "mais um" para virar referência.',
    icon: <Target className="mb-1" style={{ color: '#0F2D3A' }} />
  },
  {
    title: 'PLANEJAR',
    description: 'Linha Editorial e Funil (Atração -> Relacionamento -> Venda).',
    icon: <Briefcase className="mb-1" style={{ color: '#0F2D3A' }} />
  },
  {
    title: 'EXECUTAR',
    description: 'Operação, Roteiros e Gestão Estratégica.',
    icon: <Settings className="mb-1" style={{ color: '#0F2D3A' }} />
  },
  {
    title: 'ANALISAR',
    description: 'Acompanhamento de métricas (Alcance, CPL, Conversões).',
    icon: <LineChart className="mb-1" style={{ color: '#0F2D3A' }} />
  },
  {
    title: 'OTIMIZAR',
    description: 'Ajustes contínuos e melhoria de performance a cada ciclo.',
    icon: <TrendingUp className="mb-1" style={{ color: '#0F2D3A' }} />
  }
];

function VmModal({ isOpen, onClose }) {
  const [current, setCurrent] = useState(0);

  if (!isOpen) return null;

  const next = () => setCurrent((prev) => (prev + 1) % VM_STEPS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + VM_STEPS.length) % VM_STEPS.length);

  const isLast = current === VM_STEPS.length - 1;

  return (
    <div className="vm-modal-overlay" onClick={onClose}>
      <div className="vm-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="vm-modal-close" onClick={onClose}><X size={24} /></button>

        <div className="vm-modal-body">
          <div className="vm-step-counter">Etapa {current + 1} de 6</div>

          <div className="vm-slide-container">
            <button className="vm-nav-arrow left" onClick={prev}><ChevronLeft size={32} /></button>

            <div className="vm-slide-content">
              <div className="vm-icon-box">{VM_STEPS[current].icon}</div>
              <h2 className="vm-slide-title">{VM_STEPS[current].title}</h2>
              <p className="vm-slide-text">{VM_STEPS[current].description}</p>

              {isLast && (
                <div className="vm-last-slide-footer">
                  <p className="vm-valor-resumo">"Não criamos posts. Aplicamos um processo estruturado de crescimento"</p>
                  <a
                    href="https://wa.me/5519984522494?text=Quero+meu+Diagnóstico+Estratégico"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vm-cta-btn"
                  >
                    Quero meu Diagnóstico Estratégico
                  </a>
                </div>
              )}
            </div>

            <button className="vm-nav-arrow right" onClick={next}><ChevronRight size={32} /></button>
          </div>
        </div>

        <div className="vm-progress-dots">
          {VM_STEPS.map((_, idx) => (
            <div key={idx} className={`vm-dot ${idx === current ? 'active' : ''}`} onClick={() => setCurrent(idx)} />
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

      <VmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <footer className="section-padding" style={{ backgroundColor: '#0F2D3A', color: 'white', textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <p style={{ opacity: 0.6 }}>© 2026 VM Estratégia Digital. Todos os direitos reservados.</p>
      </footer>
    </div >
  )
}

function BioLink() {
  const [isVmModalOpen, setIsVmModalOpen] = useState(false);

  const cards = [
    {
      title: "Solicitar Diagnóstico Estratégico",
      subtitle: "Descubra os gargalos que impedem seu lucro.",
      image: "https://images.unsplash.com/photo-1551288049-bbda48658a7d?q=80&w=800",
      link: "https://wa.me/5519984522494?text=Quero+um+diagnóstico+estratégico",
      isModal: false
    },
    {
      title: "Crescimento Estruturado — Método VM",
      subtitle: "Posicionamento, conteúdo e tráfego por dados.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
      link: "#",
      isModal: true
    },
    {
      title: "Mentoria Estratégica 1:1",
      subtitle: "O próximo nível do seu posicionamento de elite.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2959210?q=80&w=800",
      link: "https://wa.me/5519984522494?text=Quero+saber+mais+sobre+a+Mentoria",
      isModal: false
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
    <div className="bio-container">
      {/* 1. TOPO DE AUTORIDADE */}
      <header className="bio-header">
        <div className="bio-profile-card">
          <div className="bio-profile-wrapper">
            <img src={profileImg} alt="Vinícius Matoba" className="bio-profile-img" />
          </div>
          <div className="bio-profile-text">
            <h1 className="bio-name">Vinícius Matoba</h1>
            <p className="bio-description">
              Estrategista digital para negócios locais. Estruturo crescimento previsível através do Método VM — posicionamento, conteúdo e tráfego orientado por dados.
            </p>
          </div>
        </div>
      </header>

      {/* 2. CARDS VISUAIS "FORMATO 2026" */}
      <main className="bio-main">
        <div className="bio-cards-grid">
          {cards.map((card, idx) => (
            card.isModal ? (
              <div key={idx} onClick={() => setIsVmModalOpen(true)} className="bio-card" style={{ cursor: 'pointer' }}>
                <div className="bio-card-bg" style={{ backgroundImage: `url(${card.image})` }}></div>
                <div className="bio-card-overlay"></div>
                <div className="bio-card-content">
                  <h2 className="bio-card-title">{card.title}</h2>
                  <p className="bio-card-subtitle">{card.subtitle}</p>
                </div>
              </div>
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

      {/* Botão Flutuante WhatsApp */}
      <a
        href="https://wa.me/5519984522494"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-btn"
        title="Falar no WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      <VmModal isOpen={isVmModalOpen} onClose={() => setIsVmModalOpen(false)} />
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

export default App;
