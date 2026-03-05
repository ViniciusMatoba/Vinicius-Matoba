import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, LogOut, Plus } from 'lucide-react';
import { db, auth } from './firebase';
import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    doc,
    query,
    orderBy
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const METODO_VM = [
    "Diagnosticar", "Posicionar", "Planejar", "Executar", "Analisar", "Otimizar"
];

export default function Dashboard() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Carregar Clientes do Firestore em Tempo Real
    useEffect(() => {
        const q = query(collection(db, "clientes"), orderBy("etapa", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setClientes(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // 2. Mover Cliente entre Etapas
    const moverCliente = async (id, direcao) => {
        const cliente = clientes.find(c => c.id === id);
        if (!cliente) return;

        const novaEtapa = Math.min(Math.max(cliente.etapa + direcao, 1), 6);

        try {
            const clienteRef = doc(db, "clientes", id);
            await updateDoc(clienteRef, { etapa: novaEtapa });
        } catch (err) {
            console.error("Erro ao mover cliente:", err);
            alert("Erro ao atualizar etapa do cliente.");
        }
    };

    // 3. Adicionar Novo Cliente (Simples prompt por enquanto)
    const adicionarCliente = async () => {
        const nome = prompt("Nome do novo cliente:");
        if (!nome) return;

        try {
            await addDoc(collection(db, "clientes"), {
                nome: nome,
                etapa: 1,
                createdAt: new Date()
            });
        } catch (err) {
            console.error("Erro ao adicionar cliente:", err);
            alert("Erro ao cadastrar cliente.");
        }
    };

    // 4. Logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (err) {
            console.error("Erro ao sair:", err);
        }
    };

    if (loading) {
        return (
            <div className="backstage-dashboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Carregando Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="backstage-dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <h2 className="dashboard-brand">AGÊNCIA <span className="brand-accent">VM</span></h2>
                    <p className="dashboard-subtitle">Controle de Fluxo Operacional</p>
                </div>
                <div className="header-actions">
                    <button className="btn-new-client" onClick={adicionarCliente}>
                        <Plus size={18} /> NOVO CLIENTE
                    </button>
                    <button onClick={handleLogout} className="btn-logout" title="Sair" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        Sair <LogOut size={18} />
                    </button>
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
