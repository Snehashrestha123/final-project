import React, { useState } from 'react';
import './Login.css';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const res = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('admin-auth', 'true');
      onLogin();
    } else {
      setError(data.message || 'Invalid email or password');
    }
  } catch (err) {
    setError('Server error');
  }
};

  return (
    <div className="login-modal">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <div className="login-error">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;




