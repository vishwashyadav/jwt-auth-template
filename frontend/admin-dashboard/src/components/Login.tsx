import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUser } from '../utils/api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!username.trim()) {
      setError('Username is required!');
      return;
    }
    if (!password) {
      setError('Password is required!');
      return;
    }
    try {
      const response: any = await loginUser({ username, password });
      if (!response.token) {
        setError(response.message || 'Login failed.');
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        if (response.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      }, 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to Admin Dashboard</h2>
        <p className="login-desc">Login to continue</p>
        <form onSubmit={handleLogin} className="register-form">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="login-input"
            autoFocus
            style={{marginBottom: '1rem'}}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="login-input"
            style={{marginBottom: '1rem'}}
          />
          <button type="submit" className="login-btn admin" style={{marginTop: '0.5rem', width: '100%'}}>
            {success ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="error-msg">{error}</div>}
         {success && <div className="success-msg">Login successful! Redirecting...</div>}
        </form>
        <p style={{marginTop: '1rem'}}>
          Don't have an account? <a href="/register" style={{color: '#2575fc'}}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
