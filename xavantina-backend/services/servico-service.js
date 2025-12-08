const servicoRepository = require("../repositories/servico-repository");

const retornaTodosServicos = async (req, res) => {
	try {
		const servicos = await servicoRepository.obterTodosServicos();
		res.status(200).json({ servicos });
	} catch (error) {
		console.log("Erro ao buscar serviços:", error);
		res.sendStatus(500);
	}
};

const retornaServicoPorId = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const servico = await servicoRepository.obterServicoPorId(id);
		if (servico) {
			res.status(200).json(servico);
		} else {
			res.status(404).json({ message: "Serviço não encontrado" });
		}
	} catch (error) {
		console.log("Erro ao buscar serviço:", error);
		res.sendStatus(500);
	}
};

const criaServico = async (req, res) => {
	// Campos esperados no Body (camelCase do JSON vindo do React)
	// Mapeamos para snake_case/PascalCase do banco se necessário, mas o repository cuida disso se as chaves do objeto baterem com o model
	const { valorHora, status, dtFinal, dtInicio, clienteId, descricao } =
		req.body;

	try {
		// Validação básica
		if (!descricao || !clienteId || !valorHora) {
			return res.status(400).json({
				message: "Descrição, Cliente e Valor/Hora são obrigatórios.",
			});
		}

		// Monta o objeto para o Sequelize (chaves devem bater com o Model)
		const novoServico = await servicoRepository.criarServico({
			valor_hora: valorHora,
			status: status || "Não Iniciado",
			dt_final: dtFinal,
			dt_inicio: dtInicio,
			fk_cliente_idcliente: clienteId,
			descricao: descricao,
		});

		res.status(201).json(novoServico);
	} catch (error) {
		console.log("Erro ao criar serviço:", error);
		res.sendStatus(500);
	}
};

const atualizaServico = async (req, res) => {
	const id = parseInt(req.params.id);
	const { valorHora, status, dtFinal, dtInicio, clienteId, descricao } =
		req.body;

	try {
		// Monta objeto de atualização apenas com o que veio
		const dadosParaAtualizar = {};
		if (valorHora !== undefined) dadosParaAtualizar.valor_hora = valorHora;
		if (status !== undefined) dadosParaAtualizar.status = status;
		if (dtFinal !== undefined) dadosParaAtualizar.dt_final = dtFinal;
		if (dtInicio !== undefined) dadosParaAtualizar.dt_inicio = dtInicio;
		if (clienteId !== undefined)
			dadosParaAtualizar.fk_cliente_idcliente = clienteId;
		if (descricao !== undefined) dadosParaAtualizar.descricao = descricao;

		const servicoAtualizado = await servicoRepository.atualizarServico(
			id,
			dadosParaAtualizar,
		);

		if (servicoAtualizado) {
			res.status(200).json(servicoAtualizado);
		} else {
			res.status(404).json({ message: "Serviço não encontrado" });
		}
	} catch (error) {
		console.log("Erro ao atualizar serviço:", error);
		res.sendStatus(500);
	}
};

const deletaServico = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const servicoRemovido = await servicoRepository.deletarServico(id);

		if (servicoRemovido) {
			res
				.status(200)
				.json({ message: "Serviço removido.", servico: servicoRemovido });
		} else {
			res.status(404).json({ message: "Serviço não encontrado" });
		}
	} catch (error) {
		console.error("Erro ao deletar serviço:", error);
		res.status(500).json({ message: "Erro interno" });
	}
};

module.exports = {
	retornaTodosServicos,
	retornaServicoPorId,
	criaServico,
	atualizaServico,
	deletaServico,
};