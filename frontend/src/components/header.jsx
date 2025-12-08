import React from "react";
import { Box, Stack, Container } from "@mui/material";
import './header.css'

export default function Header(){
    return(
        <header>
            <div className="empresa">
                <img src="/logo_XT2.png" className="logo"/>
                <label>Xavantina Terraplenagens</label>
            </div>
            <div className="navegacao">
                <a href="maquinas.jsx">Máquinas</a>
                <a href="horas.jsx">Horas</a>
                <a href="relatorioMensal.jsx">Relatórios</a>
                <a href="alterar_senha.jsx">Alterar Senha</a>
            </div>
        </header>
    )
}