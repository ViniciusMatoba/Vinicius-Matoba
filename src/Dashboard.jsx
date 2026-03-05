import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, LogOut, Plus } from 'lucide-react';

const METODO_VM = [
    "Diagnosticar", "Posicionar", "Planejar", "Executar", "Analisar", "Otimizar"
];

export default function Dashboard() {
    // Exemplo de estado inicial
    const [clientes, setClientes] = useState([
        { id: 1, nome: "Cliente Exemplo Alpha", etapa: 1 },
        { id: 2, nome: "Cliente Beta Corp", etapa: 3 }
    ]);

    const moverCliente = (id, direcao) => {
        setClientes(prev => prev.map(c =>
            c.id === id ? { ...c, etapa: Math.min(Math.max(c.etapa + direcao, 1), 6) } : c
        ));
    };

    return (
        <div className="backstage-dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <h2 className="dashboard-brand">AGÊNCIA <span className="brand-accent">VM</span></h2>
                    <p className="dashboard-subtitle">Controle de Fluxo Operacional</p>
                </div>
                <div className="header-actions">
                    <button className="btn-new-client">
                        <Plus size={18} /> NOVO CLIENTE
                    </button>
                    <Link to="/" className="btn-logout" title="Sair">
                        Sair <LogOut size={18} />
                    </Link>
                </div>
            </header>

            <div className="kanban-grid">
                {METODO_VM.map((etapaNome, index) => {
                    const etapaNum = index + 1;
                    return (
                        <div key={etapaNum} className="kanban-column">
                            <header className="column-header">
                                <span className="step-label">Etapa 0{etapaNum}</span>
                                <h3 className="column-title">{etapaNome}</h3>
                            </header>

                            <div className="kanban-items">
                                {clientes.filter(c => c.etapa === etapaNum).map(cliente => (
                                    <div key={cliente.id} className="kanban-card">
                                        <p className="client-name">{cliente.nome}</p>
                                        <div className="card-controls">
                                            <button
                                                onClick={() => moverCliente(cliente.id, -1)}
                                                className="btn-move back"
                                                disabled={etapaNum === 1}
                                            >
                                                ← VOLTAR
                                            </button>
                                            <button
                                                onClick={() => moverCliente(cliente.id, 1)}
                                                className="btn-move forward"
                                                disabled={etapaNum === 6}
                                            >
                                                AVANÇAR →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
