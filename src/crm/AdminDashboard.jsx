import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, getDoc, initializeFirestore } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, inMemoryPersistence, sendPasswordResetEmail } from 'firebase/auth';
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

const secondaryApp = getApps().find(app => app.name === 'clientCreator') || initializeApp(firebaseConfig, 'clientCreator');
const secondaryAuth = getAuth(secondaryApp);
// Forçar Long Polling também na conexão secundária para evitar travamentos de rede
initializeFirestore(secondaryApp, {
  experimentalForceLongPolling: true
});

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
    ensureAdminDoc();
    fetchClients();
  }, []);

  const ensureAdminDoc = async () => {
    if (!auth.currentUser) return;
    try {
      console.log("[DEBUG] Verificando existência do documento Admin...");
      const adminRef = doc(db, 'users', auth.currentUser.uid);
      const snap = await getDoc(adminRef);
      if (!snap.exists()) {
        console.log("[DEBUG] Documento Admin não encontrado. Criando...");
        await setDoc(adminRef, {
          name: 'Vinícius Matoba',
          email: auth.currentUser.email,
          role: 'admin',
          createdAt: new Date().toISOString()
        });
        console.log("[DEBUG] Documento Admin criado com sucesso.");
      } else {
        console.log("[DEBUG] Documento Admin já existe.");
      }
    } catch (err) {
      console.error("[DEBUG] Erro Crítico no Firestore:", err);
      // Tentar extrair o código de erro específico do Firebase
      const errorCode = err.code || (err.message && err.message.includes('permission-denied') ? 'permission-denied' : 'unknown');
      
      let msg = "Erro de Conexão: " + err.message;
      if (errorCode === 'permission-denied') {
        msg = "ERRO DE PERMISSÃO: O seu acesso ao banco de dados está bloqueado pelas regras do Firebase.";
      } else if (errorCode === 'unavailable') {
        msg = "ERRO DE REDE: O banco de dados está offline ou inacessível no momento.";
      }
      
      setError(`[Código: ${errorCode}] ${msg}`);
    }
  };

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
      console.log("[DEBUG] 1. Iniciando processo (v1.1.2)...");
      
      setLoadingStep('Segurança...');
      try {
        await setPersistence(secondaryAuth, inMemoryPersistence);
      } catch (pErr) {
        console.warn("[DEBUG] Erro de persistência:", pErr);
      }

      // 1. Criar o acesso do cliente (Firebase Auth)
      setLoadingStep('Criando Acesso...');
      // Usamos uma senha provisória que será trocada pelo link de e-mail
      const passwordToUse = newClient.password || Math.random().toString(36).slice(-10);
      
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        newClient.email,
        passwordToUse
      );
      const newUser = userCredential.user;
      console.log("[DEBUG] 4. Acesso criado: " + newUser.uid);

      // 2. Salvar no Banco de Dados (Firestore)
      setLoadingStep('Salvando no Banco...');
      console.log("[DEBUG] 6. Tentando escrita v1.1.2...");
      
      const userRef = doc(db, 'users', newUser.uid);
      
      // Timeout de 8 segundos para diagnóstico
      const savePromise = setDoc(userRef, {
        name: newClient.name,
        email: newClient.email,
        displayName: newClient.name,
        role: 'client',
        stage: parseInt(newClient.initialStage),
        requirePasswordChange: true,
        requireNameEntry: true,
        createdAt: new Date().toISOString(),
        perfilAvaliado: false
      }, { merge: true });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("O Banco de Dados não respondeu (8s). Verifique as 'Security Rules' no Console do Firebase.")), 8000)
      );

      await Promise.race([savePromise, timeoutPromise]);
      console.log("[DEBUG] 7. Dados salvos com sucesso.");

      // 3. Enviar e-mail para o cliente criar a própria senha
      setLoadingStep('Enviando Convite...');
      try {
        await sendPasswordResetEmail(auth, newClient.email);
        console.log("[DEBUG] 8. Convite enviado.");
      } catch (emailErr) {
        console.warn("Aviso: Acesso criado, mas falha ao enviar e-mail:", emailErr.message);
      }

      // 4. Finalização
      alert("Cadastro concluído com sucesso! O e-mail de acesso foi enviado ao cliente.");
      
      secondaryAuth.signOut().catch(e => console.warn("Erro ao deslogar:", e));

      setLoadingStep('Atualizando...');
      setNewClient({ name: '', email: '', password: '', initialStage: 1 });
      await fetchClients();

      setShowAddModal(false);
      // Abre automaticamente a janela de avaliação
      setEvaluationClient({ id: newUser.uid, name: newClient.name });

    } catch (err) {
      console.error("[DEBUG] ERRO NO PROCESSO:", err);
      
      if (err.code === 'auth/email-already-in-use') {
        setLoadingStep('Recuperando...');
        try {
          const recoveryCredential = await signInWithEmailAndPassword(secondaryAuth, newClient.email, newClient.password);
          const recoveredUser = recoveryCredential.user;
          
          setLoadingStep('Salvando...');
          const userRef = doc(db, 'users', recoveredUser.uid);
          await setDoc(userRef, {
            name: newClient.name,
            email: newClient.email,
            displayName: newClient.name,
            role: 'client',
            stage: parseInt(newClient.initialStage),
            requirePasswordChange: true,
            requireNameEntry: true,
            createdAt: new Date().toISOString()
          }, { merge: true });
          
          await secondaryAuth.signOut();
          setShowAddModal(false);
          setEvaluationClient({ id: recoveredUser.uid, name: newClient.name });
          await fetchClients();
          return;
        } catch {
          setError("Este e-mail já existe e a senha está incorreta.");
          return;
        }
      }

      setError("Falha Crítica (v1.1.2): " + (err.message || "Erro desconhecido"));
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
          <p style={{ opacity: 0.6 }}>Acompanhe as etapas da VM para cada projeto. <button onClick={() => window.location.reload(true)} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: 'inherit' }}>Limpar Cache</button></p>
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
            <h2 style={{ marginBottom: '0.5rem' }}>Cadastrar Novo Cliente <span style={{ fontSize: '0.6rem', opacity: 0.3 }}>v1.1.2</span></h2>
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
