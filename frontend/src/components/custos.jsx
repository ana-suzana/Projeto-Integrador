import React, { useState } from "react";
import "./custos.css";
import Header from "./header";

export default function CustosPage() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [editarItem, setEditarItem] = useState(null);

  const [form, setForm] = useState({descricao: "", valor: "", maquina: "", categoria: "", data: ""});

  // DADOS ESTÁTICOS PARA TESTE
  const [lista, setLista] = useState([
    { id: 1, descricao: "Combustível", valor: -2000, maquina: "escavadeira", categoria: "Operacional", data: "2024-01-15" },
    { id: 2, descricao: "Manutenção", valor: -1500, maquina: "trator", categoria: "Manutenção", data: "2024-01-12" }
  ]);

  function abrirNovo() {
    setEditarItem(null);
    setForm({ descricao: "", valor: "", maquina: "", categoria: "", data: "" });
    setMostrarPopup(true);
  }

  function abrirEditar(item) {
    setEditarItem(item);
    setForm(item);
    setMostrarPopup(true);
  }

  function salvar() {
    if (editarItem) {
      // atualizar
      setLista(lista.map(i => i.id === editarItem.id ? form : i));
    } else {
      // criar
      const novo = { ...form, id: Date.now() };
      setLista([...lista, novo]);
    }
    setMostrarPopup(false);
  }

  function deletar(item) {
    setLista(lista.filter(i => i.id !== item.id));
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
              <td>{item.maquina}</td>
              <td>{item.categoria}</td>
              <td>{item.data}</td>
              <td>
                <button className="btn-edit" onClick={() => abrirEditar(item)}>Editar</button>
                <button className="btn-delete" onClick={() => deletar(item)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* POPUP */}
      {mostrarPopup && (
        <div className="popup-fundo">
          <div className="popup">
            <h2>{editarItem ? "Editar Custo" : "Novo Custo"}</h2>

            <label>Data</label>
            <input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} />

            <label>Categoria</label>
            <input type="text" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />

            <label>Tipo</label>
            <input type="text" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} />

            <label>Valor (R$)</label>
            <input type="number" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} />

            <label>Descrição</label>
            <input type="text" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />

            <div className="popup-botoes">
              <button onClick={() => setMostrarPopup(false)}>Cancelar</button>
              <button onClick={salvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
