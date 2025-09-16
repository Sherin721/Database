// src/components/Login.tsx
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { useAuth } from '../hooks/useAuth';
import './Login.css'; 

export default function Login({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  
  const { login, register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const user = login(trimmedEmail, trimmedPassword);

    if (user) {
      setMessage("Login Successful!");
      onLogin(user.email); 
    } else {
      setMessage("Access Denied: Invalid email or password.");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    if (!trimmedEmail || !trimmedPassword) {
      setMessage("Email and password cannot be empty.");
      return;
    }

    const isSuccessful = register(trimmedEmail, trimmedPassword);
    
    if (isSuccessful) {
      setMessage("Registration Successful! You can now log in.");
    } else {
      setMessage("Registration Failed: A user with this email already exists.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>
        <div className="button-group">
          <button type="submit" className="login-button">Login <CiLogin /></button>
          <button type="button" onClick={handleRegister} className="register-button">Register</button>
        </div>
        {message && <p className={`message ${message.includes("Successful") ? 'success' : 'error'}`}>{message}</p>}
      </form>
    </div>
  );
}