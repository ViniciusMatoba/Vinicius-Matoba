import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import './App.css'
import './Navigation.css'
import './Method.css'
import logo from './assets/logo.png'
import heroHomeNewImg from './assets/hero-home-new.png'
import bioLinkBg from './assets/bio-link-bg.png'
import metodoCicloImg from './assets/metodo-ciclo.jpeg.png'
import metodoHeroBg from './assets/metodo-hero-bg.jfif'
import metodoFooterBg from './assets/metodo-footer-bg.png'
import perfilImg from './assets/perfil.jpg'
import InteractiveDiagnosis from './InteractiveDiagnosis';

import {
  MessageCircle,
  TrendingUp,
  LineChart,
  Target,
  Search,
  Briefcase,
  Check,
  X
} from 'lucide-react'

// --- GLOBAL COMPONENTS ---

function PremiumNav() {
  const location = useLocation();
  const backToLinksPaths = ['/', '/metodo-vm', '/reuniao-estrategica', '/diagnostico'];

  return (
    <nav className="premium-nav-bar">
      <div className="nav-container">
        {backToLinksPaths.includes(location.pathname) ? (
          <Link to="/linknabio" className="nav-back-link">
            Retornar para Links
          </Link>
        ) : (
          <Link to="/" className="nav-brand">
            <img src={logo} alt="Vinícius Matoba" className="nav-logo" style={{ opacity: 1, visibility: 'visible', filter: 'brightness(0)' }} />
          </Link>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="section-padding premium-footer bg-premium-footer" style={{ backgroundImage: `url(${metodoFooterBg})`, color: 'white', textAlign: 'center' }}>
      <img src={logo} alt="Logo VM" style={{ width: '180px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
      <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>© 2026 Vinícius Matoba. Estratégia Digital. Todos os direitos reservados.</p>
    </footer>
  );
}

function FloatingCTA() {
  return (
    <a href="https://wa.me/5519984522494" className="floating-cta-expanded" aria-label="WhatsApp">
      <MessageCircle size={24} />
      <span>Conversar Agora</span>
    </a>
  );
}

// --- SHARED SECTIONS ---

function HeroSection() {
  return (
    <section className="premium-hero-section" style={{ backgroundColor: '#f8fafc' }}>
      <div className="hero-overlay-soft"></div>
      <div className="container-premium hero-grid-premium">
        <div className="hero-content-left">
          <h1 className="hero-title-premium">Estratégia antes da postagem.</h1>
          <p className="hero-subtitle-premium">
            Transformo presença digital em crescimento previsível <br className="desktop-only-br" /> através de <strong>estratégia, processos e decisões orientadas por dados.</strong>
          </p>
          <div className="hero-buttons-wrapper">
            <Link to="/reuniao-estrategica" className="btn-vm-green-large">Agendar Reunião Estratégica</Link>
          </div>
        </div>
        <div className="hero-content-right">
          <div className="hero-image-frame">
            <img src={heroHomeNewImg} alt="Vinícius Matoba" className="hero-img-consultant" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketProblemSection() {
  return (
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
  );
}

function AboutSection() {
  return (
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
  );
}

const VM_STEPS = [
  { 
    title: 'DIAGNOSTICAR', 
    number: '1', 
    description: 'Entender o cenário atual e identificar gargalos.',
    subtitle: 'Primeiro entendemos o cenário real',
    details: ["Perfil do Instagram", "Bio, nome e clareza da oferta", "Conteúdo atual", "Engajamento", "Concorrentes", "Funil de vendas", "Processo comercial", "Gargalos de conversão"],
    objective: "Identificar exatamente onde você perde oportunidades hoje.",
    highlight: "Sem diagnóstico, qualquer ação vira aposta."
  },
  { 
    title: 'POSICIONAR', 
    number: '2', 
    description: 'Definir como o negócio deve ser percebido pelo mercado.',
    subtitle: 'Definimos como o mercado deve enxergar você',
    details: ["Público-alvo e persona", "Proposta de valor", "Diferenciais", "Autoridade", "Tom de voz", "Promessa principal", "Estrutura de bio", "Oferta clara"],
    result: ["Você deixa de ser 'mais um'", "Vira referência no seu nicho"],
    highlight: "Posicionamento certo reduz objeção de preço."
  },
  { 
    title: 'PLANEJAR', 
    number: '3', 
    description: 'Construir um plano estratégico de comunicação e crescimento.',
    subtitle: 'Transformamos estratégia em plano prático',
    details: ["Linha editorial", "Pilares de conteúdo", "Funil (atração → relacionamento → venda)", "Calendário mensal", "Ideias de posts", "Roteiros", "Copies", "CTAs", "Frequência ideal"],
    highlight: "Você não posta por inspiração. Você posta com intenção."
  },
  { 
    title: 'EXECUTAR', 
    number: '4', 
    description: 'Colocar o plano em prática com consistência.',
    subtitle: 'Colocamos o plano em prática. Aqui começa a operação.',
    details: ["Direção estratégica do conteúdo", "Criação de pautas e roteiros", "Orientação de gravação", "Organização do feed", "Stories diários", "Acompanhamento semanal", "Suporte criativo", "Gestão estratégica de campanhas"],
    objective: "Garantir consistência, profissionalismo e autoridade.",
    highlight: "Sem execução, estratégia vira intenção."
  },
  { 
    title: 'ANALISAR', 
    number: '5', 
    description: 'Avaliar dados para entender o que realmente funciona.',
    subtitle: 'Nada é baseado em achismo. Só dados.',
    details: ["Alcance", "Engajamento", "Visitas ao perfil", "Crescimento de seguidores", "Leads / directs", "Cliques no link", "Custo por lead (tráfego)", "Conversões", "Conteúdos campeões"],
    question: "O que realmente está gerando oportunidades de venda?",
    highlight: "Marketing é decisão baseada em dados."
  },
  { 
    title: 'OTIMIZAR', 
    number: '6', 
    description: 'Ajustar continuamente a estratégia para evoluir.',
    subtitle: 'Ajuste e melhoria contínua. Com base nos dados:',
    details: ["Ajustamos conteúdos", "Repetimos formatos que funcionam", "Melhoramos roteiros", "Testamos novas abordagens", "Refinamos posicionamento", "Cortamos o que não gera resultado"],
    objective: "Reduzir desperdício e aumentar performance a cada ciclo.",
    highlight: "O crescimento vem da otimização constante."
  }
];

function MethodSection() {
  const [selectedStep, setSelectedStep] = React.useState(null);

  return (
    <>
      <section id="metodo" className="premium-section bg-metodo-hero" style={{ backgroundImage: `url(${metodoHeroBg})` }}>
        <div className="container-premium text-center">
          <h2 className="premium-section-title max-width-1000 margin-auto">Método VM &mdash; Ciclo de Crescimento Digital</h2>
          <p className="premium-section-text max-width-800 margin-auto mt-4 mb-5">
            Um processo estratégico contínuo que organiza o crescimento digital em seis etapas. <strong>Clique em cada etapa para ver os detalhes.</strong>
          </p>
          <div className="metodo-ciclo-photo-container mb-5">
            <img src={metodoCicloImg} alt="Método VM" className="margin-auto" style={{ maxWidth: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', backgroundColor: 'white', padding: '1rem' }} />
          </div>
        </div>
      </section>
      <section className="premium-section bg-base-white">
        <div className="container-premium">
          <h2 className="premium-section-title text-center mb-5">Como funciona cada etapa do ciclo</h2>
          <div className="benefits-premium-grid">
            {VM_STEPS.map((step, index) => (
              <div 
                key={index} 
                className="benefit-premium-card border-navy hover-glow relative-step-card clickable-step-card"
                onClick={() => setSelectedStep(step)}
              >
                <div className="step-number-bg">{step.number}</div>
                <h3 className="benefit-title-caps">{step.title}</h3>
                <p className="mt-2 text-gray">{step.description}</p>
                <span className="card-click-hint">Clique para saber mais</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedStep && (
        <div className="method-modal-overlay" onClick={() => setSelectedStep(null)}>
          <div className="method-modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedStep(null)}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <span className="modal-step-tag">Etapa {selectedStep.number}</span>
              <h2 className="modal-title">{selectedStep.title}</h2>
              <p className="modal-subtitle">{selectedStep.subtitle}</p>
            </div>
            <div className="modal-body">
              <div className="modal-body-grid">
                <div>
                  <span className="modal-info-title">Atividades e Foco:</span>
                  <ul className="modal-details-list">
                    {selectedStep.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  {selectedStep.objective && (
                    <div className="modal-info-box mb-4">
                      <span className="modal-info-title">Objetivo:</span>
                      <p>{selectedStep.objective}</p>
                    </div>
                  )}
                  {selectedStep.result && (
                    <div className="modal-info-box mb-4">
                      <span className="modal-info-title">Resultado:</span>
                      <ul className="modal-details-list">
                        {selectedStep.result.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedStep.question && (
                    <div className="modal-info-box mb-4">
                      <span className="modal-info-title">Pergunta Principal:</span>
                      <p>{selectedStep.question}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-highlight-text">
                {selectedStep.highlight}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DiagnosisSection() {
  return (
    <section id="diagnostico" className="premium-section bg-soft-gray">
      <div className="container-premium text-center">
        <h2 className="premium-section-title mb-3">Diagnóstico Estratégico Online</h2>
        <p className="premium-section-text max-width-800 margin-auto mb-5">
          Uma análise profunda para identificar o que trava seu crescimento hoje e mapear o caminho ideal.
        </p>
        <div className="embedded-diagnosis-wrapper">
          <InteractiveDiagnosis isEmbedded={true} />
        </div>
      </div>
    </section>
  );
}

function MeetingSection() {
  return (
    <section id="agendar" className="premium-section bg-navy text-white text-center">
      <div className="container-premium">
        <h2 className="premium-section-title text-white">Início do Diagnóstico</h2>
        <p className="premium-section-text text-white opacity-90 max-width-800 margin-auto mt-3 mb-4">
          A reunião estratégica é o início do processo para eu entender a sua situação atual, mapear as dores do seu negócio e os desejos dos seus clientes, construindo a base sólida para escalarmos com estratégia.
        </p>
        <p className="premium-section-text text-white opacity-70 max-width-800 margin-auto mb-5" style={{ fontSize: '1rem' }}>
          Este é o primeiro passo para construirmos a base necessária para o seu diagnóstico de crescimento.
        </p>
        <a href="https://wa.me/5519984522494?text=Olá+Vinícius,+completei+o+diagnóstico+e+quero+agendar+minha+conversa+estratégica" target="_blank" rel="noopener noreferrer" className="btn-vm-green-large">
          Agendar Reunião Estratégica
        </a>
        <div className="info-text-mini text-white opacity-90 mt-5" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span>Duração: 45 minutos</span>
          <span>Formato: Online</span>
          <span>Custo: Gratuito</span>
        </div>
      </div>
    </section>
  );
}

// --- PAGE LAYOUTS ---

function LandingPage() {
  return (
    <div className="landing-wrapper">
      <PremiumNav />
      <HeroSection />
      <MarketProblemSection />
      <AboutSection />
      <DiagnosisSection />
      <MeetingSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}

function MetodoPage() {
  return (
    <div className="landing-wrapper">
      <PremiumNav />
      <div style={{ paddingTop: '80px' }}>
        <MethodSection />
      </div>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

function MeetingPage() {
  return (
    <div className="landing-wrapper">
      <PremiumNav />
      <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <MeetingSection />
      </div>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

function BioLink() {
  const cards = [
    { title: "Eu quero uma Reunião Estratégica", subtitle: "Descubra os gargalos que impedem seu lucro.", image: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=800", link: "/reuniao-estrategica", isInternal: true },
    { title: "Diagnóstico Estratégico Online", subtitle: "Obtenha uma análise gratuita em poucos minutos.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800", link: "/diagnostico", isInternal: true },
    { title: "Crescimento Estruturado — Método VM", subtitle: "Posicionamento, conteúdo e tráfego por dados.", image: metodoCicloImg, link: "/metodo-vm", isInternal: true },
    { title: "Visitar Site Oficial", subtitle: "Conheça meu trabalho, metodologia e história.", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800", link: "/", isInternal: true },
    { title: "Conversar no WhatsApp", subtitle: "Fale diretamente com Vinícius Matoba.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800", link: "https://wa.me/5519984522494" }
  ];

  return (
    <div className="bio-container" style={{ backgroundImage: `url(${bioLinkBg})` }}>
      <div className="bio-overlay-bg"></div>
      <header className="bio-header">
        <div className="bio-profile-card">
          <div className="bio-profile-wrapper">
            <img src={perfilImg} alt="Vinícius Matoba" className="bio-profile-img" />
          </div>
          <div className="bio-profile-text">
            <h1 className="bio-name">Vinícius Matoba</h1>
            <p className="bio-description">Estrategista digital para negócios locais. <br/> Ajudo empresas a escalarem com previsibilidade através de processos validados.</p>
          </div>
        </div>
      </header>
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
        <div className="footer-triangle"><img src={logo} alt="Logo" className="logo-white" /></div>
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
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/metodo-vm" element={<MetodoPage />} />
        <Route path="/reuniao-estrategica" element={<MeetingPage />} />
        <Route path="/diagnostico" element={<div className="landing-wrapper"><PremiumNav /><div style={{paddingTop: '80px'}}><InteractiveDiagnosis /></div><Footer /></div>} />
        <Route path="/linknabio" element={<BioLink />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
