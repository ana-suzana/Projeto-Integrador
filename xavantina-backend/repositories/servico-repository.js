const model = require("../models");

// Obter todos os serviços
const obterTodosServicos = async () => {
	// Inclui dados do cliente para facilitar a exibição no frontend
	return await model.Servico.findAll({
		include: [
			{
				model: model.Cliente,
				attributes: ["idcliente", "nome"], // Traz apenas o necessário
			},
		],
	});
};

// Obter serviço por ID
const obterServicoPorId = async (id) => {
	return await model.Servico.findByPk(id, {
		include: [
			{
				model: model.Cliente,
			},
			// trazer histórico de horas desse serviço
			{ 
                model: model.Horas,
                include: ['funcionario', 'maquina'] // Se quiser detalhar
            } 
            
		],
	});
};

// Obter serviços por ID do Cliente
const obterServicosPorCliente = async (idCliente) => {
	return await model.Servico.findAll({
		where: { fk_cliente_idcliente: idCliente },
		include: [{ model: model.Cliente, as: "cliente" }],
	});
};

// Criar serviço
const criarServico = async (servico) => {
	return await model.Servico.create(servico);
};

// Atualizar serviço
const atualizarServico = async (id, dadosAtualizados) => {
	try {
		const servico = await model.Servico.findByPk(id);
		if (!servico) return null;

		await servico.update(dadosAtualizados);
		return servico;
	} catch (error) {
		throw error;
	}
};

// Deletar serviço
const deletarServico = async (id) => {
	try {
		const servico = await model.Servico.findByPk(id);
		if (!servico) return null;

		// O SQL tem ON DELETE CASCADE nas Horas, então deletar o serviço deletará as horas associadas
		await servico.destroy();
		return servico;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	obterTodosServicos,
	obterServicoPorId,
	obterServicosPorCliente,
	criarServico,
	atualizarServico,
	deletarServico,
};