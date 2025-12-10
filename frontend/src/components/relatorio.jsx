import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, MenuItem, Select } from "@mui/material";
import Header from "./header";
import "./relatorio.css";

export default function Relatorio() {
    // estados para armazenar os dados do relatório
    const [servicos, setServicos] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [totalReceitas, setTotalReceitas] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);
    const [totalLucro, setTotalLucro] = useState(0);
    const [totalCustoHora, setTotalCustoHora] = useState(0);
    const [mesSelecionado, setMesSelecionado] = useState("");

    // Usando dados estáticos
    const [listaServicos, setListaServicos] = useState([
       { id: 1, descricao: "Terraplanagem lote 10", valor: 5000, data: "2024-01-15" },
       { id: 2, descricao: "Terraplanagem lote 11", valor: 8900, data: "2024-02-15" },
       { id: 2, descricao: "Terraplanagem lote 12", valor: 3100, data: "2024-01-10" },
    ]);

    const [listaDespesas, setListaDespesas] = useState([
        { categoria: "Peças", valor: 100, mes: 12 },
        { categoria: "Transporte", valor: 40, mes: 12 },
        { categoria: "Ferramentas", valor: 200, mes: 11 },
        { categoria: "Luz", valor: 180, mes: 10 },
    ]);

    // Pegando o número do mês dos serviços para filtrar
    useEffect(() => {
        if (mesSelecionado !== "") {
            filtrarPorMes(mesSelecionado);
        }
    }, [mesSelecionado]);

    // Função para filtrar os dados de serviço e de despesas pelo mês selecionado
    function filtrarPorMes(mes) {
        const s = listaServicos.filter(item => item.mes === Number(mes));
        const d = listaDespesas.filter(item => item.mes === Number(mes));

        setServicos(s);
        setDespesas(d);

        calcularTotalReceitas(s);
        calcularTotalDespesas(d);
    }

    function calcularTotalReceitas(listaServicos) {
        let total = listaServicos.reduce((sum, item) => sum + Number(item.valor), 0);
        setTotalReceitas(total);
    }

    function calcularTotalDespesas(listaServicos) {
        let total = listaServicos.reduce((sum, item) => sum + Number(item.valor), 0);
        setTotalDespesas(total);
    }

    // Calcular lucro 
    useEffect(() => {
        setTotalLucro(totalReceitas - totalDespesas);
    }, [totalReceitas, totalDespesas]);

    // Lista de meses para o select de filtro
    const meses = [
        { num: 1, nome: "Janeiro" },
        { num: 2, nome: "Fevereiro" },
        { num: 3, nome: "Março" },
        { num: 4, nome: "Abril" },
        { num: 5, nome: "Maio" },
        { num: 6, nome: "Junho" },
        { num: 7, nome: "Julho" },
        { num: 8, nome: "Agosto" },
        { num: 9, nome: "Setembro" },
        { num: 10, nome: "Outubro" },
        { num: 11, nome: "Novembro" },
        { num: 12, nome: "Dezembro" },
    ];

    return (
        <>
            <Header activeTab="Relatórios" onTabChange={() => { }} />
            <div className="container">
                <section className="container_header">
                    <h1>Relatórios</h1>
                    {/* SELECT DE FILTRO */}
                <div className="box_selecao">
                    <h3>Filtrar por mês</h3>

                    <select
                        value={mesSelecionado}
                        onChange={(e) => setMesSelecionado(e.target.value)}
                        displayEmpty
                        sx={{ width: 200, background: "#fff" }}
                    >
                        <option disabled value="">
                            Selecione um mês
                        </option>

                        {meses.map(m => (
                            <option
                                key={m.num}
                                value={m.num}
                                sx={{
                                    "&:hover": { color: "black" },
                                    "&.Mui-selected": { color: "black" },
                                    "&.Mui-selected:hover": { color: "black" }
                                }}
                            >
                                {m.nome}
                            </option>
                        ))}
                    </select>
                </div>

                </section>

                
                {/* CARDS DE RESUMO */}
                <section className="cards_container">
                    <Card className="cards">
                        <CardContent>
                            <h2>Receita</h2>
                            <p style={{color: "green"}}>R$ {totalReceitas.toFixed(2)}</p>
                        </CardContent>
                    </Card>
                    <Card className="cards">
                        <CardContent>
                            <h2>Despesas</h2>
                            <p style={{color: "red"}}>R$ {totalDespesas.toFixed(2)}</p>
                        </CardContent>
                    </Card>
                    <Card className="cards">
                        <CardContent>
                            <h2>Lucro</h2>
                            <p style={{color: "green"}}>R$ {totalLucro.toFixed(2)}</p>
                        </CardContent>
                    </Card>
                    <Card className="cards">
                        <CardContent>
                            <h2>Custo da hora</h2>
                            <p style={{color: "blue"}}>R$ {totalCustoHora.toFixed(2)}</p>
                        </CardContent>
                    </Card>
                </section>

                {/*}
                <Card className="card_detalhes">
                    <CardContent className="cardContent">
                        <section>
                            Receitas Detalhadas
                        </section>

                        {listaServicos.length === 0 ? (
                            <p>Nenhum serviço neste mês</p>
                        ) : (
                            listaServicos.map((s, index) => (
                                <div key={index} style={{ marginTop: 8 }}>
                                    {s.descricao} — R$ {s.valor}
                                </div>
                            ))
                        )}

                        <section>
                            Total de Receitas:
                            <span className="totReceitas">
                                R$ {totalReceitas.toFixed(2)}
                            </span>
                        </section>
                    </CardContent>
                </Card>

                
                <Card className="card_detalhes">
                    <CardContent className="cardContent">
                        <section>
                            Despesas Detalhadas
                        </section>

                        {listaDespesas.length === 0 ? (
                            <p>Nenhuma despesa neste mês</p>
                        ) : (
                            listaDespesas.map((d, index) => (
                                <div key={index} style={{ marginTop: 8 }}>
                                    {d.categoria} — R$ {d.valor}
                                </div>
                            ))
                        )}

                        <section>
                            Total de Despesas:
                            <span className="totDespesas">
                                R$ {totalDespesas.toFixed(2)}
                            </span>
                        </section>
                    </CardContent>
                </Card>
                */}
            </div>
        </>
    );
}
