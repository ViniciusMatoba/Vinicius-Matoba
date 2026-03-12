import React from 'react';
import { useAuth } from '../context/AuthContext';

const STAGES = [
  { id: 1, title: 'Diagnosticar', description: 'Entender o cenário atual e identificar gargalos.' },
  { id: 2, title: 'Posicionar', description: 'Definir como o negócio deve ser percebido pelo mercado.' },
  { id: 3, title: 'Planejar', description: 'Construir um plano estratégico de comunicação e crescimento.' },
  { id: 4, title: 'Executar', description: 'Colocar o plano em prática com consistência.' },
  { id: 5, title: 'Analisar', description: 'Avaliar dados para entender o que realmente funciona.' },
  { id: 6, title: 'Otimizar', description: 'Ajustar continuamente a estratégia para evoluir.' }
];

export default function ClientView() {
  const { userData } = useAuth();
  const currentStage = userData?.stage || 1;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: '1rem' }}>Seu Progresso de Crescimento</h1>
        <p style={{ opacity: 0.6 }}>Acompanhe em tempo real as etapas da sua estratégia VM.</p>
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
    </div>
  );
}
