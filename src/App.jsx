import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import './App.css'
import logo from './assets/logo.png'
import profileImg from './assets/profile.jpeg'
import heroHomeBg from './assets/hero-home-new.png'
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
  X
} from 'lucide-react'

const VM_STEPS = [
  {
    title: '1. Diagnosticar',
    description: 'Entender cenário, posicionamento, público e oportunidades reais.',
    icon: <Search className="mb-1" style={{ color: '#0F2D3A' }} />
  },
  {
    title: '2. Posicionar',
    description: 'Definir clareza de mercado, proposta de valor e diferenciação.',
    icon: <Target className="mb-1" style={{ color: '#0F2D3A' }} />
  },
  {
    title: '3. Planejar',
    description: 'Organizar estratégia de conteúdo, funil e aquisição.',
    icon: <Briefcase className="mb-1" style={{ color: '#0F2D3A' }} />
  },
  {
    title: '4. Executar',
    description: 'Aplicar conteúdo e tráfego com direção clara.',
    icon: <Settings className="mb-1" style={{ color: '#0F2D3A' }} />
  },
  {
    title: '5. Analisar',
    description: 'Medir dados, comportamento e desempenho real.',
    icon: <LineChart className="mb-1" style={{ color: '#0F2D3A' }} />
  },
  {
    title: '6. Otimizar',
    description: 'Ajustar continuamente para gerar previsibilidade.',
    icon: <TrendingUp className="mb-1" style={{ color: '#0F2D3A' }} />
  }
];

