import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabaseSecret = 'your-supabase-secret';

const supabase = createClient(supabaseUrl, supabaseKey, supabaseSecret);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signIn({ email: username, password: password });
      if (error) {
        setLoginError(error.message);
      } else {
        setLoginError(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({ email: email, password: password }, {
        data: {
          username: username,
        },
      });
      if (error) {
        setSignupError(error.message);
      } else {
        setSignupError(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'app dark-mode' : 'app'}>
      {currentPage === 'home' && (
        <div className="home-page">
          <div className="glassmorphic-card">
            <h1>Welcome to our website!</h1>
            <p>We're glad you're here.</p>
            <button className="login-button" onClick={() => setCurrentPage('login')}>Login</button>
            <button className="signup-button" onClick={() => setCurrentPage('signup')}>Signup</button>
          </div>
        </div>
      )}
      {currentPage === 'login' && (
        <div className="login-page">
          <div className="glassmorphic-card">
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="login-button" onClick={handleLogin}>Login</button>
            <button className="back-button" onClick={() => setCurrentPage('home')}>Back</button>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          </div>
        </div>
      )}
      {currentPage === 'signup' && (
        <div className="signup-page">
          <div className="glassmorphic-card">
            <h1>Signup</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className="signup-button" onClick={handleSignup}>Signup</button>
            <button className="back-button" onClick={() => setCurrentPage('home')}>Back</button>
            {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
            {password !== confirmPassword && <p style={{ color: 'red' }}>Passwords do not match</p>}
          </div>
        </div>
      )}
      <button className="toggle-dark-mode-button" onClick={handleToggleDarkMode}>Toggle Dark Mode</button>
    </div>
  );
}

export default App;
