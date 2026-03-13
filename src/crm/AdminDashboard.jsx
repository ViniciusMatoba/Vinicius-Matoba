import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, setPersistence, inMemoryPersistence } from 'firebase/auth';
import KanbanBoard from './KanbanBoard';
import VMEvaluation from './VMEvaluation';

// App secundário para criar usuários sem deslogar o admin
const firebaseConfig = {
  apiKey: "AIzaSyCvYZ6ZcI1rjkLF5KLKZMtzM-Q6ELwoB7A",
  authDomain: "vinicius-matoba.firebaseapp.com",
  projectId: "vinicius-matoba",
  storageBucket: "vinicius-matoba.firebasestorage.app",
  messagingSenderId: "169394728371",
  appId: "1:169394728371:web:ec1ce35f170ceb0244afc6",
};

const secondaryApp = getApps().find(a => a.name === 'secondary')
  || initializeApp(firebaseConfig, 'secondary');
const secondaryAuth = getAuth(secondaryApp);

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

export default function AdminDashboard() {
  const [clients, setClients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', password: '', initialStage: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [evaluationClient, setEvaluationClient] = useState(null); // { id, name } do cliente a ser avaliado

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const clientsList = [];
      querySnapshot.forEach((docSnap) => {
        if (docSnap.data().role === 'client') {
          clientsList.push({ id: docSnap.id, ...docSnap.data() });
        }
      });
      setClients(clientsList);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err.message);
    }
  };

  async function handleAddClient(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Iniciando processo de cadastro...");
      
      // Configurar persistência em memória para o app secundário
      // Isso evita conflitos com o login do admin no localStorage
      await setPersistence(secondaryAuth, inMemoryPersistence);
      console.log("Persistência em memória configurada.");

      // 1. Criar conta real no Firebase Auth usando o app secundário
      console.log("Criando usuário no Firebase Auth (e-mail: " + newClient.email + ")...");
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        newClient.email,
        newClient.password
      );
      const newUser = userCredential.user;
      console.log("Usuário criado com sucesso no Auth. UID:", newUser.uid);

      // 2. Deslogar o app secundário
      await secondaryAuth.signOut();

      // 3. Salvar dados do cliente no Firestore
      console.log("Salvando dados no Firestore (UserID: " + newUser.uid + ")...");
      await setDoc(doc(db, 'users', newUser.uid), {
        name: newClient.name, // Ajustado para salvar o nome corretamente
        email: newClient.email,
        displayName: newClient.name,
        role: 'client',
        stage: newClient.initialStage,
        requirePasswordChange: true,
        requireNameEntry: true,
        createdAt: new Date().toISOString()
      });
      console.log("Dados salvos com sucesso no Firestore.");

      // 4. [E-MAIL DESATIVADO] Aguardando validação do DNS no Resend (~4h)
      // Para reativar: descomente o bloco abaixo após o domínio viniciusmatoba.com.br ser validado.
      //
      // await fetch('http://localhost:3001/api/send-welcome', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: newClient.name, email: newClient.email, password: newClient.password })
      // });

      setShowAddModal(false);
      const savedName = newClient.name;
      const savedId = newUser.uid;
      setNewClient({ name: '', email: '', password: '', initialStage: 1 });
      fetchClients();

      // Abre a Avaliação VM automaticamente com o ID real do cliente
      setEvaluationClient({ id: savedId, name: savedName });

    } catch (err) {
      console.error("Erro no cadastro:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Este e-mail já está cadastrado no sistema.");
      } else if (err.code === 'auth/weak-password') {
        setError("A senha deve ter pelo menos 6 caracteres.");
      } else if (err.code === 'auth/invalid-email') {
        setError("E-mail inválido. Verifique o formato.");
      } else {
        setError(err.message || "Erro desconhecido ao cadastrar.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 style={{ fontWeight: 800, fontSize: '2rem' }}>Gerenciamento de Clientes</h1>
          <p style={{ opacity: 0.6 }}>Acompanhe as etapas da VM para cada projeto.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="crm-btn-primary" style={{ width: 'auto', padding: '0.8rem 1.5rem' }}>
          + Novo Cliente
        </button>
      </div>

      <KanbanBoard
        clients={clients}
        onUpdateClient={fetchClients}
        isAdmin={true}
        onOpenEvaluation={(client) => setEvaluationClient({ id: client.id, name: client.displayName || client.name || client.email })}
      />

      {showAddModal && (
        <div className="method-modal-overlay" onClick={() => { setShowAddModal(false); setError(null); }}>
          <div className="method-modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>Cadastrar Novo Cliente</h2>
            <p style={{ opacity: 0.6, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              No primeiro login, o cliente precisará trocar a senha e confirmar seu nome.
            </p>
            <form onSubmit={handleAddClient}>
              <div className="crm-input-group">
                <label>Nome do Cliente</label>
                <input
                  type="text"
                  className="crm-input"
                  placeholder="Ex: João Empresa"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  required
                />
              </div>
              <div className="crm-input-group">
                <label>E-mail (Login)</label>
                <input
                  type="email"
                  className="crm-input"
                  placeholder="email@empresa.com"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  required
                />
              </div>
              <div className="crm-input-group">
                <label>Senha Inicial</label>
                <input
                  type="text"
                  className="crm-input"
                  placeholder="Mínimo 6 caracteres"
                  value={newClient.password}
                  onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <div className="crm-input-group">
                <label>Etapa Inicial</label>
                <select
                  className="crm-input"
                  value={newClient.initialStage}
                  onChange={(e) => setNewClient({ ...newClient, initialStage: parseInt(e.target.value) })}
                >
                  {STAGES.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', border: '1px solid #fee2e2' }}>
                  ⚠️ {error}
                </div>
              )}

              <button disabled={loading} type="submit" className="crm-btn-primary" style={{ marginTop: '0.5rem' }}>
                {loading ? 'Criando conta...' : '✅ Criar Conta'}
              </button>
            </form>
          </div>
        </div>
      )}
      {evaluationClient && (
        <VMEvaluation
          clientName={evaluationClient.name}
          clientId={evaluationClient.id}
          readOnly={false}
          onClose={() => setEvaluationClient(null)}
        />
      )}
    </div>
  );
}
