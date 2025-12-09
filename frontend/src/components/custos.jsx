import React, { useState, useEffect } from "react";
import "./custos.css";
import Header from "./header";
import axios from 'axios';

export default function CustosPage() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [editarItem, setEditarItem] = useState(null);

  const [form, setForm] = useState({descricao: "", valor: "", maquinaId: "", categoria: "", dt_lancamento: ""});

  /* DADOS ESTÁTICOS PARA TESTE
  const [lista, setLista] = useState([
    { id: 1, descricao: "Combustível", valor: -2000, maquina: "escavadeira", categoria: "Operacional", data: "2024-01-15" },
    { id: 2, descricao: "Manutenção", valor: -1500, maquina: "trator", categoria: "Manutenção", data: "2024-01-12" }
  ]);*/

  const [lista, setLista] = useState([]);
  const [maquinas, setMaquinas] = useState([]);


  async function carregarDados() {
    try {
      const response = await axios.get("http://localhost:3002/custos/todos");
      // O backend retorna { custos: [...] }
      setLista(response.data.custos);
    } catch (error) {
      console.error("Erro ao carregar custos:", error);
      alert("Erro ao carregar lista de custos.");
  }}

  async function carregarMaquinas() {
    try {
      const response = await axios.get("http://localhost:3002/maquina/todos");
      setMaquinas(response.data.maquinas);
    } catch (error) {
      console.error("Erro ao carregar máquinas:", error);
    }
  }
  
  useEffect(() => {
    carregarDados();
    carregarMaquinas();
  }, []);

  function abrirNovo() {
    setEditarItem(null);
    setForm({ descricao: "", valor: "", maquinaId: "", categoria: "", data: "" });
    setMostrarPopup(true);
  }

  function abrirEditar(item) {
    setEditarItem(item);
    setForm(item);
    setMostrarPopup(true);
  };
  
    const salvar = async () => {
    // Validação simples
    if ( !form.descricao || !form.valor || !form.maquinaId || !form.dt_lancamento ) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    // Objeto pronto para o Backend (mapeando nomes)
    const payload = {
        descricao: form.descricao,
        valor: parseFloat(form.valor),
        maquinaId: parseInt(form.maquinaId),
        categoria: form.categoria,
        dtLancamento: form.dt_lancamento
    };

    try {
        if (editarItem) {
            // ATUALIZAR (PUT)
            await axios.put(`http://localhost:3002/custos/atualiza/${editarItem.id}`, payload);
            alert("Custo atualizado com sucesso!");
        } else {
            // CRIAR (POST)
            await axios.post("http://localhost:3002/custos/", payload);
            alert("Custo registrado com sucesso!");
        }
        
        setMostrarPopup(false);
        carregarDados(); // Recarrega a tabela
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar. Verifique o console.");
    }
  }

  const deletar = async (item) => {
    if(!confirm(`Deseja excluir o custo "${item.descricao}"?`)) return;

    try {
        await axios.delete(`http://localhost:3002/custos/delete/${item.id}`);
        carregarDados();
    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao excluir item.");
    }
  }


  return (
    <>
    <Header activeTab="Custos" onTabChange={() => {}}/>
    <div className="custos_container">
      <div className="custos_header">
        <h1>Custos e Despesas</h1>
        <button className="botao_novo" onClick={abrirNovo}>+ Novo Custo</button>
      </div>

      <table className="tabela">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Máquina</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {lista.map(item => (
            <tr key={item.id}>
              <td>{item.descricao}</td>
              <td>{item.valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</td>
              <td>{item.Maquina.modelo }</td>
              <td>{item.categoria}</td>
              <td>{item.dt_lancamento}</td>
              <td>
                <button className="botao_editar" onClick={() => abrirEditar(item)}>Editar</button>
                <button className="botao_deletar" onClick={() => deletar(item)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* POPUP */}
      {mostrarPopup && (
        <div className="popup_container">
          <div className="popup">
            <h2>{editarItem ? "Editar Custo" : "Novo Custo"}</h2>

            <label>Data</label>
            <input type="date" value={form.dt_lancamento} onChange={e => setForm({ ...form, dt_lancamento: e.target.value })} />

            <label>Categoria</label>
            <input type="text" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />

            <label>Máquina</label>
              <select style={{color: 'black'}}
                value={form.maquinaId || ""}
                onChange={e => setForm({ ...form, maquinaId: e.target.value })}
              >
                <option value="">Selecione uma máquina</option>

                {maquinas.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.modelo}
                  </option>
                ))}
              </select>


            <label>Valor (R$)</label>
            <input type="number" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} />

            <label>Descrição</label>
            <input type="text" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />

            <div className="popup_botoes">
              <button className="botao_deletar" onClick={() => setMostrarPopup(false)}>Cancelar</button>
              <button className="botao_editar" onClick={salvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
