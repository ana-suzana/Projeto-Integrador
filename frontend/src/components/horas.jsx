import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./telas.css";
import "./horas.css";
import Header from "./header";

export default function Horas() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [editarItem, setEditarItem] = useState(null);
  const [form, setForm] = useState({maquina: "", servico: "", hora_inicial: "", hora_final: "", total: "", data: ""});
  const [maquinaFiltro, setMaquinaFiltro] = useState(""); // estado para o filtro de máquina

  // DADOS ESTÁTICOS PARA TESTE
  const [lista, setLista] = useState([
    { id: 1, maquina: "Escavadeira", servico: "Terraplanagem lote 10", hora_inicial: 100, hora_final: 150, total: (100-150), data: "2024-01-15" },
    { id: 2, maquina: "Trator", servico: "Terraplanagem lote 20", hora_inicial: 380, hora_final: 400, total: (400-380), data: "2024-01-20" }
  ]);

   // máquinas únicas da lista (para popular o Select)
  const maquinas = [...new Set(lista.map(item => item.maquina))];

  // filtrar lista baseado na máquina selecionada
  const listaFiltrada = maquinaFiltro === "" ? lista : lista.filter(item => item.maquina === maquinaFiltro);

  function abrirNovo() {
    setEditarItem(null);
    setForm({ maquina: "", servico: "", hora_inicial: "", hora_final: "", data: "" });
    setMostrarPopup(true);
  }

  function abrirEditar(item) {
    setEditarItem(item);
    setForm(item);
    setMostrarPopup(true);
  }

  function salvar() {
    if (editarItem) {
      setLista(lista.map(i => i.id === editarItem.id ? form : i));
    } else {
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
    <Header activeTab="Horas" onTabChange={() => {}}/>
    <div className="tela_container">
      <div className="tela_header">
        <h1>Horas Trabalhadas</h1>
        <button className="botao_novo" onClick={abrirNovo}>+ Registrar Horas</button>
      </div>

        <div className="caixa_selecao">
            <label>Filtrar por máquina</label>
            <select
              value={maquinaFiltro}
              onChange={e => setMaquinaFiltro(e.target.value)}
            >
              <option value="">Todas as Máquinas</option>
              {maquinas.map(maquina => (
                <option key={maquina} value={maquina}>{maquina}</option>
              ))}
            </select>
        </div>

      <table className="tabela">
        <thead>
          <tr>
            <th>Máquina</th>
            <th>Serviço</th>
            <th>Hora Inicial</th>
            <th>Hora Final</th>
            <th>Total</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {listaFiltrada.map(item => (
            <tr key={item.id}>
              <td>{item.maquina}</td>
              <td>{item.servico}</td>
              <td>{item.hora_inicial}</td>
              <td>{item.hora_final}</td>
              <td>{item.total}</td>
              <td>{item.data}</td>
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
            <input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} />

            <label>Servico</label>
            <input type="text" value={form.servico} onChange={e => setForm({ ...form, servico: e.target.value })} />

            <label>Máquina</label>
            <input type="text" value={form.maquina} onChange={e => setForm({ ...form, maquina: e.target.value })} />

            <label>Hora Inicial</label>
            <input type="number" value={form.hora_inicial} onChange={e => setForm({ ...form, hora_inicial: e.target.value })} />

            <label>Hora Final</label>
            <input type="number" value={form.hora_final} onChange={e => setForm({ ...form, hora_final: e.target.value })} />

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
