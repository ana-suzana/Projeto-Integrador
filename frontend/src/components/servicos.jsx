//Tela com o CRUD de serviços
import React, { useState, useEffect } from "react";
import "./telas.css";
import Header from "./header";
import axios from 'axios';

export default function Servicos() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [editarItem, setEditarItem] = useState(null);
  const [form, setForm] = useState({cliente: "", descricao: "", valor_hora: "", status: "", dt_inicio: "", dt_final: ""});
  const [lista, setLista] = useState([]);

  async function carregarDados() {
    try {
      const response = await axios.get("http://localhost:3002/custos/todos");
      // O backend retorna { custos: [...] }
      setLista(response.dt_inicio.custos);
    } catch (error) {
      console.error("Erro ao carregar custos:", error);
      alert("Erro ao carregar lista de custos.");
  }}

  async function carregarMaquinas() {
    try {
      const response = await axios.get("http://localhost:3002/maquina/todos");
      setMaquinas(response.dt_inicio.maquinas);
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
    setForm({cliente: "", descricao: "", valor_hora: "", status: "", dt_inicio: "", dt_final: ""});
    setMostrarPopup(true);
  }

  function abrirEditar(item) {
    setEditarItem(item);
    setForm(item);
    setMostrarPopup(true);
  };
  
    const salvar = async () => {
    // Validação simples
    if ( !form.descricao || !form.valor_hora || !form.maquinaId || !form.dt_lancamento ) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    // Objeto pronto para o Backend (mapeando nomes)
    const payload = {
        descricao: form.descricao,
        valor_hora: parseFloat(form.valor_hora),
        maquinaId: parseInt(form.maquinaId),
        categoria: form.categoria,
        dtLancamento: form.dt_lancamento
    };

    try {
        if (editarItem) {
            // ATUALIZAR (PUT)
            await axios.put(`http://localhost:3002/servicos/atualiza/${editarItem.id}`, payload);
            alert("Serviço atualizado com sucesso!");
        } else {
            // CRIAR (POST)
            await axios.post("http://localhost:3002/servicos/", payload);
            alert("Serviço registrado com sucesso!");
        }
        
        setMostrarPopup(false);
        carregarDados(); // Recarrega a tabela
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar. Verifique o console.");
    }
  }

  const deletar = async (item) => {
    if(!confirm(`Deseja excluir o serviço "${item.descricao}"?`)) return;

    try {
        await axios.delete(`http://localhost:3002/servicos/delete/${item.id}`);
        carregarDados();
    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao excluir item.");
    }
  }

  return (
    <>
    <Header activeTab="Serviços" onTabChange={() => {}}/>
    <div className="tela_container">
      <div className="tela_header">
        <h1>Serviços</h1>
        <button className="botao_novo" onClick={abrirNovo}>+ Novo Serviço</button>
      </div>

      <table className="tabela">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Descrição</th>
            <th>valor</th>
            <th>Status</th>
            <th>Data Início</th>
            <th>Data Final</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {lista.map(item => (
            <tr key={item.id}>
              <td>{item.cliente}</td>
              <td>{item.descricao}</td>
              <td>{item.valor_hora.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</td>
              <td>{item.status}</td>
              <td>{item.dt_inicio}</td>
              <td>{item.dt_final}</td>
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
            <h2>{editarItem ? "Editar Serviço" : "Novo Serviço"}</h2>

            <label>Data Início</label>
            <input type="date" value={form.dt_inicio} onChange={e => setForm({ ...form, dt_inicio: e.target.value })} />

            <label>Data Final</label>
            <input type="date" value={form.dt_final} onChange={e => setForm({ ...form, dt_final: e.target.value })} />

            <label>Status</label>
            <input type="text" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />

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


            <label>valor (R$)</label>
            <input type="number" value={form.valor_hora} onChange={e => setForm({ ...form, valor_hora: e.target.value })} />

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
