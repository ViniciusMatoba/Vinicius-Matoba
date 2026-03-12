import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import KanbanBoard from './KanbanBoard';

export default function AdminDashboard() {
  const [clients, setClients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', password: '', whatsapp: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      if (isMounted) {
        const clientsList = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().role === 'client') {
            clientsList.push({ id: doc.id, ...doc.data() });
          }
        });
        setClients(clientsList);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const fetchClients = async () => {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const clientsList = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().role === 'client') {
        clientsList.push({ id: doc.id, ...doc.data() });
      }
    });
    setClients(clientsList);
  };

  async function handleAddClient(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Create user in Firebase Auth
      // Note: This is a bit tricky from a client-side admin panel without Admin SDK or Cloud Functions
      // For this demo/implementation, we'll assume the admin can create them.
      // In a real production app, you'd use a Cloud Function to avoid logging out the admin.
      // But for simplicity here, we'll just create the Firestore document and assume auth is handled or explained.
      
      // Since we can't easily create another user's auth without logging out,
      // we'll instruct the user to use the Firebase Console or we'd need a Cloud Function.
      // HOWEVER, I will implement the Firestore part and a placeholder for the logic.
      
      const clientData = {
        name: newClient.name,
        email: newClient.email,
        whatsapp: newClient.whatsapp,
        role: 'client',
        stage: 1, // Start at "Diagnosticar"
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'users'), clientData);
      
      setShowAddModal(false);
      setNewClient({ name: '', email: '', password: '', whatsapp: '' });
      fetchClients();
      alert('Cliente adicionado ao banco de dados! (Lembre-se de habilitar o login no Firebase Console com este e-mail)');
    } catch (err) {
      console.error(err);
      alert('Erro ao adicionar cliente.');
    }
    setLoading(false);
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

      <KanbanBoard clients={clients} onUpdateClient={fetchClients} isAdmin={true} />

      {showAddModal && (
        <div className="method-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="method-modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Cadastrar Novo Cliente</h2>
            <form onSubmit={handleAddClient}>
              <div className="crm-input-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  className="crm-input" 
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  required 
                />
              </div>
              <div className="crm-input-group">
                <label>E-mail (Login)</label>
                <input 
                  type="email" 
                  className="crm-input" 
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  required 
                />
              </div>
              <div className="crm-input-group">
                <label>WhatsApp</label>
                <input 
                  type="text" 
                  className="crm-input" 
                  value={newClient.whatsapp}
                  onChange={(e) => setNewClient({...newClient, whatsapp: e.target.value})}
                  required 
                />
              </div>
              <button disabled={loading} type="submit" className="crm-btn-primary">
                {loading ? 'Salvando...' : 'Confirmar Cadastro'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
