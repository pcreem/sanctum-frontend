import React, {
    useState,
  } from 'react';
  import apiClient from './services/api';
  
  const Login = ({
    isLoggedIn,
    onLogin,
  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const cb = async () => {
        await apiClient.get('sanctum/csrf-cookie');
        const response = await apiClient.post('login', {
          email,
          password,
        });
        if (response.status === 204) {
          onLogin();
        }
      };
      cb();
    };
  
    return (
      <div>
        <h3>Login</h3>
        {isLoggedIn ? (
          <div>You are logged in</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">
              Login
            </button>
          </form>
        )}
      </div>
    );
  };
  
  export default Login;