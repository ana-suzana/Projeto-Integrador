import React from "react";
import { useNavigate } from 'react-router-dom';
import './header.css'

export default function Header({ activeTab = 'Dashboard', onTabChange = () => {} }){
    // Definindo o texto (nome) de cada botão da barra de navegação e o caminho de cada um
    const menuItems = [
      { label: 'Início',  path: '/dashboard'  },
      { label: 'Serviços',  path: '/servicos'  },
      { label: 'Horas',      path: '/horas'     },
      { label: 'Custos',     path: '/custos'    },
      { label: 'Relatórios', path: '/relatorio'}
    ];
    const navigate = useNavigate();

    //Função para sair do sistema - como não foi implementado autenticação, apenas redireciona para a tela de login
    const handleLogout = async () => {
        navigate('./login');
        window.alert('Logout realizado com sucesso!');
    };
    
    // Função para navegação entre as telas - chamada ao clicar em um dos botões
    const handleNav = (item) => {
        onTabChange(item.label); // avisando o componente qual aba foi clicada
        navigate(item.path); 
    };

    return(
        <header className="header"> {/*Container do header */}
            <div className="empresa"> {/*Informações da empresa */}
                <img src="/logo_XT2.png" className="logo" alt="XT"/>
                <label>Xavantina Terraplenagens</label>
            </div>

            {/* Barra de navegação */}
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