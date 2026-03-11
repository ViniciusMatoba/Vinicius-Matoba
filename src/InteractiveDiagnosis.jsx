import React, { useState, useMemo } from 'react';
import { ChevronRight, ArrowLeft, Send, CheckCircle2, Target, BarChart3, Users, Rocket, Brain } from 'lucide-react';
import diagnosticoImg from './assets/Diagnostico.png';

// --- CONSTANTS ---
const RADAR_CATEGORIES = [
    { key: 'posicionamento', label: 'Posicionamento' },
    { key: 'estrategia', label: 'Estratégia' },
    { key: 'conteudo', label: 'Conteúdo' },
    { key: 'aquisicao', label: 'Aquisição' },
    { key: 'analise', label: 'Análise' },
    { key: 'crescimento', label: 'Crescimento' }
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
            const r = (val / 5) * radius;
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
    const [step, setStep] = useState(0); // 0: Intro, 1: Basic Info, 2-7: Questions, 8: Result
    const [formData, setFormData] = useState({
        nome: '',
        empresa: '',
        segmento: '',
        aquisicao: '',
        frequencia: '',
        estrategia: '',
        desafio: '',
        objetivo: ''
    });

    const [finalScore, setFinalScore] = useState(0);
    const [radarScores, setRadarScores] = useState({
        posicionamento: 2,
        estrategia: 2,
        conteudo: 2,
        aquisicao: 2,
        analise: 2,
        crescimento: 2
    });

    const handleNext = () => setStep(s => s + 1);
    const handlePrev = () => setStep(s => s - 1);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const processResults = () => {
        // RADAR SCORING (0-5)
        let rPos = 2;
        if (formData.segmento === 'Negócio local' || formData.segmento === 'Prestação de serviços') rPos = 5;
        else if (formData.segmento === 'E-commerce') rPos = 4;

        let rAcq = 1;
        if (['Anúncios', 'Google', 'Mistura de canais'].includes(formData.aquisicao)) rAcq = 5;
        else if (formData.aquisicao === 'Redes sociais') rAcq = 3;

        let rCont = 1;
        if (formData.frequencia === 'Regularmente') rCont = 5;
        else if (formData.frequencia === 'Às vezes') rCont = 3;

        let rStr = 1;
        if (formData.estrategia === 'Sim') rStr = 5;
        else if (formData.estrategia === 'Parcialmente') rStr = 3;

        const rAnl = (rAcq >= 4) ? 5 : 2;
        const rCre = (formData.objetivo.length > 10) ? 5 : 2;

        const radar = {
            posicionamento: rPos,
            estrategia: rStr,
            conteudo: rCont,
            aquisicao: rAcq,
            analise: rAnl,
            crescimento: rCre
        };

        setRadarScores(radar);

        // OVERALL SCORE (0-100)
        // Weighting: Estrategia (40%), Aquisicao (30%), Conteudo (20%), Other (10%)
        const sStr = (rStr / 5) * 40;
        const sAcq = (rAcq / 5) * 30;
        const sCont = (rCont / 5) * 20;
        const sOther = 10;
        setFinalScore(Math.round(sStr + sAcq + sCont + sOther));

        handleNext();
    };

    const getInterpretation = (score) => {
        if (score <= 30) return "Seu negócio provavelmente ainda não possui uma estrutura estratégica digital definida.";
        if (score <= 60) return "Seu negócio possui presença digital, mas ainda existem gargalos estratégicos importantes.";
        if (score <= 80) return "Seu negócio já apresenta uma estrutura digital organizada com boas oportunidades de escala.";
        return "Seu negócio apresenta um nível avançado de maturidade digital e potencial de liderança de mercado.";
    };

    const sendWhatsApp = () => {
        const message = `Olá Vinícius, realizei o Diagnóstico Estratégico Online.

*Bbriefing do Negócio:*
👤 Nome: ${formData.nome}
🏢 Empresa: ${formData.empresa}
🎯 Segmento: ${formData.segmento}
📢 Aquisição atual: ${formData.aquisicao}
📱 Frequência Conteúdo: ${formData.frequencia}
🛠️ Estratégia atual: ${formData.estrategia}
⚠️ Maior desafio: ${formData.desafio}
🚀 Objetivo 12 meses: ${formData.objetivo}

*📊 Maturidade Digital (0-5):*
- Posicionamento: ${radarScores.posicionamento}
- Estratégia: ${radarScores.estrategia}
- Conteúdo: ${radarScores.conteudo}
- Aquisição: ${radarScores.aquisicao}
- Análise de Dados: ${radarScores.analise}
- Crescimento: ${radarScores.crescimento}

*🔥 Pontuação Final: ${finalScore}/100*`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/5519984522494?text=${encoded}`, '_blank');
    };

    // --- STEP RENDERING ---


    return (
        <div className={`diagnosis-tool-wrapper ${isEmbedded ? 'embedded' : 'full-page'}`} style={{ padding: isEmbedded ? '0' : '4rem 1rem' }}>
            <div className="diagnosis-card-container" style={{ maxWidth: '700px', margin: '0 auto', background: 'white', borderRadius: '24px', boxShadow: 'var(--shadow-custom)', overflow: 'hidden' }}>
                
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
                            <div className="icon-intro-glow mb-4">
                                <Target size={48} className="text-accent-green" />
                            </div>
                            <h2 className="text-navy font-bold mb-3">Diagnóstico Estratégico Online</h2>
                            <p className="text-gray mb-5">Responda algumas perguntas rápidas para avaliarmos o cenário atual do seu negócio e sua maturidade digital.</p>
                            <div className="diagnosis-photo-container mb-5 mt-4">
                                <img src={diagnosticoImg} alt="Diagnóstico Estratégico Online" className="margin-auto" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '16px', boxShadow: 'var(--shadow-custom)' }} />
                            </div>
                            <button onClick={handleNext} className="btn-vm-green-large w-full">
                                Iniciar Diagnóstico <ChevronRight size={18} />
                            </button>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="step-info">
                            <h3 className="text-navy mb-4 font-bold">Informações Básicas</h3>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-semibold mb-2">Seu Nome</label>
                                <input 
                                    type="text" 
                                    className="diagnosis-input" 
                                    placeholder="Ex: João Silva"
                                    value={formData.nome}
                                    onChange={(e) => updateField('nome', e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-5">
                                <label className="block text-sm font-semibold mb-2">Sua Empresa</label>
                                <input 
                                    type="text" 
                                    className="diagnosis-input" 
                                    placeholder="Ex: Consultoria ABC"
                                    value={formData.empresa}
                                    onChange={(e) => updateField('empresa', e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={handleNext} 
                                className="btn-vm-green-large w-full"
                                disabled={!formData.nome || !formData.empresa}
                            >
                                Continuar
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-question">
                            <span className="step-counter">Pergunta 1 de 6</span>
                            <h3 className="text-navy mb-4 font-bold">Qual o segmento do seu negócio?</h3>
                            <div className="options-grid">
                                {['Negócio local', 'Prestação de serviços', 'E-commerce', 'Outro'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => { updateField('segmento', opt); handleNext(); }}
                                        className={`option-btn ${formData.segmento === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-question">
                            <span className="step-counter">Pergunta 2 de 6</span>
                            <h3 className="text-navy mb-4 font-bold">Como seus clientes chegam até você hoje?</h3>
                            <div className="options-grid">
                                {['Indicação', 'Redes sociais', 'Anúncios', 'Google', 'Mistura de canais'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => { updateField('aquisicao', opt); handleNext(); }}
                                        className={`option-btn ${formData.aquisicao === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="step-question">
                            <span className="step-counter">Pergunta 3 de 6</span>
                            <h3 className="text-navy mb-4 font-bold">Você publica conteúdo nas redes sociais com frequência?</h3>
                            <div className="options-grid">
                                {['Regularmente', 'Às vezes', 'Raramente'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => { updateField('frequencia', opt); handleNext(); }}
                                        className={`option-btn ${formData.frequencia === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="step-question">
                            <span className="step-counter">Pergunta 4 de 6</span>
                            <h3 className="text-navy mb-4 font-bold">Você possui uma estratégia digital estruturada?</h3>
                            <div className="options-grid">
                                {['Sim', 'Parcialmente', 'Não'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => { updateField('estrategia', opt); handleNext(); }}
                                        className={`option-btn ${formData.estrategia === opt ? 'active' : ''}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="step-question">
                            <span className="step-counter">Pergunta 5 de 6</span>
                            <h3 className="text-navy mb-4 font-bold">Qual é hoje seu maior desafio de crescimento?</h3>
                            <textarea 
                                className="diagnosis-textarea" 
                                placeholder="Dificuldade em atrair clientes, falta de tempo para conteúdo, processos desorganizados..."
                                value={formData.desafio}
                                onChange={(e) => updateField('desafio', e.target.value)}
                            />
                            <button 
                                onClick={handleNext} 
                                className="btn-vm-green-large w-full mt-4"
                                disabled={!formData.desafio}
                            >
                                Próxima Pergunta
                            </button>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 7 && (
                        <div className="step-question">
                            <span className="step-counter">Pergunta 6 de 6</span>
                            <h3 className="text-navy mb-4 font-bold">Onde você gostaria que seu negócio estivesse em 12 meses?</h3>
                            <textarea 
                                className="diagnosis-textarea" 
                                placeholder="Dobrar o faturamento, abrir nova unidade, consolidar marca no digital..."
                                value={formData.objetivo}
                                onChange={(e) => updateField('objetivo', e.target.value)}
                            />
                            <button 
                                onClick={processResults} 
                                className="btn-vm-green-large w-full mt-4"
                                disabled={!formData.objetivo}
                            >
                                Finalizar Diagnóstico
                            </button>
                            <button onClick={handlePrev} className="back-btn mt-4"><ArrowLeft size={14} /> Voltar</button>
                        </div>
                    )}

                    {step === 8 && (
                        <div className="step-result text-center">
                            <h2 className="text-navy font-bold mb-2">Resultado do Diagnóstico Estratégico</h2>
                            <div className="score-badge mb-4">
                                <span className="score-label">Pontuação geral</span>
                                <span className="score-value">{finalScore}<small>/100</small></span>
                            </div>

                            <DigitalMaturityRadar scores={radarScores} />

                            <div className="interpretation-box mb-5">
                                <p className="text-navy font-semibold">{getInterpretation(finalScore)}</p>
                                <p className="text-sm mt-3 text-gray">Seu diagnóstico indica que existem oportunidades estratégicas imediatas para fortalecer seu posicionamento e estrutura digital.</p>
                            </div>

                            <button onClick={sendWhatsApp} className="btn-vm-green-large w-full">
                                <Send size={18} /> Solicitar Diagnóstico com Vinícius Matoba
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
