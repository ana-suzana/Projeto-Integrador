import { useState, useEffect } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import Login from "./components/login";
import Servicos from "./components/servicos";
import Custos from "./components/custos"
import Horas from "./components/horas"

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rota 1: O componente Login */}
        <Route path="/login" element={<Login handleLogin={() => {}} />} />
        
        {/* Rota 2: Tela protegida */}
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/custos" element={<Custos />} />
        <Route path="/horas" element={<Horas />} />

        {/* 3. Redirecionamento Automático: Qualquer acesso à raiz "/" vai para "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 4. Rota Coringa para qualquer URL inválida */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
