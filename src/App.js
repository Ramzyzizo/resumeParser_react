import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/registerForm';
import Profile from './components/profile';
import LoginForm from './components/loginForm';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />}/> 
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
    </div>
    
  );
}

export default App;
