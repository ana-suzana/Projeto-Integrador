const model = require("../models");

const obterTodosClientes = async () => {
  return await model.Cliente.findAll();
};

module.exports = { obterTodosClientes };