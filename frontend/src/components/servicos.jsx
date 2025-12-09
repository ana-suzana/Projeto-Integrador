//Tela com o CRUD de serviços
import React, { useState, useEffect } from "react";
import "./telas.css";
import Header from "./header.jsx";
import axios from 'axios';

export default function Servicos() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [editarItem, setEditarItem] = useState(null);
  const [form, setForm] = useState({IdCliente: "", descricao: "", valor_hora: "", status: "", dt_inicio: "", dt_final: ""});
  const [lista, setLista] = useState([]);
  const [clientes, setClientes] = useState([]);

  async function carregarDados() {
    try {
      const response = await axios.get("http://localhost:3002/servico/todos");
      setLista(response.data.servicos);
      console.log(response.data.servicos);
    } catch (error) {
      console.error("Erro ao carregar servico:", error);
      alert("Erro ao carregar lista de servico.");
  }}

  async function carregarClientes() {
    try {
      const response = await axios.get("http://localhost:3002/cliente/todos");
      setClientes(response.data.clientes);
    } catch (error) {
      console.error("Erro ao carregar máquinas:", error);
    }
  }
  
  useEffect(() => {
    carregarDados();
    carregarClientes();
  }, []);

  function abrirNovo() {
    setEditarItem(null);
    setForm({IdCliente: "", descricao: "", valor_hora: "", status: "", dt_inicio: "", dt_final: ""});
    setMostrarPopup(true);
  }

  function abrirEditar(item) {
    console.log(item);
    setEditarItem(item);
    setForm({IdCliente: item.fk_cliente_idcliente, 
      descricao: item.descricao,
      valor_hora: item.valor_hora,
      status: item.status,
      dt_inicio: item.dt_inicio,
      dt_final: item.dt_final});
    setMostrarPopup(true);
  };
  
    const salvar = async () => {
    // Validação simples
    if ( !form.descricao || !form.valor_hora || !form.IdCliente || !form.dt_inicio || !form.dt_final ) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    // Objeto pronto para o Backend (mapeando nomes)
    const payload = {
        descricao: form.descricao,
        valorHora: parseFloat(form.valor_hora),
        clienteId: parseInt(form.IdCliente),
        status: form.status,
        dtInicio: form.dt_inicio, 
        dtFinal: form.dt_final
    };

    console.log("Enviando Payload:", payload);

    try {
        if (editarItem) {
            // ATUALIZAR (PUT)
            await axios.put(`http://localhost:3002/servico/atualiza/${editarItem.id}`, payload);
            alert("Serviço atualizado com sucesso!");
        } else {
            // CRIAR (POST)
            await axios.post("http://localhost:3002/servico/", payload);
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
        await axios.delete(`http://localhost:3002/servico/delete/${item.id}`);
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
              <td>{item.Cliente.nome}</td>
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

            <label>Cliente</label>
              <select style={{color: 'black'}}
                value={form.IdCliente}
                onChange={e => setForm({ ...form, IdCliente: e.target.value })}
              >
                <option value="">Selecione um cliente</option>

                {clientes.map(m => (
                  <option key={m.idcliente} value={m.idcliente}>
                    {m.nome}
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
