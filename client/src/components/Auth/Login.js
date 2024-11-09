// client/src/components/Auth/Login.js
import React, { useState } from 'react';
import { login } from '../../services/auth';

function Login({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await login(username, password);
    if (response.token) {
      history.push('/dashboard');  // Redirect after successful login
    } else {
      alert(response.message || 'Login failed');
    }
  };

  return (
    <div>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
