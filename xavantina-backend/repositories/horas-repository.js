const model = require("../models");

// Obter todas as horas (com joins para exibir nomes, se os models existirem)
const obterTodasHoras = async () => {
	const include = [];

    include.push({ 
        model: model.Funcionario, 
        as: "funcionario",
        attributes: ['id', 'nome'] // Traz apenas o necessário
    });

    include.push({ 
        model: model.Servico, 
        as: "servico",
        attributes: ['id', 'descricao']
    });
    include.push({ 
        model: model.Maquina, 
        as: "maquina",
        attributes: ['id', 'modelo'] 
    });

	return await model.Horas.findAll({
		include: include,
		order: [["data", "desc"], ["hr_inicial", "ASC"]],
	});
};

// Obter horas por ID
const obterHoraPorId = async (id) => {
	return await model.Horas.findByPk(id);
};

// Obter horas por ID de Serviço
const obterHorasPorServico = async (idServico) => {
	return await model.Horas.findAll({
		where: { fk_Servico_ID: idServico },
	});
};

// Criar registro de horas
const criarHora = async (dadosHora) => {
	return await model.Horas.create(dadosHora);
};

// Atualizar horas
const atualizarHora = async (id, dadosAtualizados) => {
    try {
        const hora = await model.Horas.findByPk(id);
        if (!hora) return null;
        
        await hora.update(dadosAtualizados);
        return hora;
    } catch (error) {
        throw error;
    }
};

// Deletar horas
const deletarHora = async (id) => {
    try {
        const hora = await model.Horas.findByPk(id);
        if (!hora) return null;
        
        await hora.destroy();
        return hora;
    } catch (error) {
        throw error;
    }
};

module.exports = {
	obterTodasHoras,
	obterHoraPorId,
	obterHorasPorServico,
	criarHora,
	atualizarHora,
	deletarHora,
};