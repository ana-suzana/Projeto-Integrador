const model = require("../models");

// Obter todos os custos (com dados da máquina)
const obterTodosCustos = async () => {
	const include = [];
	if (model.Maquina) {
		include.push({
			model: model.Maquina,
			as: "maquina",
			attributes: ["id", "modelo"],
		});
	}

	return await model.Custos.findAll({
		include: include,
		order: [["dt_lancamento", "DESC"]],
	});
};

// Obter custo por ID
const obterCustoPorId = async (id) => {
	return await model.Custos.findByPk(id);
};

// Obter custos por Máquina (Útil para relatórios)
const obterCustosPorMaquina = async (idMaquina) => {
	return await model.Custos.findAll({
		where: { fk_Maquina_ID: idMaquina },
		order: [["dt_lancamento", "DESC"]],
	});
};

// Criar custo
const criarCusto = async (custo) => {
	return await model.Custos.create(custo);
};

// Atualizar custo
const atualizarCusto = async (id, dadosAtualizados) => {
	const custo = await model.Custos.findByPk(id);
	if (!custo) return null;
	await custo.update(dadosAtualizados);
	return custo;
};

// Deletar custo
const deletarCusto = async (id) => {
	const custo = await model.Custos.findByPk(id);
	if (!custo) return null;
	await custo.destroy();
	return custo;
};

module.exports = {
	obterTodosCustos,
	obterCustoPorId,
	obterCustosPorMaquina,
	criarCusto,
	atualizarCusto,
	deletarCusto,
};