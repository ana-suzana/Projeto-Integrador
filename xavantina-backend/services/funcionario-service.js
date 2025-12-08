const funcionarioRepository = require("../repositories/funcionario-repository");

const retornaTodosFuncionarios = async (req, res) => {
  try {
    const funcionarios = await funcionarioRepository.obterTodosFuncionarios();
    res.status(200).json({ funcionarios });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  retornaTodosFuncionarios,
};