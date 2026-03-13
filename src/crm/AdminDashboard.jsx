import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
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
  const [loadingStep, setLoadingStep] = useState('');
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
    setLoadingStep('Iniciando...');

    try {
      console.log("[DEBUG] Iniciando processo de cadastro...");
      
      // Configurar persistência em memória para o app secundário
      setLoadingStep('Configurando segurança...');
      try {
        await setPersistence(secondaryAuth, inMemoryPersistence);
        console.log("[DEBUG] Persistência em memória configurada.");
      } catch (pErr) {
        console.warn("[DEBUG] Erro ao definir persistência (pode ser ignorado se já estiver definido):", pErr);
      }

      // 1. Criar conta real no Firebase Auth usando o app secundário
      setLoadingStep('Criando usuário no Firebase Auth...');
      console.log("[DEBUG] Criando usuário: " + newClient.email);
      
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        newClient.email,
        newClient.password
      );
      const newUser = userCredential.user;
      console.log("[DEBUG] Usuário criado com sucesso no Auth. UID:", newUser.uid);

      // Verificação crítica: O Admin ainda está logado?
      console.log("[DEBUG] Validando sessão do Admin...");
      if (!auth.currentUser) {
        console.error("[DEBUG] Erro: Sessão do Admin perdida!");
        throw new Error("Sessão do administrador perdida. Por favor, faça login novamente.");
      }
      console.log("[DEBUG] Admin autenticado: " + auth.currentUser.email);

      // 3. Salvar dados do cliente no Firestore
      setLoadingStep('Salvando dados no banco de dados...');
      console.log("[DEBUG] Salvando no Firestore (UserID: " + newUser.uid + ")...");
      
      const userRef = doc(db, 'users', newUser.uid);
      
      // Criar uma promessa para o setDoc com timeout de 15 segundos
      const savePromise = setDoc(userRef, {
        name: newClient.name,
        email: newClient.email,
        displayName: newClient.name,
        role: 'client',
        stage: newClient.initialStage,
        requirePasswordChange: true,
        requireNameEntry: true,
        createdAt: new Date().toISOString()
      }, { merge: true });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("O banco de dados demorou muito para responder (Timeout 15s). Verifique sua conexão.")), 15000)
      );

      await Promise.race([savePromise, timeoutPromise]);
      console.log("[DEBUG] Dados salvos com sucesso no Firestore.");

      // 2. Deslogar o app secundário só DEPOIS de salvar com sucesso
      setLoadingStep('Limpando sessão temporária...');
      await secondaryAuth.signOut();
      console.log("[DEBUG] Sessão temporária encerrada.");

      setLoadingStep('Finalizando...');
      setShowAddModal(false);
      const savedName = newClient.name;
      const savedId = newUser.uid;
      
      setNewClient({ name: '', email: '', password: '', initialStage: 1 });
      await fetchClients();

      // Abre a Avaliação VM automaticamente
      setEvaluationClient({ id: savedId, name: savedName });

    } catch (err) {
      console.error("[DEBUG] Erro detalhado no cadastro:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Este e-mail já está em uso.");
      } else if (err.code === 'auth/weak-password') {
        setError("A senha é muito fraca.");
      } else if (err.code === 'auth/invalid-email') {
        setError("E-mail inválido.");
      } else if (err.code === 'permission-denied') {
        setError("Erro de permissão no banco de dados (Firestore).");
      } else {
        setError("Erro (" + (err.code || 'Desconhecido') + "): " + err.message);
      }
    } finally {
      setLoading(false);
      setLoadingStep('');
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

              <button disabled={loading} type="submit" className="crm-btn-primary" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                {loading && <div className="spinner-small" style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>}
                {loading ? (loadingStep || 'Criando conta...') : '✅ Criar Conta'}
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
