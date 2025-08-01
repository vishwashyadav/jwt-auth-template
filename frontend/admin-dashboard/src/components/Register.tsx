import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import './Register.css';
import { registerUser } from '../utils/api';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!username.trim()) {
      setError('Username is required!');
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    if (!password) {
      setError('Password is required!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    try {
      const response: any = await registerUser({ username, password, role });
      // If response is 200, treat as success
      setSuccess(true);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/login');
      }, 1800);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card register-card animated-card">
        <h2 style={{marginBottom: '0.5rem'}}>Create Your Account</h2>
        <p className="login-desc">Sign up to access your dashboard</p>
        <form onSubmit={handleRegister} className="register-form">
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
          <div className="login-btn-group" style={{marginBottom: '1rem'}}>
            <label className={role === 'admin' ? 'selected-role' : ''}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
              <span style={{marginLeft: 8}}>Admin</span>
            </label>
            <label className={role === 'user' ? 'selected-role' : ''}>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')}
              />
              <span style={{marginLeft: 8}}>User</span>
            </label>
          </div>
          <button type="submit" className="login-btn admin" style={{marginTop: '0.5rem', width: '100%'}}>
            {success ? 'Registered! Redirecting...' : 'Register'}
          </button>
          {error && <div className="error-msg">{error}</div>}
          {showPopup && (
            <div className="popup-success">
              <div className="popup-content">
                <h3>Registration Successful!</h3>
                <p>You will be redirected to login.</p>
              </div>
            </div>
          )}
        </form>
        <p style={{marginTop: '1rem'}}>
          Already have an account? <a href="/login" style={{color: '#2575fc'}}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
