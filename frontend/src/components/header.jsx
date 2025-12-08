import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './header.css'

export default function Header({ activeTab = 'Dashboard', onTabChange = () => {} }){
    const menuItems = [
      { label: 'Serviços',  path: '/dashboard'  },
      { label: 'Horas',      path: '/horas'     },
      { label: 'Custos',     path: '/custos'    },
      { label: 'Relatórios', path: '/relatorios'}
    ];
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3002/api/logout'); //colocar rota correta do back
        } catch (err) {
            console.warn('Logout backend falhou:', err);
        } finally {
            localStorage.removeItem('authToken');
            delete axios.defaults.headers.common['Authorization'];
            navigate('./login.jsx');
        }
    };

    const handleNav = (item) => {
        onTabChange(item.label);
        navigate(item.path);
    };

    return(
        <header className="header">
            <div className="empresa">
                <img src="/logo_XT2.png" className="logo" alt="XT"/>
                <label>Xavantina Terraplenagens</label>
            </div>

            <nav className="navegacao" role="navigation" aria-label="Principal">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        onClick={() => handleNav(item)}
                        aria-pressed={activeTab === item.label}
                        className={`botaoNav ${activeTab === item.label ? 'botaoNavActive' : ''}`}
                    >
                        {item.label}
                    </button>
                ))}

                <button
                    type="button"
                    className="botaoNav botaoSair"
                    onClick={handleLogout}
                >
                    Sair
                </button>
            </nav>
        </header>
    )
}