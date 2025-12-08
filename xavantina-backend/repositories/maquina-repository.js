const model = require("../models");

const obterTodasMaquinas = async () => {
  return await model.Maquina.findAll({
      attributes: ['id', 'modelo']
  });
};

module.exports = {
  obterTodasMaquinas,
};