import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const STAGES = [
  { id: 1, title: 'Diagnosticar' },
  { id: 2, title: 'Posicionar' },
  { id: 3, title: 'Planejar' },
  { id: 4, title: 'Executar' },
  { id: 5, title: 'Analisar' },
  { id: 6, title: 'Otimizar' }
];

export default function KanbanBoard({ clients, onUpdateClient, isAdmin }) {
  
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
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{client.name}</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1rem' }}>{client.email}</p>
                  
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {stage.id > 1 && (
                        <button 
                          onClick={() => moveClient(client.id, stage.id - 1)}
                          style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        >
                          ←
                        </button>
                      )}
                      {stage.id < 6 && (
                        <button 
                          onClick={() => moveClient(client.id, stage.id + 1)}
                          style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid #ddd', marginLeft: 'auto' }}
                        >
                          →
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