function LandingPage() {

  return (
    <div className="landing-wrapper">
      {/* SECTION: STRATEGIC HERO (FIRST FOLD) */}
      <section className="strategic-hero">
        <div className="container-strategic strategic-hero-grid">
          <div className="strategic-hero-left">
            <h1 className="hero-headline">
              Estratégia antes da postagem.
            </h1>
            <p className="hero-subheadline">
              Transformo presença digital em crescimento previsível através do <strong>Método VM — Ciclo de Crescimento Digital.</strong>
            </p>

            <div className="hero-cta-area">
              <a
                href="https://wa.me/5519984522494?text=Olá!+Vi+seu+site+e+quero+agendar+um+diagnóstico+estratégico"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-vm-strategic"
              >
                Agendar Diagnóstico Estratégico
              </a>
              <p className="hero-cta-subtext">
                Descubra o que está travando o crescimento do seu negócio.
              </p>
            </div>
          </div>

          <div className="strategic-hero-right">
            <div className="hero-image-wrapper">
              <img src={heroHomeBg} alt="Vinícius Matoba" className="hero-main-img" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE MARKET PROBLEM */}
      <section className="strategic-section market-problem">
        <div className="container-strategic">
          <h2 className="strategic-title">
            A maioria das empresas não tem um problema de marketing. <span className="text-highlight">Tem um problema de estratégia.</span>
          </h2>
          <div className="strategic-text-content">
            <p>Muitos negócios estão presentes nas redes sociais.</p>
            <ul className="strategic-list-minimal">
              <li>Postam com frequência.</li>
              <li>Criam conteúdo.</li>
              <li>Investem tempo tentando crescer.</li>
            </ul>
            <p>Mas mesmo assim o crescimento não acontece.</p>
            <p className="emphasis-text">Isso acontece porque executam antes de entender:</p>
            <ul className="strategic-list-minimal">
              <li>quem querem alcançar,</li>
              <li>como devem se posicionar,</li>
              <li>qual estratégia sustenta o crescimento.</li>
            </ul>
            <p className="final-statement">Sem estratégia, marketing vira tentativa.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — ABOUT VINÍCIUS MATOBA */}
      <section className="strategic-section about-vinicius bg-soft">
        <div className="container-strategic bio-grid-strategic">
          <div className="bio-photo-area">
            <div className="premium-photo-wrapper">
              <img src={profileImg} alt="Vinícius Matoba" className="premium-bio-img" />
            </div>
          </div>
          <div className="bio-text-area">
            <h2 className="strategic-title">Estratégia digital orientada por método.</h2>
            <div className="strategic-text-content">
              <p>Sou Vinícius Matoba, estrategista digital.</p>
              <p>Depois de anos trabalhando com recrutamento, comportamento e tomada de decisão, entendi algo essencial:</p>
              <p className="insight-box">
                "as pessoas não escolhem apenas com lógica. Elas escolhem com percepção."
              </p>
              <p>Hoje aplico esse entendimento para ajudar empresas e profissionais a transformarem presença digital em crescimento real.</p>
              <p>Meu trabalho não começa com postagens.</p>
              <p className="text-strong">Começa com estratégia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — MÉTODO VM */}
      <section className="strategic-section metodo-vm-section">
        <div className="container-strategic">
          <div className="section-header-center">
            <h2 className="strategic-title">Método VM — Ciclo de Crescimento Digital</h2>
            <p className="strategic-subtitle">Um processo estratégico contínuo que organiza o crescimento digital em seis etapas.</p>
          </div>

          <div className="metodo-grid-premium">
            {[
              { id: '1', title: 'DIAGNOSTICAR', desc: 'Entender o cenário atual e identificar gargalos.' },
              { id: '2', title: 'POSICIONAR', desc: 'Definir como o negócio deve ser percebido pelo mercado.' },
              { id: '3', title: 'PLANEJAR', desc: 'Construir um plano estratégico de comunicação e crescimento.' },
              { id: '4', title: 'EXECUTAR', desc: 'Aplicar a estratégia com consistência.' },
              { id: '5', title: 'ANALISAR', desc: 'Avaliar dados e resultados.' },
              { id: '6', title: 'OTIMIZAR', desc: 'Melhorar continuamente a estratégia.' }
            ].map((step) => (
              <div key={step.id} className="metodo-card-premium">
                <span className="step-number">{step.id}</span>
                <h3 className="step-title-premium">{step.title}</h3>
                <p className="step-desc-premium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHO THIS IS FOR */}
      <section className="strategic-section target-audience bg-soft">
        <div className="container-strategic">
          <h2 className="strategic-title center-text">Para quem esse trabalho faz sentido</h2>
          <div className="list-container-center">
            <ul className="strategic-check-list">
              <li>Profissionais que querem construir autoridade</li>
              <li>Negócios locais que querem crescer com previsibilidade</li>
              <li>Empresas que já tentaram marketing digital sem estratégia</li>
              <li>Pessoas que querem parar de postar sem direção</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6 — WHAT CHANGES WITH STRATEGY */}
      <section className="strategic-section transformation">
        <div className="container-strategic">
          <h2 className="strategic-title center-text">O que muda quando existe estratégia</h2>
          <div className="transformation-grid">
            {[
              'Clareza de posicionamento',
              'Conteúdo com objetivo',
              'Comunicação alinhada ao público certo',
              'Crescimento mais previsível',
              'Decisões orientadas por dados'
            ].map((item, idx) => (
              <div key={idx} className="transformation-item">
                <Check size={20} className="text-green" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — TRUST SECTION */}
      <section className="strategic-section trust-section bg-navy text-white">
        <div className="container-strategic text-center">
          <h2 className="strategic-title text-white">Estratégia aplicada com foco em resultado</h2>
          <div className="trust-content">
            <p className="large-quote">"Você não precisa postar mais."</p>
            <p className="trust-subtext">Precisa entender melhor:</p>
            <div className="trust-pokes">
              <span>seu público</span>
              <span className="dot">•</span>
              <span>seu posicionamento</span>
              <span className="dot">•</span>
              <span>sua estratégia</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CALL TO ACTION */}
      <section className="strategic-section final-cta-section">
        <div className="container-strategic text-center">
          <h2 className="strategic-title">O primeiro passo é entender o seu cenário.</h2>
          <div className="final-cta-content">
            <p className="final-cta-intro">No diagnóstico estratégico analisamos:</p>
            <div className="final-cta-bullets">
              <span>seu posicionamento</span>
              <span>sua comunicação</span>
              <span>suas oportunidades de crescimento</span>
            </div>

            <div className="cta-wrapper-final">
              <a
                href="https://wa.me/5519984522494?text=Olá!+Vi+seu+site+e+quero+agendar+um+diagnóstico+estratégico"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-vm-strategic"
              >
                Agendar Diagnóstico Estratégico
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="vm-footer-access">
        <Link to="/login" className="btn-access-backstage">
          <span>Acessar Agência VM</span>
          <ChevronRight size={16} />
        </Link>
      </div>
      <footer className="section-padding" style={{ backgroundColor: '#0F2D3A', color: 'white', textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <p style={{ opacity: 0.6 }}>© 2026 VM Estratégia Digital. Todos os direitos reservados.</p>
      </footer>

      {/* FLOATING ACTION BUTTON */}
      <a
        href="https://wa.me/5519984522494?text=Olá!+Vi+seu+site+e+quero+agendar+um+diagnóstico+estratégico"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Agendar via WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
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
      <footer className="section-padding" style={{ backgroundColor: '#0F2D3A', color: 'white', textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <p style={{ opacity: 0.6 }}>© 2026 VM Estratégia Digital. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

function MetodoVMPage() {
  return (
    <div className="metodo-vm-page-wrapper">
      <header className="site-mini-header">
        <Link to="/" className="back-link">
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Voltar para o Início
        </Link>
        <img src={logo} alt="Logo VM" className="mini-logo" />
      </header>

      {/* SECTION 1 — HERO */}
      <section className="metodo-hero-strategic">
        <div className="container-strategic text-center">
          <h1 className="strategic-title max-width-1000">Método VM — Ciclo de Crescimento Digital</h1>
          <p className="strategic-subtitle max-width-800">
            Um processo estratégico contínuo para transformar presença digital em crescimento previsível.
          </p>
          <div className="mt-5">
            <p className="highlight-text-navy max-width-800 margin-auto" style={{ fontSize: '1.2rem', fontWeight: '400', lineHeight: '1.8' }}>
              O crescimento digital consistente não acontece por acaso. Ele acontece quando estratégia, posicionamento e execução trabalham de forma organizada.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="strategic-section bg-soft">
        <div className="container-narrow text-center">
          <h2 className="strategic-title">A maioria das estratégias digitais falha por um motivo simples.</h2>
          <div className="strategic-text-content mt-4 max-width-800 margin-auto">
            <p className="text-lg mb-4">A execução vem antes do planejamento.</p>
            <p>Muitos negócios contratam agências, designers e gestores de tráfego esperando um milagre de vendas. Criam posts, sobem campanhas, gravam vídeos. Tudo isso sem responder as perguntas fundamentais do próprio modelo de negócios.</p>
            <p className="emphasis-text font-bold text-navy mt-4">Quando você executa sem estratégia, você gasta dinheiro para atrair o cliente errado.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE CYCLE CONCEPT */}
      <section className="strategic-section bg-navy text-white text-center">
        <div className="container-strategic">
          <h2 className="strategic-title text-white">Crescimento digital é um ciclo.</h2>
          <p className="strategic-subtitle text-white opacity-80 max-width-800 margin-auto mb-5">
            O Método VM não é uma campanha de marketing pontual. É um sistema cíclico projetado para melhorar continuamente a aquisição de clientes do seu negócio.
          </p>

          <div className="cycle-visualizer-premium">
            <div className="cycle-track">
              {['Diagnosticar', 'Posicionar', 'Planejar', 'Executar', 'Analisar', 'Otimizar'].map((step, idx) => (
                <div key={idx} className="cycle-step-badge">
                  <span className="step-num">{idx + 1}</span>
                  <span className="step-name">{step}</span>
                  {idx < 5 && <ChevronRight className="cycle-arrow text-green" size={24} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — THE 6 STEPS GRID */}
      <section className="strategic-section">
        <div className="container-strategic">
          <h2 className="strategic-title text-center mb-5">O Ciclo na Prática</h2>
          <div className="six-step-grid-premium">
            {VM_STEPS.map((step, index) => (
              <div key={index} className="premium-step-card">
                <div className="step-card-header">
                  <div className="icon-wrapper-green">{step.icon}</div>
                  <h3 className="step-card-title">{step.title}</h3>
                </div>
                <p className="step-card-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — BENEFITS */}
      <section className="strategic-section bg-soft">
        <div className="container-narrow">
          <h2 className="strategic-title text-center mb-5">O que muda quando existe método</h2>
          <ul className="benefit-list-premium">
            <li className="benefit-item">
              <Check size={28} className="text-green flex-shrink-0 mt-1" />
              <div>
                <strong>Clareza Organizacional</strong>
                <p>Você sabe exatamente o que está sendo feito, por que está sendo feito e o que esperar de resultado em cada etapa.</p>
              </div>
            </li>
            <li className="benefit-item">
              <Check size={28} className="text-green flex-shrink-0 mt-1" />
              <div>
                <strong>Atração do Cliente Certo</strong>
                <p>A comunicação para de atrair curiosos e começa a conversar com quem tem real potencial de compra.</p>
              </div>
            </li>
            <li className="benefit-item">
              <Check size={28} className="text-green flex-shrink-0 mt-1" />
              <div>
                <strong>Previsibilidade de Crescimento</strong>
                <p>Ações pontuais dão lugar a um sistema de aquisição validado, medido e otimizado mês a mês.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 6 — HOW THE METHOD IS APPLIED */}
      <section className="strategic-section text-center">
        <div className="container-narrow">
          <h2 className="strategic-title">Como começamos a aplicar o método</h2>
          <p className="strategic-subtitle max-width-800 margin-auto mt-4 mb-5">
            Nenhuma implementação do Método VM começa com execução. O primeiro passo irrevogável é o Diagnóstico Estratégico.
          </p>
          <div className="diagnosis-highlight-box">
            <Search size={48} className="text-green mb-3" />
            <h3>Passo 0: Diagnóstico de Cenário</h3>
            <p>Antes de definir qualquer plano de ação, precisamos olhar para onde a sua empresa está hoje, entender a fundo o seu modelo de negócios e identificar os gargalos atuais e ocultos.</p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="strategic-section final-cta-diagnostico bg-navy text-white text-center">
        <div className="container-narrow">
          <h2 className="strategic-title text-white">O primeiro passo é entender o seu cenário.</h2>
          <p className="strategic-subtitle text-white opacity-80 mb-5">
            Agende um diagnóstico estratégico para avaliarmos se o Método VM é o encaixe ideal para o momento da sua empresa.
          </p>
          <div className="cta-final-box-diag">
            <a
              href="https://wa.me/5519984522494?text=Olá!+Li+sobre+o+Método+VM+e+quero+agendar+um+diagnóstico"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-vm-strategic scale-large"
            >
              Agendar Diagnóstico Estratégico
            </a>
            <div className="info-text-mini text-white opacity-70 mt-4">
              <span>Duração: 45 minutos</span>
              <span className="separator text-green">•</span>
              <span>Online e Gratuito</span>
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

      <footer className="footer-triangle-container" style={{ marginTop: '0', backgroundColor: 'var(--base-white)' }}>
        <div className="footer-triangle">
          <img src={logo} alt="Logo" className="logo-white" />
        </div>
      </footer>
    </div>
  );
}

function DiagnosticoPage() {
  return (
    <div className="diagnostico-page-wrapper">
      <header className="site-mini-header">
        <Link to="/" className="back-link">
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Voltar para o Início
        </Link>
        <img src={logo} alt="Logo VM" className="mini-logo" />
      </header>

      {/* SECTION 1 — HERO */}
      <section className="diagnostico-hero">
        <div className="container-strategic text-center">
          <h1 className="strategic-title">Diagnóstico Estratégico de Crescimento Digital</h1>
          <p className="strategic-subtitle max-width-800">
            Uma análise estruturada para entender o que está travando o crescimento do seu negócio e quais caminhos estratégicos podem destravar resultados.
          </p>
          <div className="cta-wrapper-diagnostico">
            <a
              href="https://wa.me/5519984522494?text=Olá!+Quero+agendar+meu+diagnóstico+estratégico"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-vm-strategic"
            >
              Agendar Diagnóstico Estratégico
            </a>
            <div className="info-text-mini">
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
      <section className="strategic-section bg-soft">
        <div className="container-narrow">
          <h2 className="strategic-title text-center">A maioria das empresas tenta crescer executando antes de entender.</h2>
          <div className="strategic-text-content text-center margin-auto">
            <p className="mb-4">Muitos negócios estão presentes nas redes sociais.</p>
            <div className="pain-list-diagnostico">
              <div className="pain-item-diag">Postam conteúdo.</div>
              <div className="pain-item-diag">Testam campanhas.</div>
              <div className="pain-item-diag">Seguem tendências.</div>
            </div>
            <p className="highlight-text-navy my-4">Mas sem clareza estratégica.</p>
            <div className="result-box-diagnostico">
              <span className="result-label">Resultado:</span>
              <ul className="strategic-list-minimal center-list">
                <li>esforço alto</li>
                <li>retorno baixo</li>
                <li>crescimento inconsistente</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT HAPPENS DURING THE DIAGNOSIS */}
      <section className="strategic-section">
        <div className="container-strategic">
          <div className="two-col-grid">
            <div className="grid-text-side">
              <h2 className="strategic-title">O que acontece durante o diagnóstico estratégico</h2>
              <p className="strategic-subtitle mb-4">Durante a conversa analisamos os principais pontos do seu cenário digital.</p>
              <ul className="strategic-check-list">
                <li>Seu posicionamento atual</li>
                <li>Como seu negócio está sendo percebido</li>
                <li>Sua comunicação digital</li>
                <li>Possíveis gargalos estratégicos</li>
                <li>Oportunidades de crescimento</li>
              </ul>
            </div>
            <div className="grid-visual-side bg-navy-accent">
              <div className="visual-content-placeholder">
                <Target size={80} className="text-green opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT YOU GET FROM THE CALL */}
      <section className="strategic-section bg-soft">
        <div className="container-strategic">
          <h2 className="strategic-title text-center">O que você leva dessa conversa</h2>
          <div className="transformation-grid">
            {[
              { title: 'Clareza sobre seu posicionamento', icon: <Eye size={24} /> },
              { title: 'Identificação de gargalos estratégicos', icon: <TrendingUp size={24} /> },
              { title: 'Direcionamento de crescimento', icon: <Target size={24} /> },
              { title: 'Recomendações práticas', icon: <Settings size={24} /> }
            ].map((item, idx) => (
              <div key={idx} className="transformation-item diag-benefit-card">
                <div className="icon-circle-bg">{item.icon}</div>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 & 6 — WHO THIS IS FOR / NOT FOR */}
      <section className="strategic-section">
        <div className="container-strategic">
          <div className="qualification-grid-premium">
            <div className="qual-box-premium for-box">
              <h2 className="strategic-title">Essa conversa é para você se</h2>
              <ul className="strategic-check-list">
                <li>Quer crescer com estratégia</li>
                <li>Sente que está executando sem clareza</li>
                <li>Quer melhorar posicionamento digital</li>
                <li>Busca crescimento previsível</li>
              </ul>
            </div>
            <div className="qual-box-premium not-for-box">
              <h2 className="strategic-title">Essa conversa pode não ser para você se</h2>
              <ul className="strategic-list-minimal qual-x-list">
                <li className="x-item">Procura apenas alguém para fazer posts</li>
                <li className="x-item">Busca soluções rápidas sem estratégia</li>
                <li className="x-item">Não está disposto a analisar o negócio</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — ABOUT VINÍCIUS MATOBA */}
      <section className="strategic-section bg-soft about-conduct-section">
        <div className="container-strategic flex-center-diag">
          <div className="about-diag-card">
            <div className="about-diag-photo">
              <img src={profileImg} alt="Vinícius Matoba" />
            </div>
            <div className="about-diag-text">
              <h2 className="strategic-title mb-2">Quem conduz o diagnóstico</h2>
              <div className="strategic-text-content">
                <p>Sou Vinícius Matoba, estrategista digital.</p>
                <p>Ajudo empresas e profissionais a transformarem presença digital em crescimento estruturado através do Método VM — Ciclo de Crescimento Digital.</p>
                <p className="emphasis-text text-green">Meu trabalho começa com estratégia antes da execução.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CALL TO ACTION */}
      <section className="strategic-section final-cta-diagnostico bg-navy text-white">
        <div className="container-narrow text-center">
          <h2 className="strategic-title text-white">Vamos analisar o seu cenário?</h2>
          <p className="strategic-subtitle text-white opacity-80 mb-5">Escolha um horário disponível para o diagnóstico estratégico.</p>

          <div className="cta-final-box-diag">
            <a
              href="https://wa.me/5519984522494?text=Olá!+Quero+agendar+meu+diagnóstico+estratégico"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-vm-strategic scale-large"
            >
              Agendar Diagnóstico Estratégico
            </a>
            <div className="info-text-mini text-white opacity-70 mt-3">
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
