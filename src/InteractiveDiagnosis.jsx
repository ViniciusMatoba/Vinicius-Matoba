import React, { useState, useMemo } from 'react';
import { ChevronRight, ArrowLeft, Send, CheckCircle2, Target, BarChart3, Users, Rocket, Brain } from 'lucide-react';
import diagnosticoImg from './assets/Diagnostico.png';
import logoImg from './assets/logo.png';

// --- CONSTANTS ---
const RADAR_CATEGORIES = [
    { key: 'posicionamento', label: 'Posicionamento' },
    { key: 'conteudo', label: 'Conteúdo' },
    { key: 'captacao', label: 'Captação' },
    { key: 'estrutura', label: 'Estrutura' },
    { key: 'estrategia', label: 'Estratégia' }
];

// --- CUSTOM SVG RADAR CHART COMPONENT ---
const DigitalMaturityRadar = ({ scores }) => {
    const size = 300;
    const center = size / 2;
    const radius = size * 0.35;
    const angleStep = (Math.PI * 2) / RADAR_CATEGORIES.length;

    // Calculate coordinates for points
    const points = useMemo(() => {
        return RADAR_CATEGORIES.map((cat, i) => {
            const val = scores[cat.key] || 0;
            const r = (val / 10) * radius;
            const angle = i * angleStep - Math.PI / 2;
            return {
                x: center + r * Math.cos(angle),
                y: center + r * Math.sin(angle),
                labelX: center + (radius + 20) * Math.cos(angle),
                labelY: center + (radius + 20) * Math.sin(angle),
                axisX: center + radius * Math.cos(angle),
                axisY: center + radius * Math.sin(angle)
            };
        });
    }, [scores, radius, center, angleStep]);

    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <div className="radar-chart-container" style={{ width: '100%', maxWidth: '400px', margin: '2rem auto' }}>
            <svg width="100%" height="auto" viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
                {/* Background Polygons (Grid) */}
                {[1, 2, 3, 4, 5].map(level => {
                    const r = (level / 5) * radius;
                    const gridPoints = RADAR_CATEGORIES.map((_, i) => {
                        const angle = i * angleStep - Math.PI / 2;
                        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                    }).join(' ');
                    return (
                        <polygon
                            key={level}
                            points={gridPoints}
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Axis lines */}
                {points.map((p, i) => (
                    <line
                        key={i}
                        x1={center}
                        y1={center}
                        x2={p.axisX}
                        y2={p.axisY}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                    />
                ))}

                {/* Data Polygon */}
                <polygon
                    points={polygonPoints}
                    fill="rgba(29, 185, 84, 0.2)"
                    stroke="var(--accent-green)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />

                {/* Points */}
                {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--accent-green)" />
                ))}

                {/* Labels */}
                {points.map((p, i) => (
                    <text
                        key={i}
                        x={p.labelX}
                        y={p.labelY}
                        fontSize="10"
                        fontWeight="700"
                        fill="var(--primary-navy)"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontFamily="Montserrat, sans-serif"
                    >
                        {RADAR_CATEGORIES[i].label}
                    </text>
                ))}
            </svg>
        </div>
    );
};

