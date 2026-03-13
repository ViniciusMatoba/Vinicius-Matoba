import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const STAGES = [
  { id: 1, title: '1° contato' },
  { id: 2, title: 'Orçamento' },
  { id: 3, title: 'Aprovação' },
  { id: 4, title: 'Diagnosticar' },
  { id: 5, title: 'Posicionar' },
  { id: 6, title: 'Planejar' },
  { id: 7, title: 'Executar' },
  { id: 8, title: 'Analisar' },
  { id: 9, title: 'Otimizar' }
];

export default function KanbanBoard({ clients, onUpdateClient, isAdmin, onOpenEvaluation }) {

  async function moveClient(clientId, newStage) {
    if (!isAdmin) return;
    try {
      const clientRef = doc(db, 'users', clientId);
      await updateDoc(clientRef, { stage: newStage });
      onUpdateClient();
    } catch (err) {
      console.error(err);
      alert('Erro ao mover cliente');
    }
  }

  return (
    <div className="kanban-container">
      {STAGES.map((stage) => (
        <div key={stage.id} className="kanban-column">
          <div className="kanban-column-header">
            <h3 className="kanban-column-title">{stage.title}</h3>
            <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>
              {clients.filter(c => c.stage === stage.id).length} clientes
            </span>
          </div>

          <div className="kanban-cards-wrapper">
            {clients
              .filter(client => client.stage === stage.id)
              .map(client => (
                <div key={client.id} className="kanban-card">
                  <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
                    {client.displayName || client.name || 'Cliente'}
                  </h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.75rem' }}>{client.email}</p>

                  {isAdmin && (
                    <div className="card-management" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <select
                        className="stage-select-mini"
                        value={client.stage}
                        onChange={(e) => moveClient(client.id, parseInt(e.target.value))}
                      >
                        <option value="" disabled>Mudar para etapa:</option>
                        {STAGES.map(s => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                      {onOpenEvaluation && (
                        <button
                          onClick={() => onOpenEvaluation(client)}
                          style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          📊 Avaliação VM
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
