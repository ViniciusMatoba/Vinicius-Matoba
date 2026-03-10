import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import './App.css'
import logo from './assets/logo.png'
import profileImg from './assets/profile.jpeg'
import heroBg from './assets/metodo-hero-bg.jfif'
import footerBg from './assets/metodo-footer-bg.png'
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
    <div className="metodo-wrapper" translate="no">
      <header className="site-mini-header">
        <Link to="/" className="back-link">
          <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Voltar para o Início
        </Link>
        <img src={logo} alt="Logo VM" className="mini-logo" />
      </header>
      <section className="metodo-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="metodo-hero-overlay"></div>
        <div className="metodo-hero-content">
          <h1 className="metodo-hero-title">Estratégia, Previsibilidade e Crescimento Digital.</h1>
          <p className="metodo-hero-subtitle">
            Não entregamos apenas postagens. Entregamos um sistema de aquisição de clientes através do Método VM.
          </p>
          <a
            href="https://wa.me/5519984522494?text=Quero+um+Diagnóstico+do+meu+Negócio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Quero um Diagnóstico do meu Negócio
          </a>
        </div>
      </section>

      {/* SECTION: STRATEGIC QUALIFICATION (MOVED FROM HUB) */}
      <section className="strategic-qualification-fold section-padding bg-light">
        <div className="container-narrow">
          <h2 className="strategic-headline text-center mb-5">Para quem é o Método VM</h2>

          <div className="qualification-grid">
            <div className="qualification-card for-whom">
              <h3 className="qual-title">O Método VM é para:</h3>
              <ul className="qual-list">
                <li><Check size={20} className="icon-check" /> Negócios locais que querem parar de depender apenas de indicação</li>
                <li><Check size={20} className="icon-check" /> Profissionais liberais que precisam estruturar aquisição de clientes</li>
                <li><Check size={20} className="icon-check" /> Empresas que já tentaram postar e impulsionar, mas não tiveram previsibilidade</li>
                <li><Check size={20} className="icon-check" /> Quem entende que crescimento exige estratégia e investimento</li>
              </ul>
            </div>

            <div className="qualification-card not-for-whom">
              <h3 className="qual-title">Para quem não é:</h3>
              <ul className="qual-list">
                <li><X size={20} className="icon-cross" /> Quem quer apenas posts ou artes isoladas</li>
                <li><X size={20} className="icon-cross" /> Quem busca crescimento rápido sem estrutura</li>
                <li><X size={20} className="icon-cross" /> Quem não está disposto a investir em aquisição</li>
                <li><X size={20} className="icon-cross" /> Quem espera resultados sem consistência e acompanhamento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="metodo-cycle-section">
        <div className="metodo-section-title">
          <h3 className="consultative-label">O DIFERENCIAL</h3>
          <h2>O Método VM</h2>
          <p className="metodo-cycle-footer">"Nosso método garante que cada ação tenha um propósito. Estratégia + Execução + Análise + Ajuste Contínuo."</p>
        </div>

        <div className="metodo-cycle-grid">
          {VM_STEPS.map((step, index) => (
            <div key={index} className="metodo-step-card">
              <div className="metodo-step-icon">{step.icon}</div>
              <h3 className="metodo-step-title">{index + 1}. {step.title}</h3>
              <p className="metodo-step-text">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="planos" className="metodo-plans-section">
        <div className="metodo-section-title">
          <h3 className="consultative-label">ESTRUTURA</h3>
          <h2 translate="no">Nossos Planos</h2>
        </div>

        <div className="metodo-plans-grid">
          {/* Card 1: Start */}
          <div className="metodo-plan-card">
            <h3 className="metodo-plan-title">Plano Start</h3>
            <p className="metodo-plan-foco">Implementação Estratégica</p>
            <div className="metodo-plan-entregas-title">Entregas</div>
            <ul className="metodo-plan-entregas-list">
              <li>Diagnóstico de cenário</li>
              <li>Ajuste de posicionamento/bio</li>
              <li>Definição de público ideal</li>
              <li>Estruturação de link estratégico</li>
            </ul>
            <div className="metodo-plan-indicado">
              <strong>INDICADO PARA:</strong>
              Quem precisa organizar a casa antes de acelerar.
            </div>
          </div>

          {/* Card 2: Essencial */}
          <div className="metodo-plan-card">
            <h3 className="metodo-plan-title">Plano Essencial</h3>
            <p className="metodo-plan-foco">Direcionamento Mensal</p>
            <div className="metodo-plan-entregas-title">Entregas</div>
            <ul className="metodo-plan-entregas-list">
              <li>Reunião estratégica mensal</li>
              <li>Planejamento de conteúdo direcionado</li>
              <li>Acompanhamento de métricas básicas</li>
              <li>Ajustes progressivos</li>
            </ul>
            <div className="metodo-plan-indicado">
              <strong>INDICADO PARA:</strong>
              Negócios que buscam sair da improvisação com um acompanhamento leve.
            </div>
          </div>

          {/* Card 3: Performance */}
          <div className="metodo-plan-card highlighted">
            <div className="metodo-plan-badge">Mais Recomendado</div>
            <h3 className="metodo-plan-title">Plano Performance</h3>
            <p className="metodo-plan-foco">Crescimento Ativo</p>
            <div className="metodo-plan-entregas-title">Entregas</div>
            <ul className="metodo-plan-entregas-list">
              <li>Estratégia ativa de conteúdo</li>
              <li>Direcionamento de Tráfego Pago</li>
              <li>Análise avançada de comportamento</li>
              <li>Relatórios detalhados e otimização de funis</li>
            </ul>
            <div className="metodo-plan-indicado">
              <strong>INDICADO PARA:</strong>
              Negócios que querem transformar o Instagram em um canal previsível de vendas.
            </div>
          </div>

          {/* Card 4: Autoridade Total */}
          <div className="metodo-plan-card">
            <h3 className="metodo-plan-title">Plano Autoridade Total</h3>
            <p className="metodo-plan-foco">Gestão Avançada</p>
            <div className="metodo-plan-entregas-title">Entregas</div>
            <ul className="metodo-plan-entregas-list">
              <li>Gestão estratégica completa</li>
              <li>Campanhas sazonais</li>
              <li>Análise de CPL (Custo por Lead)</li>
              <li>Atuação da Agência VM como braço estratégico do negócio</li>
            </ul>
            <div className="metodo-plan-indicado">
              <strong>INDICADO PARA:</strong>
              Empresas que buscam consolidação e autoridade sólida no mercado local.
            </div>
          </div>
        </div>
      </section>

      <section className="metodo-footer-conversion" style={{ backgroundImage: `url(${footerBg})` }}>
        <div className="metodo-footer-overlay"></div>
        <div className="metodo-footer-content">
          <h2>Pronto para profissionalizar o seu marketing?</h2>
          <p>Agende uma Reunião Estratégica para entendermos qual fase do Método VM o seu negócio precisa agora.</p>
          <a
            href="https://wa.me/5519984522494?text=Olá!+Quero+agendar+minha+reunião+estratégica"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Falar com Estrategista no WhatsApp
          </a>
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
