import React, { useState } from 'react';
import {  } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ClientView from './ClientView';
import logo from '../assets/logo.png';
import './CRM.css';

export default function AgencyPortal() {
  const { currentUser, userData, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch {
      setError('Falha no login. Verifique suas credenciais.');
    }
    setLoading(false);
  }

  if (!currentUser) {
    return (
      <div className="crm-portal-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="crm-login-wrapper">
          <img src={logo} alt="VM Logo" className="crm-login-logo" />
          <h2 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Portal Agência VM</h2>
          
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="crm-input-group">
              <label>E-mail</label>
              <input 
                type="email" 
                className="crm-input" 
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="crm-input-group">
              <label>Senha</label>
              <input 
                type="password" 
                className="crm-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button disabled={loading} type="submit" className="crm-btn-primary">
              {loading ? 'Entrando...' : 'Acessar Portal'}
            </button>
          </form>
          
          <div style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>
            Seikivinicius@gmail.com / @Salvedbu13
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="crm-portal-container">
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <img src={logo} alt="VM Logo" style={{ height: '40px', filter: 'brightness(0)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Olá, {userData?.name || currentUser.email}</span>
          <button onClick={() => logout()} className="btn-secondary">Sair</button>
        </div>
      </nav>

      {userData?.role === 'admin' ? <AdminDashboard /> : <ClientView />}
    </div>
  );
}
