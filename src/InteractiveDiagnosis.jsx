import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Check, Target, Building2, Globe, TrendingUp, Presentation, AlertCircle } from 'lucide-react';
import logo from './assets/logo.png';
import './index.css';

// --- DATA STRUCTURES ---

const STEPS = [
    'Introdução',
    'Informações Básicas',
    'O Negócio',
    'Presença Digital',
    'Aquisição de Clientes',
    'Estratégia Atual',
    'Desafio Principal',
    'Objetivo'
];

// Define layout structure for the form container
const FormLayout = ({ children, title }) => (
    <div className="diagnosis-form-card" style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', maxWidth: '600px', width: '100%', border: '1px solid var(--gray-200)', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)', marginBottom: '2rem', fontFamily: 'Montserrat, sans-serif' }}>{title}</h2>
        {children}
    </div>
);

export default function InteractiveDiagnosis() {
    const [currentStep, setCurrentStep] = useState(0);

    // Form State
    const [answers, setAnswers] = useState({
        name: '',
        company: '',
        city: '',
        socialLink: '',
        niche: '',
        whatYouSell: '',
        idealClient: '',
        mainProduct: '',
        digitalChannels: [], // Multi
        clientAcquisition: [], // Multi
        hasStrategy: '', // Single
        mainChallenge: '',
        goal12Months: ''
    });

    const [score, setScore] = useState(null);

    // Helper handling changes for standard inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    // Helper handling multi-selects
    const toggleMultiSelect = (field, option) => {
        setAnswers(prev => {
            const currentList = prev[field];
            if (currentList.includes(option)) {
                return { ...prev, [field]: currentList.filter(item => item !== option) };
            } else {
                return { ...prev, [field]: [...currentList, option] };
            }
        });
    };

    // Helper handling single-selects (buttons)
    const setSingleSelect = (field, option) => {
        setAnswers(prev => ({ ...prev, [field]: option }));
    };

    const nextStep = () => {
        if (currentStep < 8) setCurrentStep(v => v + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(v => v - 1);
    };

    const calculateScore = () => {
        let currentScore = 0;

        // Presence points (Max 30)
        const channels = answers.digitalChannels.length;
        if (channels === 1.1) currentScore += 10;
        if (channels === 2 || channels === 3) currentScore += 20;
        if (channels > 3) currentScore += 30;

        // Acquisition points (Max 40)
        const acq = answers.clientAcquisition;
        if (acq.includes('Anúncios')) currentScore += 20;
        if (acq.includes('Google')) currentScore += 10;
        if (acq.includes('Redes sociais')) currentScore += 10;

        // Indication alone is not structured predictably
        if (acq.length === 1 && acq.includes('Indicação')) currentScore += 0;

        // Strategy points (Max 30)
        if (answers.hasStrategy === 'Sim') currentScore += 30;
        if (answers.hasStrategy === 'Parcialmente') currentScore += 15;

        // Ensure boundaries
        if (currentScore > 100) currentScore = 100;

        setScore(currentScore);
        setCurrentStep(9); // Move to Result step
    };

    const getResultInterpretation = (finalScore) => {
        if (finalScore <= 30) return "Seu negócio provavelmente ainda não possui uma estrutura estratégica digital definida.";
        if (finalScore <= 60) return "Seu negócio possui presença digital, mas ainda existem gargalos estratégicos que podem limitar o crescimento.";
        if (finalScore <= 80) return "Seu negócio demonstra um nível de organização estratégica e pode evoluir com otimizações.";
        return "Seu negócio apresenta um nível avançado de maturidade digital.";
    };

    const generateWhatsAppMessage = () => {
        const br = '%0A';
        let text = `Olá Vinícius, acabei de finalizar o Diagnóstico Estratégico no site e gostaria de conversar.${br}${br}`;
        text += `*MEU RESULTADO:* ${score} / 100${br}`;
        text += `*Perfil:* ${answers.name} (${answers.company} - ${answers.city})${br}`;
        text += `*Segmento:* ${answers.niche}${br}`;
        text += `*Instagram/Site:* ${answers.socialLink}${br}${br}`;

        text += `*O que vende:* ${answers.whatYouSell}${br}`;
        text += `*Cliente ideal:* ${answers.idealClient}${br}`;
        text += `*Canais Digitais:* ${answers.digitalChannels.join(', ')}${br}`;
        text += `*Aquisição atual:* ${answers.clientAcquisition.join(', ')}${br}`;
        text += `*Estratégia estruturada:* ${answers.hasStrategy}${br}${br}`;

        text += `*Maior Desafio:* ${answers.mainChallenge}${br}`;
        text += `*Objetivo p/ 12 meses:* ${answers.goal12Months}`;

        return `https://wa.me/5519984522494?text=${text}`;
    };

    // --- RENDER HELPERS ---

    const renderProgressBar = () => {
        if (currentStep === 0 || currentStep === 9) return null;
        const progress = (currentStep / 8) * 100;
        return (
            <div className="diagnosis-progress-wrapper" style={{ width: '100%', maxWidth: '600px', margin: '0 auto 2rem' }}>
                <div className="diagnosis-progress-text" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--gray-400)', marginBottom: '0.5rem' }}>
                    <span>Passo {currentStep} de 8</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="diagnosis-progress-bg" style={{ width: '100%', height: '6px', backgroundColor: 'var(--gray-200)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div className="diagnosis-progress-fill" style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--accent-green)', transition: 'width 0.4s ease' }}></div>
                </div>
            </div>
        );
    };

    return (
        <div className="interactive-diagnosis-page bg-soft-gray" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header className="site-mini-header" style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem', background: 'white', borderBottom: '1px solid var(--gray-200)' }}>
                <img src={logo} alt="Logo VM" style={{ height: '30px' }} />
            </header>

            <main className="diagnosis-main-content" style={{ flexGrow: 1, padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {renderProgressBar()}

                {/* STEP 0: ENTRY */}
                {currentStep === 0 && (
                    <div className="text-center max-width-800 margin-auto">
                        <Target size={48} className="text-accent-green mb-4" />
                        <h1 className="hero-title-premium" style={{ fontSize: '2.5rem' }}>Diagnóstico Estratégico</h1>
                        <p className="premium-section-text mt-3 mb-5">
                            Responda algumas perguntas rápidas para avaliarmos o cenário atual do seu negócio e descobrirmos seu grau de maturidade digital.
                        </p>
                        <button onClick={nextStep} className="btn-vm-green-large" style={{ border: 'none', cursor: 'pointer' }}>
                            Iniciar Diagnóstico <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                {/* STEP 1: BASIC INFO */}
                {currentStep === 1 && (
                    <FormLayout title="Informações Básicas">
                        <div className="form-group mb-3">
                            <label>Seu Nome</label>
                            <input type="text" name="name" value={answers.name} onChange={handleChange} className="form-input-premium" placeholder="Ex: João Silva" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Nome do Negócio</label>
                            <input type="text" name="company" value={answers.company} onChange={handleChange} className="form-input-premium" placeholder="Ex: Clínica Sorriso" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Cidade ou Região</label>
                            <input type="text" name="city" value={answers.city} onChange={handleChange} className="form-input-premium" placeholder="Ex: Campinas, SP" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Instagram / Site</label>
                            <input type="text" name="socialLink" value={answers.socialLink} onChange={handleChange} className="form-input-premium" placeholder="Ex: @minhaclinica" />
                        </div>
                        <div className="form-group mb-4">
                            <label>Segmento de atuação</label>
                            <input type="text" name="niche" value={answers.niche} onChange={handleChange} className="form-input-premium" placeholder="Ex: Odontologia" />
                        </div>
                        <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button disabled={!answers.name || !answers.company} onClick={nextStep} className="btn-vm-green-large" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer' }}>Avançar <ChevronRight size={20} /></button>
                        </div>
                    </FormLayout>
                )}

                {/* STEP 2: BUSINESS QUESTIONS */}
                {currentStep === 2 && (
                    <FormLayout title="Sobre o Negócio">
                        <div className="form-group mb-3">
                            <label>O que sua empresa vende?</label>
                            <input type="text" name="whatYouSell" value={answers.whatYouSell} onChange={handleChange} className="form-input-premium" placeholder="Ex: Serviços odontológicos estéticos" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Quem é seu cliente ideal?</label>
                            <input type="text" name="idealClient" value={answers.idealClient} onChange={handleChange} className="form-input-premium" placeholder="Ex: Pessoas de 30-50 anos buscando estética" />
                        </div>
                        <div className="form-group mb-4">
                            <label>Qual é seu principal produto ou serviço?</label>
                            <input type="text" name="mainProduct" value={answers.mainProduct} onChange={handleChange} className="form-input-premium" placeholder="Ex: Lentes de Contato Dental" />
                        </div>
                        <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={prevStep} className="btn-ghost-premium"><ArrowLeft size={20} /> Voltar</button>
                            <button disabled={!answers.whatYouSell} onClick={nextStep} className="btn-vm-green-large" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer' }}>Avançar <ChevronRight size={20} /></button>
                        </div>
                    </FormLayout>
                )}

                {/* STEP 3: DIGITAL PRESENCE */}
                {currentStep === 3 && (
                    <FormLayout title="Em quais canais digitais você está presente?">
                        <p className="opacity-70 mb-4" style={{ fontSize: '0.9rem' }}>Selecione todas as opções que se aplicam.</p>
                        <div className="options-grid mb-4">
                            {['Instagram', 'Facebook', 'TikTok', 'Google', 'Site próprio', 'Outros'].map(opt => (
                                <div
                                    key={opt}
                                    className={`option-btn ${answers.digitalChannels.includes(opt) ? 'selected' : ''}`}
                                    onClick={() => toggleMultiSelect('digitalChannels', opt)}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                        <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={prevStep} className="btn-ghost-premium"><ArrowLeft size={20} /> Voltar</button>
                            <button disabled={answers.digitalChannels.length === 0} onClick={nextStep} className="btn-vm-green-large" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer' }}>Avançar <ChevronRight size={20} /></button>
                        </div>
                    </FormLayout>
                )}

                {/* STEP 4: ACQUISITION */}
                {currentStep === 4 && (
                    <FormLayout title="Como seus clientes chegam até você hoje?">
                        <p className="opacity-70 mb-4" style={{ fontSize: '0.9rem' }}>Selecione as principais formas (múltipla escolha).</p>
                        <div className="options-grid mb-4">
                            {['Indicação', 'Redes sociais', 'Anúncios', 'Google', 'Outros'].map(opt => (
                                <div
                                    key={opt}
                                    className={`option-btn ${answers.clientAcquisition.includes(opt) ? 'selected' : ''}`}
                                    onClick={() => toggleMultiSelect('clientAcquisition', opt)}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                        <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={prevStep} className="btn-ghost-premium"><ArrowLeft size={20} /> Voltar</button>
                            <button disabled={answers.clientAcquisition.length === 0} onClick={nextStep} className="btn-vm-green-large" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer' }}>Avançar <ChevronRight size={20} /></button>
                        </div>
                    </FormLayout>
                )}

                {/* STEP 5: STRATEGY */}
                {currentStep === 5 && (
                    <FormLayout title="Você possui uma estratégia digital estruturada?">
                        <div className="options-flex-col mb-4">
                            {['Sim', 'Parcialmente', 'Não'].map(opt => (
                                <div
                                    key={opt}
                                    className={`option-btn list-btn ${answers.hasStrategy === opt ? 'selected' : ''}`}
                                    onClick={() => setSingleSelect('hasStrategy', opt)}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                        <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={prevStep} className="btn-ghost-premium"><ArrowLeft size={20} /> Voltar</button>
                            <button disabled={!answers.hasStrategy} onClick={nextStep} className="btn-vm-green-large" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer' }}>Avançar <ChevronRight size={20} /></button>
                        </div>
                    </FormLayout>
                )}

                {/* STEP 6: MAIN CHALLENGE */}
                {currentStep === 6 && (
                    <FormLayout title="Qual hoje é o maior desafio de crescimento do seu negócio?">
                        <div className="form-group mb-4">
                            <textarea
                                name="mainChallenge"
                                value={answers.mainChallenge}
                                onChange={handleChange}
                                className="form-input-premium textarea-premium"
                                rows="4"
                                placeholder="Ex: Atrair pacientes particulares, e não apenas de convênio..."
                            ></textarea>
                        </div>
                        <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={prevStep} className="btn-ghost-premium"><ArrowLeft size={20} /> Voltar</button>
                            <button disabled={answers.mainChallenge.length < 5} onClick={nextStep} className="btn-vm-green-large" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer' }}>Avançar <ChevronRight size={20} /></button>
                        </div>
                    </FormLayout>
                )}

                {/* STEP 7: GOAL */}
                {currentStep === 7 && (
                    <FormLayout title="Onde você gostaria que seu negócio estivesse em 12 meses?">
                        <div className="form-group mb-4">
                            <textarea
                                name="goal12Months"
                                value={answers.goal12Months}
                                onChange={handleChange}
                                className="form-input-premium textarea-premium"
                                rows="4"
                                placeholder="Ex: Faturando 100k por mês apenas com serviços premium..."
                            ></textarea>
                        </div>
                        <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={prevStep} className="btn-ghost-premium"><ArrowLeft size={20} /> Voltar</button>
                            <button disabled={answers.goal12Months.length < 5} onClick={calculateScore} className="btn-vm-green-large" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer' }}>Ver Resultado <ChevronRight size={20} /></button>
                        </div>
                    </FormLayout>
                )}

                {/* STEP 9 (RESULT) */}
                {currentStep === 9 && (
                    <div className="diagnosis-result-card text-center" style={{ background: 'white', padding: '4rem 2rem', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', maxWidth: '700px', width: '100%', margin: '0 auto', borderTop: '5px solid var(--primary-navy)' }}>
                        <h2 className="premium-section-title mb-4">Resultado do Diagnóstico Estratégico</h2>

                        <div className="score-circle-wrapper mx-auto mb-4" style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '8px solid var(--accent-green)' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-navy)', fontFamily: 'Montserrat, sans-serif' }}>{score}</span>
                            <span style={{ fontSize: '1rem', color: 'var(--gray-400)', marginLeft: '4px' }}>/100</span>
                        </div>

                        <div className="interpretation-box bg-soft-gray mb-5" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                            <p className="premium-section-text font-bold text-navy m-0">
                                {getResultInterpretation(score)}
                            </p>
                        </div>

                        <h3 className="mb-3" style={{ color: 'var(--primary-navy)', fontSize: '1.3rem', fontWeight: '700' }}>O Próximo Passo Certo</h3>
                        <p className="mb-5 opacity-80" style={{ maxWidth: '500px', margin: '0 auto 2.5rem' }}>
                            Para construirmos um plano de ação validado para o seu cenário, envie essas respostas para o meu WhatsApp e vamos estruturar o seu crescimento.
                        </p>

                        <a href={generateWhatsAppMessage()} target="_blank" rel="noopener noreferrer" className="btn-vm-green-large" style={{ textDecoration: 'none', display: 'inline-flex', width: '100%', maxWidth: '400px' }}>
                            Agendar Diagnóstico Estratégico
                        </a>
                    </div>
                )}

            </main>
        </div>
    );
}
