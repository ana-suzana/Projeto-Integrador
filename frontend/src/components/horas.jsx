import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./telas.css"; //estilizando
import "./horas.css"; //estilizando
import Header from "./header"; //cabeçalho
import axios from 'axios'

export default function Horas() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [editarItem, setEditarItem] = useState(null);
  const [form, setForm] = useState({funcionarioId: "", 
      servicoId: "", 
      maquinaId: "", 
      data: "", 
      hrInicial: "", 
      hrFinal: ""});

  const [lista, setLista] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [filtroMaquina, setFiltroMaquina] = useState("");// estado para o filtro de máquina

  async function carregarDados() {
    try {
      const response = await axios.get("http://localhost:3002/horas/todos");
      setLista(response.data.horas);
      console.log(response.data.horas);
    } catch (error) {
      console.error("Erro ao carregar servico:", error);
      alert("Erro ao carregar lista de servico.");
  }}

    // Carrega as listas auxiliares para os selects
  async function carregarAuxiliares() {
    try {
      const resFunc = await axios.get("http://localhost:3002/funcionario/todos");
      setFuncionarios(resFunc.data.funcionarios);

      const resServ = await axios.get("http://localhost:3002/servico/todos");
      setServicos(resServ.data.servicos);

      const resMaq = await axios.get("http://localhost:3002/maquina/todos");
      setMaquinas(resMaq.data.maquinas);
    } catch (error) {
      console.error("Erro ao carregar dados auxiliares:", error);
    }
  }

  useEffect(() => {
    carregarDados();
    carregarAuxiliares();
  }, []);

  // // DADOS ESTÁTICOS PARA TESTE
  // const [lista, setLista] = useState([
  //   { id: 1, maquina: "Escavadeira", servico: "Terraplanagem lote 10", hora_inicial: 100, hora_final: 150, total: (100-150), data: "2024-01-15" },
  //   { id: 2, maquina: "Trator", servico: "Terraplanagem lote 20", hora_inicial: 380, hora_final: 400, total: (400-380), data: "2024-01-20" }
  // ]);

  // Função para abrir o popup de novo registro
  function abrirNovo() {
    setEditarItem(null);
    setForm({ funcionarioId: "",
      servicoId: "",
      maquinaId: "",
      data: "",
      hrInicial: "",
      hrFinal: ""});
    setMostrarPopup(true);
  }

  // Função para abrir o popup de edição com os dados preenchidos
  function abrirEditar(item) {
    setEditarItem(item);
    setForm({funcionarioId: item.fk_funcionario_id,
    servicoId: item.fk_servico_id,
    maquinaId: item.fk_maquina_id,
    data: item.data,
    hrInicial: item.hr_inicial,
    hrFinal: item.hr_final});

    console.log("ITEM EDITAR:", item);
    console.log("hr_inicial:", item.hr_inicial);
    console.log("hr_final:", item.hr_final);
    setMostrarPopup(true);
  }

  const salvar = async () => {
    // Validação simples
    if ( !form.funcionarioId || !form.servicoId || !form.maquinaId || !form.data || !form.hrInicial || !form.hrFinal ) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    // Objeto pronto para o Backend 
    const payload = {
        funcionarioId: parseInt(form.funcionarioId),
        servicoId: parseInt(form.servicoId),
        maquinaId: parseInt(form.maquinaId),
        data: form.data,
        hr_inicial: form.hrInicial, 
        hr_final: form.hrFinal
    };

    console.log("Enviando Payload:", payload);

    try {
        if (editarItem) {
            // ATUALIZAR (PUT)
            await axios.put(`http://localhost:3002/horas/atualiza/${editarItem.id}`, payload);
            alert("horas atualizado com sucesso!");
        } else {
            // CRIAR (POST)
            await axios.post("http://localhost:3002/horas/", payload);
            alert("horas registrado com sucesso!");
        }
        
        setMostrarPopup(false);
        carregarDados(); // Recarrega a tabela
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar. Verifique o console.");
    }
  }

  const deletar = async (item) => {
    if(!confirm(`Deseja excluir este registro?`)) return;

    try {
        await axios.delete(`http://localhost:3002/horas/delete/${item.id}`);
        carregarDados();
    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao excluir item.");
    }
  }

  //LÓGICA DE FILTRO MAQUINAS
  const listaFiltrada = lista.filter(item => {
      // Se não tiver filtro, retorna tudo
      if (!filtroMaquina) return true;
      
      // Verifica se o ID da máquina no registro bate com o filtro
      const idMaqRegistro = item.fk_maquina_id;
      return idMaqRegistro == filtroMaquina; 
  });

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
              value={filtroMaquina}
              onChange={e => setFiltroMaquina(e.target.value)}
            >
              <option value="">Todas as Máquinas</option>
              {maquinas.map(m => (
                <option key={m.id} value={m.id}>{m.modelo}</option>
              ))}
            </select>
        </div>

      <table className="tabela">
        <thead>
          <tr>
            <th>Máquina</th>
            <th>Serviço</th>
            <th>Funcionário</th>
            <th>Data</th>
            <th>Hora Inicial</th>
            <th>Hora Final</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {listaFiltrada.map(item => (
            <tr key={item.id}>
              <td>{item.Maquina.modelo}</td>
              <td>{item.Servico.descricao}</td>
              <td>{item.Funcionario.nome}</td>
              <td>{item.data}</td>
              <td>{item.hr_inicial}</td>
              <td>{item.hr_final}</td>

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
            <h2>{editarItem ? "Editar Hora" : "Novo Hora"}</h2>

            <label>Data</label>
            <input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} />

            <label>Servico</label>
            <select 
                style={{color: 'black', padding: 5}}
                value={form.servicoId}
                onChange={e => setForm({ ...form, servicoId: e.target.value })}
            >
                <option value="">Selecione...</option>
                {servicos.map(s => (
                    <option key={s.id} value={s.id}>{s.descricao}</option>
                ))}
            </select>

            <label>Máquina</label>
            <select 
                style={{color: 'black', padding: 5}}
                value={form.maquinaId}
                onChange={e => setForm({ ...form, maquinaId: e.target.value })}
            >
                <option value="">Selecione...</option>
                {maquinas.map(m => (
                    <option key={m.id} value={m.id}>{m.modelo}</option>
                ))}
            </select>

            <label>Funcionário</label>
            <select style={{color: 'black', padding: 5}} value={form.funcionarioId} onChange={e => setForm({ ...form, funcionarioId: e.target.value })} >
              <option value="">Selecione...</option>
                {funcionarios.map(f => (
                    <option key={f.id} value={f.id}>{f.nome}</option>
                ))}
            </select>

            <label>Hora Inicial</label>
            <input type="time" value={form.hrInicial} onChange={e => setForm({ ...form, hrInicial: e.target.value })} />

            <label>Hora Final</label>
            <input type="time" value={form.hrFinal} onChange={e => setForm({ ...form, hrFinal: e.target.value })} />

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
