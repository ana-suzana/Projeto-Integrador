const model = require("../models");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  // Recebe username, password e o TIPO vindo do select do frontend
  const { username, password, tipo } = req.body; 

  try {
    let usuario = null;
    let role = ""; // admin, operador, cliente

    // --- LÓGICA PARA CLIENTE ---
    if (tipo === 'cliente') {
      // Busca na tabela Cliente pelo CPF/CNPJ
      const cliente = await model.Cliente.findOne({
        where: { CPF_CNPJ: username, senha: password }
      });

      if (cliente) {
        usuario = cliente;
        role = "cliente";
      }
    } 
    // --- LÓGICA PARA ADMINISTRADOR OU OPERADOR ---
    else if (tipo === 'administrador' || tipo === 'operador') {
      // Busca na tabela Funcionario pelo Nome
      const funcionario = await model.Funcionario.findOne({
        where: { Nome: username, senha: password }
      });

      if (funcionario) {
        // Verifica se o tipo selecionado bate com o cadastro no banco
        // Supondo: 'A' = Admin, 'O' = Operador
        const tipoNoBanco = funcionario.Funcionario_TIPO; // 'A' ou 'O'
        
        // Validação extra: Se selecionou Admin, tem que ser 'A' no banco
        if (tipo === 'administrador' && tipoNoBanco === 'A') {
            usuario = funcionario;
            role = "admin";
        } 
        // Se selecionou Operador, tem que ser 'O' no banco
        else if (tipo === 'operador' && tipoNoBanco === 'O') {
            usuario = funcionario;
            role = "operador";
        } else {
            // Se as credenciais existem mas o tipo está errado
            return res.status(401).json({ message: `Este usuário não tem permissão de ${tipo}` });
        }
      }
    }

    // --- GERAÇÃO DO TOKEN ---
    if (usuario) {
      const token = jwt.sign({ 
        id: usuario.ID || usuario.IdCliente, 
        role: role,
        nome: usuario.Nome 
      }, "SEGREDO_DA_XAVANTINA", { expiresIn: '1h' });

      return res.status(200).json({
        auth: true,
        token: token,
        role: role, // Envia 'admin', 'operador' ou 'cliente' para o front
        username: usuario.Nome
      });
    }

    res.status(401).json({ message: "Usuário ou senha inválidos!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

module.exports = { login };