import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

export default function VMLogin() {
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

                <form className="login-form">
                    <div className="form-group">
                        <label>E-mail de Acesso</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            className="login-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="login-input"
                        />
                    </div>

                    <button type="submit" className="btn-login">
                        ENTRAR NO DASHBOARD
                    </button>
                </form>

                <div className="login-footer">
                    <Link to="/" className="back-link-login">Voltar para o site</Link>
                </div>
            </div>
        </div>
    );
}
