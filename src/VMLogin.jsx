import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from './assets/logo.png';

export default function VMLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error("Erro ao fazer login:", err);
            setError('Credenciais inválidas ou erro de conexão.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="backstage-login-wrapper">
            <div className="login-card">
                {/* LOGO VM */}
                <div className="login-logo-section">
                    <img src={logo} alt="Logo VM" className="login-logo-img" style={{ width: '120px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
                    <h1 className="login-brand">
                        VINÍCIUS <span className="brand-accent">MATOBA</span>
                    </h1>
                    <p className="login-tagline">Estrategista Digital</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    {error && <p className="login-error-msg" style={{ color: '#ff4757', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
                    <div className="form-group">
                        <label>E-mail de Acesso</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? 'AUTENTICANDO...' : 'ENTRAR NO DASHBOARD'}
                    </button>
                </form>

                <div className="login-footer">
                    <Link to="/" className="back-link-login">Voltar para o site</Link>
                </div>
            </div>
        </div>
    );
}