export default function InteractiveDiagnosis({ isEmbedded = false }) {
    const [step, setStep] = useState(0); // 0: Intro, 1: Identificacao, 2: Presenca, 3: Captacao, 4: Conteudo, 5: Estrategia, 6: Investimento, 7: Momento+Desafios, 8: Result
    const [formData, setFormData] = useState({
        nome: '',
        empresa: '',
        cidade: '',
        instagram: '',
        email: '',
        redesSociais: [],
        redesSociaisOutro: '',
        site: '',
        aquisicao: [],
        aquisicaoOutro: '',
        previsibilidade: '',
        frequencia: '',
        producaoConteudo: '',
        estrategia: '',
        elementosPerfil: [],
        investimento: '',
        experienciaAnuncios: '',
        faseNegocio: '',
        desafio: '',
        objetivo: '',
        urgencia: '',
        analisePerfil: ''
    });

    const [finalScore, setFinalScore] = useState(0);
    const [radarScores, setRadarScores] = useState({
        posicionamento: 2,
        conteudo: 2,
        captacao: 2,
        estrutura: 2,
        estrategia: 2
    });

    const handleNext = () => setStep(s => s + 1);
    const handlePrev = () => setStep(s => s - 1);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleArrayField = (field, value) => {
        setFormData(prev => {
            const currentArray = prev[field] || [];
            if (currentArray.includes(value)) {
                return { ...prev, [field]: currentArray.filter(i => i !== value) };
            } else {
                return { ...prev, [field]: [...currentArray, value] };
            }
        });
    };

    const processResults = () => {
        // 1. Estrutura Digital (0-10)
        let rEstrutura = 0;
        const validRedes = formData.redesSociais.filter(r => r !== 'Nenhuma' && r !== 'Outros' || (r === 'Outros' && formData.redesSociaisOutro.trim() !== ''));
        if (validRedes.length === 1) rEstrutura += 2;
        else if (validRedes.length === 2) rEstrutura += 3;
        else if (validRedes.length >= 3) rEstrutura += 5;

        if (formData.site === 'Apenas Instagram') rEstrutura += 1;
        else if (formData.site === 'Tenho um site institucional') rEstrutura += 3;
        else if (formData.site === 'Tenho página de vendas ou funil estruturado') rEstrutura += 5;

        // 2. Captação de Clientes (0-10)
        let rCaptacao = 0;
        if (formData.aquisicao.includes('Google') || formData.aquisicao.includes('Tráfego pago')) rCaptacao += 5;
        else if (formData.aquisicao.includes('Instagram') && formData.aquisicao.includes('Indicação')) rCaptacao += 3;
        else if (formData.aquisicao.includes('Instagram')) rCaptacao += 4;
        else if (formData.aquisicao.includes('Indicação')) rCaptacao += 1;
        else if (formData.aquisicao.length > 0) rCaptacao += 2; // Mistura ou outros

        if (formData.previsibilidade === 'Às vezes tenho movimento, às vezes não') rCaptacao += 2;
        else if (formData.previsibilidade === 'Tenho algum nível de previsibilidade') rCaptacao += 4;
        else if (formData.previsibilidade === 'Tenho fluxo constante de clientes') rCaptacao += 5;

        // 3. Conteúdo (0-10)
        let rConteudo = 0;
        if (formData.frequencia === '1 vez por semana') rConteudo += 2;
        else if (formData.frequencia === '2 a 3 vezes por semana') rConteudo += 4;
        else if (formData.frequencia === 'Quase todos os dias') rConteudo += 5;

        if (formData.producaoConteudo === 'Eu mesmo') rConteudo += 2;
        else if (formData.producaoConteudo === 'Alguém da equipe') rConteudo += 3;
        else if (formData.producaoConteudo === 'Freelancer') rConteudo += 4;
        else if (formData.producaoConteudo === 'Agência') rConteudo += 5;

        // 4. Estratégia (0-10)
        let rEstrategia = 0;
        if (formData.estrategia === 'Tenho algumas ideias, mas nada estruturado') rEstrategia += 2;
        else if (formData.estrategia === 'Tenho planejamento básico') rEstrategia += 4;
        else if (formData.estrategia === 'Tenho estratégia clara e estruturada') rEstrategia += 5;

        const validElementos = formData.elementosPerfil.filter(e => e !== 'Não sei dizer').length;
        if (validElementos >= 5) rEstrategia += 5;
        else if (validElementos >= 3) rEstrategia += 3;
        else rEstrategia += validElementos;

        // 5. Posicionamento (0-10)
        let rPosicionamento = 0;
        if (formData.investimento === 'Menos de R$500 por mês') rPosicionamento += 2;
        else if (formData.investimento === 'Entre R$500 e R$1.500 por mês') rPosicionamento += 3;
        else if (formData.investimento === 'Entre R$1.500 e R$3.000 por mês') rPosicionamento += 4;
        else if (formData.investimento === 'Mais de R$3.000 por mês') rPosicionamento += 5;

        if (formData.faseNegocio === 'Estou começando') rPosicionamento += 1;
        else if (formData.faseNegocio === 'Já tenho clientes, mas quero crescer') rPosicionamento += 2;
        else if (formData.faseNegocio === 'Tenho clientes constantes, mas quero previsibilidade') rPosicionamento += 4;
        else if (formData.faseNegocio === 'Quero escalar e fortalecer minha marca') rPosicionamento += 5;

        const radar = {
            posicionamento: rPosicionamento,
            conteudo: rConteudo,
            captacao: rCaptacao,
            estrutura: rEstrutura,
            estrategia: rEstrategia
        };

        setRadarScores(radar);

        // OVERALL SCORE (0-50)
        const totalScore = rPosicionamento + rConteudo + rCaptacao + rEstrutura + rEstrategia;
        setFinalScore(totalScore);

        handleNext();
    };

    const getMaturityLevel = (score) => {
        if (score <= 15) return "Presença inicial";
        if (score <= 25) return "Estrutura básica";
        if (score <= 35) return "Crescimento em desenvolvimento";
        if (score <= 45) return "Estratégia ativa";
        return "Alta maturidade digital";
    };

    const getGargalo = () => {
        let lowestScore = 10;
        let lowestKey = '';
        Object.entries(radarScores).forEach(([key, val]) => {
            if (val < lowestScore) {
                lowestScore = val;
                lowestKey = key;
            }
        });

        if (lowestScore >= 5) return null; // Sem gargalo severo

        switch(lowestKey) {
            case 'captacao': return "Seu principal gargalo hoje está na geração previsível de clientes.";
            case 'estrategia': return "Seu negócio ainda não possui uma estratégia digital clara e intencional.";
            case 'conteudo': return "A falta de consistência ou estrutura de conteúdo está limitando o seu alcance.";
            case 'estrutura': return "Sua base digital ainda não está totalmente preparada para suportar ou atrair grande escala.";
            case 'posicionamento': return "A ausência de clareza ou investimento na marca está travando seu próximo nível de escala.";
            default: return null;
        }
    };

    const sendWhatsApp = () => {
        let acqFinal = formData.aquisicao.join(', ');
        if (formData.aquisicao.includes('Outros')) {
            acqFinal = acqFinal.replace('Outros', `Outros (${formData.aquisicaoOutro})`);
        }
        let redesFinal = formData.redesSociais.join(', ');
        if (formData.redesSociais.includes('Outros')) {
            redesFinal = redesFinal.replace('Outros', `Outros (${formData.redesSociaisOutro})`);
        }
        const elementosStr = formData.elementosPerfil.join(', ');
        
        const maturidade = getMaturityLevel(finalScore);
        const gargalo = getGargalo();

        const message = `Olá Vinícius, realizei o Diagnóstico Estratégico Online.

*Briefing do Negócio:*
👤 Nome: ${formData.nome}
🏢 Empresa: ${formData.empresa}
🏙️ Cidade: ${formData.cidade}
✉️ E-mail: ${formData.email}
📱 Instagram: ${formData.instagram}

*Presença Digital:*
🌐 Redes Sociais: ${redesFinal || 'Nenhuma informada'}
💻 Site/Página: ${formData.site}
🎯 Elementos do Perfil: ${elementosStr || 'Nenhum'}

*Conteúdo & Estratégia:*
📝 Frequência: ${formData.frequencia}
🧑‍💻 Quem produz: ${formData.producaoConteudo}
🛠️ Estratégia definida: ${formData.estrategia}

*Métricas e Investimentos:*
📢 Como chegam as vendas: ${acqFinal || 'Nenhum selecionado'}
🧲 Previsibilidade: ${formData.previsibilidade}
💵 Investimento Mensal: ${formData.investimento}
📊 Exp. Anúncios: ${formData.experienciaAnuncios}

*Momento do Negócio:*
🚀 Fase do Negócio: ${formData.faseNegocio}
⚠️ Maior Desafio: ${formData.desafio}
🎯 Objetivo 12 meses: ${formData.objetivo}
🔥 Urgência (1-5): ${formData.urgencia}
💡 Deseja Análise: ${formData.analisePerfil}

*📊 Score Final:* ${finalScore}/50
*🏆 Nível de Maturidade:* ${maturidade}
${gargalo ? `*🚨 Gargalo Principal:* ${gargalo}` : ''}`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/5519984522494?text=${encoded}`, '_blank');
    };

    // --- STEP RENDERING ---

    return (
        <div className={`diagnosis-tool-wrapper ${isEmbedded ? 'embedded' : 'full-page'}`} style={{ padding: isEmbedded ? '0' : '4rem 1rem', position: 'relative' }}>
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.03,
                pointerEvents: 'none',
                zIndex: 0,
                width: '60vw',
                maxWidth: '500px'
            }}>
                <img src={logoImg} alt="VM Logo Watermark" style={{ width: '100%' }} />
            </div>
            
            <div className="diagnosis-card-container" style={{ maxWidth: '750px', margin: '0 auto', background: 'white', borderRadius: '24px', boxShadow: 'var(--shadow-custom)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                
                {/* PROGRESS BAR */}
                {step > 0 && step < 8 && (
                    <div className="diagnosis-progress-bar" style={{ height: '6px', background: '#f1f5f9', position: 'relative' }}>
                        <div 
                            style={{ 
                                height: '100%', 
                                background: 'var(--accent-green)', 
                                width: `${(step / 7) * 100}%`,
                                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                            }} 
                        />
                    </div>
                )}

                <div className="diagnosis-step-content" style={{ padding: '3rem 2rem' }}>
                    {step === 0 && (
                        <div className="step-intro text-center">
                            <h2 className="text-navy font-bold mb-3">Diagnóstico Estratégico Online</h2>
                            
                            <div className="diagnosis-photo-container mb-4 mt-2">
                                <img src={diagnosticoImg} alt="Diagnóstico Estratégico Online" className="margin-auto" style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '16px', boxShadow: 'var(--shadow-custom)' }} />
                            </div>

                            <p className="text-gray mb-5">Responda algumas perguntas rápidas para avaliarmos o cenário atual do seu negócio e sua maturidade digital.</p>
                            <button onClick={handleNext} className="btn-vm-green-large w-full">
                                Iniciar Diagnóstico <ChevronRight size={18} />
                            </button>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="step-info">
                            <span className="step-counter">Etapa 1 de 7</span>
                            <h3 className="text-navy mb-4 font-bold">Identificação</h3>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-semibold mb-2">Qual é o seu nome?</label>
                                <input 
                                    type="text" 
                                    className="diagnosis-input" 
                                    placeholder="Ex: João Silva"
                                    value={formData.nome}
                                    onChange={(e) => updateField('nome', e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-semibold mb-2">Nome da sua empresa ou marca?</label>
                                <input 
                                    type="text" 
                                    className="diagnosis-input" 
                                    placeholder="Ex: Consultoria ABC"
                                    value={formData.empresa}
                                    onChange={(e) => updateField('empresa', e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-semibold mb-2">Qual cidade você atua?</label>
                                <input 
                                    type="text" 
                                    className="diagnosis-input" 
                                    placeholder="Ex: São Paulo, SP"
                                    value={formData.cidade}
                                    onChange={(e) => updateField('cidade', e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-semibold mb-2">Qual é o @ do seu Instagram profissional?</label>
                                <input 
                                    type="text" 
                                    className="diagnosis-input" 
                                    placeholder="Ex: @joaosilva"
                                    value={formData.instagram}
                                    onChange={(e) => updateField('instagram', e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-5">
                                <label className="block text-sm font-semibold mb-2">Qual é o seu e-mail para receber o resultado do diagnóstico?</label>
                                <input 
                                    type="email" 
                                    className="diagnosis-input" 
                                    placeholder="Ex: joao@email.com"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={handleNext} 
                                className="btn-vm-green-large w-full"
                                disabled={!formData.nome || !formData.empresa || !formData.email || !formData.instagram || !formData.cidade}
                            >
                                Continuar
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-question">
                            <span className="step-counter">Etapa 2 de 7</span>
                            <h3 className="text-navy mb-4 font-bold">Presença Digital</h3>
                            
                            <label className="block text-sm font-semibold mb-2">Quais redes sociais você utiliza hoje para o seu negócio?</label>
                            <p className="text-sm text-gray mb-3">Você pode selecionar mais de uma opção.</p>
                            <div className="options-grid mb-5">
                                {['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'Nenhuma', 'Outros'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => toggleArrayField('redesSociais', opt)}
                                        className={`option-btn ${formData.redesSociais.includes(opt) ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {formData.redesSociais.includes('Outros') && (
                                <div className="mb-5 form-group animate-fade-in">
                                    <input 
                                        type="text" 
                                        className="diagnosis-input" 
                                        placeholder="Quais outras redes?"
                                        value={formData.redesSociaisOutro}
                                        onChange={(e) => updateField('redesSociaisOutro', e.target.value)}
                                    />
                                </div>
                            )}

                            <label className="block text-sm font-semibold mb-2 mt-2">Você possui algum site ou página de vendas?</label>
                            <div className="options-grid">
                                {['Não possuo', 'Apenas Instagram', 'Tenho um site institucional', 'Tenho página de vendas ou funil estruturado'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => updateField('site', opt)}
                                        className={`option-btn ${formData.site === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={handleNext} 
                                className="btn-vm-green-large w-full mt-4"
                                disabled={formData.redesSociais.length === 0 || (formData.redesSociais.includes('Outros') && !formData.redesSociaisOutro) || !formData.site}
                            >
                                Continuar
                            </button>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-question">
                            <span className="step-counter">Etapa 3 de 7</span>
                            <h3 className="text-navy mb-4 font-bold">Captação de Clientes</h3>
                            
                            <label className="block text-sm font-semibold mb-2">Hoje, como a maioria dos seus clientes chega até você?</label>
                            <p className="text-sm text-gray mb-3">Você pode selecionar mais de uma opção.</p>
                            <div className="options-grid mb-5">
                                {['Indicação', 'Instagram', 'Google', 'Tráfego pago', 'Parcerias', 'Outros'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => toggleArrayField('aquisicao', opt)}
                                        className={`option-btn ${formData.aquisicao.includes(opt) ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {formData.aquisicao.includes('Outros') && (
                                <div className="mb-5 form-group animate-fade-in">
                                    <input 
                                        type="text" 
                                        className="diagnosis-input" 
                                        placeholder="Qual outro canal?"
                                        value={formData.aquisicaoOutro}
                                        onChange={(e) => updateField('aquisicaoOutro', e.target.value)}
                                    />
                                </div>
                            )}

                            <label className="block text-sm font-semibold mb-2 mt-2">Hoje você possui previsibilidade na entrada de clientes?</label>
                            <div className="options-grid">
                                {['Não, cada mês é diferente', 'Às vezes tenho movimento, às vezes não', 'Tenho algum nível de previsibilidade', 'Tenho fluxo constante de clientes'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => updateField('previsibilidade', opt)}
                                        className={`option-btn ${formData.previsibilidade === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={handleNext} 
                                className="btn-vm-green-large w-full mt-4"
                                disabled={formData.aquisicao.length === 0 || (formData.aquisicao.includes('Outros') && !formData.aquisicaoOutro) || !formData.previsibilidade}
                            >
                                Continuar
                            </button>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="step-question">
                            <span className="step-counter">Etapa 4 de 7</span>
                            <h3 className="text-navy mb-4 font-bold">Conteúdo</h3>
                            
                            <label className="block text-sm font-semibold mb-2">Qual a frequência de publicação de conteúdo nas suas redes sociais?</label>
                            <div className="options-grid mb-5">
                                {['Não publico', '1 vez por semana', '2 a 3 vezes por semana', 'Quase todos os dias'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => updateField('frequencia', opt)}
                                        className={`option-btn ${formData.frequencia === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <label className="block text-sm font-semibold mb-2 mt-2">Quem produz o conteúdo hoje?</label>
                            <div className="options-grid">
                                {['Eu mesmo', 'Alguém da equipe', 'Freelancer', 'Agência', 'Não produzo conteúdo'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => updateField('producaoConteudo', opt)}
                                        className={`option-btn ${formData.producaoConteudo === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={handleNext} 
                                className="btn-vm-green-large w-full mt-4"
                                disabled={!formData.frequencia || !formData.producaoConteudo}
                            >
                                Continuar
                            </button>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="step-question">
                            <span className="step-counter">Etapa 5 de 7</span>
                            <h3 className="text-navy mb-4 font-bold">Estratégia Digital</h3>
                            
                            <label className="block text-sm font-semibold mb-2">Hoje você possui uma estratégia digital definida?</label>
                            <div className="options-grid mb-5">
                                {['Não tenho estratégia', 'Tenho algumas ideias, mas nada estruturado', 'Tenho planejamento básico', 'Tenho estratégia clara e estruturada'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => updateField('estrategia', opt)}
                                        className={`option-btn ${formData.estrategia === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <label className="block text-sm font-semibold mb-2 mt-2">Seu perfil possui alguns desses elementos?</label>
                            <p className="text-sm text-gray mb-3">Você pode selecionar mais de uma opção.</p>
                            <div className="options-grid">
                                {['Bio clara e estratégica', 'Destaques organizados', 'Conteúdo planejado', 'Posicionamento claro do serviço', 'Estrutura para captar leads (WhatsApp / página / formulário)', 'Não sei dizer'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => toggleArrayField('elementosPerfil', opt)}
                                        className={`option-btn ${formData.elementosPerfil.includes(opt) ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={handleNext} 
                                className="btn-vm-green-large w-full mt-4"
                                disabled={!formData.estrategia || formData.elementosPerfil.length === 0}
                            >
                                Continuar
                            </button>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="step-question">
                            <span className="step-counter">Etapa 6 de 7</span>
                            <h3 className="text-navy mb-4 font-bold">Investimento em Marketing</h3>
                            
                            <label className="block text-sm font-semibold mb-2">Hoje você investe em marketing digital?</label>
                            <div className="options-grid mb-5">
                                {['Não invisto', 'Menos de R$500 por mês', 'Entre R$500 e R$1.500 por mês', 'Entre R$1.500 e R$3.000 por mês', 'Mais de R$3.000 por mês'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => updateField('investimento', opt)}
                                        className={`option-btn ${formData.investimento === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <label className="block text-sm font-semibold mb-2 mt-2">Você já investiu em anúncios online?</label>
                            <div className="options-grid">
                                {['Nunca investi', 'Já impulsionei posts', 'Já fiz campanhas estruturadas', 'Invisto regularmente em anúncios'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => updateField('experienciaAnuncios', opt)}
                                        className={`option-btn ${formData.experienciaAnuncios === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={handleNext} 
                                className="btn-vm-green-large w-full mt-4"
                                disabled={!formData.investimento || !formData.experienciaAnuncios}
                            >
                                Continuar
                            </button>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 7 && (
                        <div className="step-question">
                            <span className="step-counter">Etapa 7 de 7</span>
                            <h3 className="text-navy mb-4 font-bold">Momento do Negócio</h3>
                            
                            <label className="block text-sm font-semibold mb-2">Em qual fase você considera que seu negócio está hoje?</label>
                            <div className="options-grid mb-5">
                                {['Estou começando', 'Já tenho clientes, mas quero crescer', 'Tenho clientes constantes, mas quero previsibilidade', 'Quero escalar e fortalecer minha marca'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => updateField('faseNegocio', opt)}
                                        className={`option-btn ${formData.faseNegocio === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <label className="block text-sm font-semibold mb-2 mt-2">Qual é o seu maior desafio hoje no digital?</label>
                            <textarea 
                                className="diagnosis-textarea mb-5" 
                                placeholder="Falta de tempo, dificuldade em criar conteúdo estruturado..."
                                value={formData.desafio}
                                onChange={(e) => updateField('desafio', e.target.value)}
                            />

                            <label className="block text-sm font-semibold mb-2 mt-2">Qual é o principal objetivo que você gostaria de alcançar nos próximos 12 meses?</label>
                            <textarea 
                                className="diagnosis-textarea mb-5" 
                                placeholder="Conseguir o dobro de clientes online, virar referência..."
                                value={formData.objetivo}
                                onChange={(e) => updateField('objetivo', e.target.value)}
                            />

                            <label className="block text-sm font-semibold mb-2 mt-2">O quanto melhorar sua presença digital é prioridade para você neste momento?</label>
                            <p className="text-sm text-gray mb-3">1 = Não é prioridade agora / 5 = É uma prioridade alta</p>
                            <div className="options-grid mb-5" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                                {['1', '2', '3', '4', '5'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => updateField('urgencia', opt)}
                                        className={`option-btn text-center ${formData.urgencia === opt ? 'active' : ''}`}
                                        style={{ padding: '0.8rem' }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <label className="block text-sm font-semibold mb-2 mt-2">Você gostaria de receber uma análise estratégica do seu perfil com base neste diagnóstico?</label>
                            <div className="options-grid">
                                {['Sim, gostaria', 'Talvez', 'Apenas queria ver o resultado'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => updateField('analisePerfil', opt)}
                                        className={`option-btn ${formData.analisePerfil === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={processResults} 
                                className="btn-vm-green-large w-full mt-4"
                                disabled={!formData.faseNegocio || !formData.desafio || !formData.objetivo || !formData.urgencia || !formData.analisePerfil}
                            >
                                🎉 Finalizar Diagnóstico
                            </button>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 8 && (
                        <div className="step-result text-center">
                            <h2 className="text-navy font-bold mb-2">Resultado do Diagnóstico Estratégico</h2>
                            <div className="score-badge mb-4">
                                <span className="score-label">Pontuação geral</span>
                                <span className="score-value">{finalScore}<small>/50</small></span>
                            </div>

                            <DigitalMaturityRadar scores={radarScores} />

                            <div className="interpretation-box mb-5">
                                <h4 className="text-navy font-bold mb-1" style={{ fontSize: '1.2rem' }}>{getMaturityLevel(finalScore)}</h4>
                                <p className="text-navy font-medium mb-3">Sua maturidade digital está mapeada acima segundo nossa inteligência VM.</p>
                                
                                {getGargalo() && (
                                    <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', borderRadius: '8px', color: '#b91c1c' }}>
                                        <p className="font-bold text-sm mb-1">🚨 Atenção Especial</p>
                                        <p className="text-sm font-medium">{getGargalo()}</p>
                                    </div>
                                )}
                                
                                <p className="text-sm mt-4 text-gray">Se quiser, posso analisar seu perfil e explicar com mais detalhes como reverter as falhas encontradas acelerando seus resultados reais.</p>
                            </div>

                            <button onClick={sendWhatsApp} className="btn-vm-green-large w-full">
                                <Send size={18} /> Receber análise estratégica gratuita
                            </button>
                            
                            <p className="mt-4 text-xs text-gray opacity-60">
                                Ao clicar, você enviará seu briefing completo diretamente para o WhatsApp de Vinícius.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .diagnosis-tool-wrapper {
                    font-family: 'Montserrat', sans-serif;
                }
                .diagnosis-input, .diagnosis-textarea {
                    width: 100%;
                    padding: 1rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s;
                }
                .diagnosis-input:focus, .diagnosis-textarea:focus {
                    border-color: var(--accent-green);
                    box-shadow: 0 0 0 3px rgba(29, 185, 84, 0.1);
                }
                .diagnosis-textarea {
                    min-height: 120px;
                    resize: none;
                }
                .option-btn {
                    width: 100%;
                    text-align: left;
                    padding: 1rem 1.5rem;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    margin-bottom: 0.75rem;
                    font-weight: 600;
                    color: var(--primary-navy);
                    transition: all 0.2s;
                    cursor: pointer;
                }
                .option-btn:hover {
                    background: #f1f5f9;
                    border-color: #cbd5e1;
                }
                .option-btn.active {
                    background: var(--primary-navy);
                    color: white;
                    border-color: var(--primary-navy);
                }
                .step-counter {
                    display: block;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--accent-green);
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }
                .back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    background: none;
                    border: none;
                    color: var(--gray-500);
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                }
                .score-badge {
                    display: inline-flex;
                    flex-direction: column;
                    padding: 1.5rem 3rem;
                    background: var(--primary-navy);
                    color: white;
                    border-radius: 20px;
                }
                .score-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    opacity: 0.7;
                    letter-spacing: 0.05em;
                }
                .score-value {
                    font-size: 3rem;
                    font-weight: 800;
                    line-height: 1;
                }
                .score-value small {
                    font-size: 1.2rem;
                    opacity: 0.5;
                }
                .interpretation-box {
                    background: #f0fdf4;
                    padding: 1.5rem;
                    border-radius: 16px;
                    border-left: 4px solid var(--accent-green);
                    text-align: left;
                }
                .icon-intro-glow {
                    display: inline-flex;
                    padding: 1.5rem;
                    background: rgba(29, 185, 84, 0.1);
                    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                    animation: morph 8s ease-in-out infinite;
                }
                @keyframes morph {
                    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                    50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
                    100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                }
                @media (max-width: 640px) {
                    .diagnosis-step-content {
                        padding: 2rem 1.5rem;
                    }
                    .score-value {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
