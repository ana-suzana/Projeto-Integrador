import { useState, useEffect } from 'react'
import React from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./components/login";
import Dashboard from "./components/dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rota 1: O componente Login */}
        <Route path="/login" element={<Login handleLogin={() => {}} />} /> 
        
        {/* Rota 2: Tela protegida */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 3. Redirecionamento Automático: Qualquer acesso à raiz "/" vai para "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 4. Rota Coringa para qualquer URL inválida */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
