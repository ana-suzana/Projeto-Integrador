const model = require("../models");

const obterTodosFuncionarios = async () => {
  return await model.Funcionario.findAll({
      attributes: ['id', 'nome']
  });
};

module.exports = {
  obterTodosFuncionarios,
};