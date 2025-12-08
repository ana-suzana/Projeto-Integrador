const maquinaRepository = require("../repositories/maquina-repository");

const retornaTodasMaquinas = async (req, res) => {
  try {
    const maquinas = await maquinaRepository.obterTodasMaquinas();
    res.status(200).json({ maquinas });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  retornaTodasMaquinas,
};