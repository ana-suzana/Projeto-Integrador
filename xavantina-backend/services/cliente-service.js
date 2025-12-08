const clienteRepository = require("../repositories/cliente-repository");

const retornaTodosClientes = async (req, res) => {
  try {
    const clientes = await clienteRepository.obterTodosClientes();
    res.status(200).json({ clientes });
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { retornaTodosClientes };