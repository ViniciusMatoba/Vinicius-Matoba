import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ClientView from './ClientView';
import logo from '../assets/logo.png';
import './CRM.css';

export default function AgencyPortal() {
  const { currentUser, userData, login, logout, updateUserProfile, updatePassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (err) {
      console.error("Erro de login:", err);
      setError('Falha no login. Verifique suas credenciais.');
    }
    setLoading(false);
  }

  async function handleUpdateName(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await updateUserProfile({ name: newName, requireNameEntry: false });
    } catch (err) {
      setError('Erro ao salvar nome. Tente novamente.');
    }
    setLoading(false);
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await updatePassword(newPassword);
      await updateUserProfile({ requirePasswordChange: false });
    } catch (err) {
      setError('Erro ao alterar senha. Use uma senha mais forte (mínimo 6 caracteres).');
    }
    setLoading(false);
  }

  // Tela de Login
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
        </div>
      </div>
    );
  }

  // 1º passo do primeiro login: Trocar a senha temporária
  if (currentUser && userData?.requirePasswordChange) {
    return (
      <div className="crm-portal-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="crm-login-wrapper">
          <h2 style={{ marginBottom: '1rem', fontWeight: 800 }}>Alterar Senha 🔒</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.7 }}>Por segurança, crie uma senha pessoal para substituir a senha temporária enviada por e-mail.</p>
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}
          <form onSubmit={handleChangePassword}>
            <div className="crm-input-group">
              <label>Nova Senha</label>
              <input
                type="password"
                className="crm-input"
                placeholder="Mínimo 6 caracteres"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button disabled={loading} type="submit" className="crm-btn-primary">
              {loading ? 'Salvando...' : 'Salvar e Continuar →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2º passo do primeiro login: Preencher o nome
  if (currentUser && (!userData?.name || userData?.requireNameEntry)) {
    return (
      <div className="crm-portal-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="crm-login-wrapper">
          <h2 style={{ marginBottom: '1rem', fontWeight: 800 }}>Bem-vindo! 👋</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.7 }}>Para personalizar seu portal, informe seu nome completo.</p>
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}
          <form onSubmit={handleUpdateName}>
            <div className="crm-input-group">
              <label>Seu Nome Completo</label>
              <input
                type="text"
                className="crm-input"
                placeholder="Ex: João Silva"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <button disabled={loading} type="submit" className="crm-btn-primary">
              {loading ? 'Salvando...' : 'Entrar no Portal →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard principal
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
