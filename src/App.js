import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
    }
    else {
      setSignedIn(false);
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={signedIn ? <Home/> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;