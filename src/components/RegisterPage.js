import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';  // Ensure you have the appropriate styles in RegisterPage.css

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/users/register/', {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      });

      // Handle successful registration (e.g., redirect to login page)
      alert('Registration successful');
      navigate('/login');  // Redirect to login page
    } catch (error) {
      console.error('Registration failed:', error);
      setError(
        error.response && error.response.data
          ? JSON.stringify(error.response.data)
          : error.message || 'Registration failed'
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
          required
        />
        <p className="password-criteria">
          Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.
        </p>
        <button type="submit" className="register-button">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RegisterPage;
