// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import UploadPage from './components/UploadPage';
import QuizPage from './components/QuizPage';
import QuizHistory from './components/QuizHistory';
import './App.css';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<QuizHistory />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
