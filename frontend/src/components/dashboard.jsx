import React, {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import Header from "./header";
import './telas.css';
import './dashboard.css';
// import axios from "axios";

export default function Dashboard() {
    const [totalServicos, setTotalServicos] = useState(0);
    const [totalHoras, setTotalHoras] = useState(0);

    /*
    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const resServicos = await axios.get('http://localhost:3002/servicos/total');
            setTotalServicos(resServicos.data.total);

            const resHoras = await axios.get('http://localhost:3002/horas/total');
            setTotalHoras(resHoras.data.total);

        } catch (err) {
            console.error("Erro ao carregar dados do dashboard:", err);
        }
    };
    */

    return (
        <>
            <Header activeTab="Início" onTabChange={() => {}} />
            <div className="container">
                <section className="dashboard_header">
                    <h1>Tela de Início</h1>
                    <p>Bem-vindo ao Sistema de Custos e Controle Geral da Xavantina Terraplenagens!</p>
                </section>

                <section className="main">
                    <Card className="cards">
                        <CardContent>
                            <h2>Total de Serviços</h2>
                            <p>{totalServicos}</p>
                        </CardContent>
                    </Card>

                    <Card className="cards">
                        <CardContent>
                            <h2>Total de Horas Trabalhadas</h2>
                            <p>{totalHoras}</p>
                        </CardContent>
                    </Card>
                </section>

                <footer id="footer">
                    <h2>Contato</h2>
                    <p>Para dúvidas, entre em contato por e-mail xt@gmail.com</p>
                    <p>Desenvolvido por <a href="https://github.com/anascatolon">Ana Luiza Scatolon</a> e <a href="https://github.com/ana-suzana">Ana Tereza Suzana</a></p>
                </footer>
            </div>
        </>
    );
}
