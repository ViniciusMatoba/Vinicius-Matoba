import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import VMEvaluation from './VMEvaluation';

const STAGES = [
  { id: 1, title: '1° contato', description: 'Recebemos seu interesse e estamos iniciando o diálogo.' },
  { id: 2, title: 'Orçamento', description: 'Elaborando a melhor proposta estratégica para seu negócio.' },
  { id: 3, title: 'Aprovação', description: 'Tudo pronto! Aguardando formalização para começar.' },
  { id: 4, title: 'Diagnosticar', description: 'Entender o cenário atual e identificar gargalos.' },
  { id: 5, title: 'Posicionar', description: 'Definir como o negócio deve ser percebido pelo mercado.' },
  { id: 6, title: 'Planejar', description: 'Construir um plano estratégico de comunicação e crescimento.' },
  { id: 7, title: 'Executar', description: 'Colocar o plano em prática com consistência.' },
  { id: 8, title: 'Analisar', description: 'Avaliar dados para entender o que realmente funciona.' },
  { id: 9, title: 'Otimizar', description: 'Ajustar continuamente a estratégia para evoluir.' }
];

export default function ClientView() {
  const { currentUser, userData } = useAuth();
  const currentStage = userData?.stage || 1;
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [hasEvaluation, setHasEvaluation] = useState(false);

  // Verifica se existe uma avaliação salva para este cliente
  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'users', currentUser.uid));
        if (snap.exists() && snap.data().vmEvaluation) {
          setHasEvaluation(true);
        }
      } catch (e) {
        console.error("Erro ao verificar avaliação:", e);
      }
    })();
  }, [currentUser]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: '1rem' }}>Seu Progresso de Crescimento</h1>
        <p style={{ opacity: 0.6 }}>Acompanhe em tempo real as etapas da sua estratégia VM.</p>

        {hasEvaluation && (
          <button
            onClick={() => setShowEvaluation(true)}
            style={{
              marginTop: '1rem',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.8rem 1.5rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.95rem',
              boxShadow: '0 4px 15px rgba(99,102,241,0.3)'
            }}
          >
            📊 Ver meu Diagnóstico VM
          </button>
        )}
      </div>

      <div className="client-progress-stepper" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {STAGES.map((stage) => {
          const isCompleted = currentStage > stage.id;
          const isCurrent = currentStage === stage.id;
          const isPending = currentStage < stage.id;

          return (
            <div
              key={stage.id}
              style={{
                display: 'flex',
                gap: '1.5rem',
                opacity: isPending ? 0.4 : 1,
                position: 'relative',
                padding: '1.5rem',
                background: isCurrent ? 'white' : 'transparent',
                borderRadius: '16px',
                boxShadow: isCurrent ? 'var(--crm-shadow)' : 'none',
                border: isCurrent ? '2px solid var(--crm-green)' : '2px solid transparent'
              }}
            >
              <div style={{
                flexShrink: 0,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isCompleted ? 'var(--crm-green)' : (isCurrent ? 'var(--crm-navy)' : '#cbd5e1'),
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.2rem',
                zIndex: 2
              }}>
                {isCompleted ? '✓' : stage.id}
              </div>

              <div>
                <h3 style={{
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  color: isCurrent ? 'var(--crm-green)' : 'inherit'
                }}>
                  {stage.title}
                  {isCurrent && <span style={{ marginLeft: '1rem', fontSize: '0.7rem', background: 'var(--crm-green)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '10px' }}>EM CURSO</span>}
                </h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{stage.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {showEvaluation && currentUser && (
        <VMEvaluation
          clientName={userData?.name || 'Você'}
          clientId={currentUser.uid}
          readOnly={true}
          onClose={() => setShowEvaluation(false)}
        />
      )}
    </div>
  );
}
