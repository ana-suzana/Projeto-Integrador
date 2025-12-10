import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import Login from "./components/login";
import Servicos from "./components/servicos";
import Custos from "./components/custos";
import Horas from "./components/horas";
import Dashboard from "./components/dashboard";
import Relatorio from "./components/relatorio";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  /*
  const navigate = useNavigate();
  const handleLogin = (loggedIn, user) => {
    setIsLoggedIn(loggedIn);
    setUsername(user);
    // redireciona para o dashboard após login bem-sucedido
    if (loggedIn) {
      navigate('/dashboard');
    }
  };
*/
  return (
    <BrowserRouter>
      <Routes>
        {/* Definindo as rotas e qual componente será ativado */}
        <Route path="/login" element={<Login handleLogin={() => {}} />} />

        <Route path="/servicos" element={<Servicos />} />
        <Route path="/custos" element={<Custos />} />
        <Route path="/horas" element={<Horas />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/*definindo que, para qualquer acesso à raiz "/", vai para "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
