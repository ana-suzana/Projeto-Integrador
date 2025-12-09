const horasRepository = require("../repositories/horas-repository");

const retornaTodasHoras = async (req, res) => {
	try {
		const horas = await horasRepository.obterTodasHoras();
		res.status(200).json({ horas });
	} catch (error) {
		console.log("Erro ao buscar horas:", error);
		res.sendStatus(500);
	}
};

const retornaHoraPorId = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const hora = await horasRepository.obterHoraPorId(id);
		if (hora) {
			res.status(200).json(hora);
		} else {
			res.status(404).json({ message: "Registro de horas não encontrado" });
		}
	} catch (error) {
		console.log("Erro ao buscar horas:", error);
		res.sendStatus(500);
	}
};

const criaHora = async (req, res) => {
    // Mapeia os dados do JSON (camelCase ou snake_case) para as variáveis
	const { data, hr_inicial, hr_final, funcionarioId, servicoId, maquinaId } = req.body;

	try {
		// Validação simples dos campos obrigatórios conforme o script SQL
		if (!data || !hr_inicial || !hr_final || !funcionarioId || !servicoId || !maquinaId) {
			return res
				.status(400)
				.json({ message: "Data, horários, funcionário, serviço e máquina são obrigatórios." });
		}

		const novaHora = await horasRepository.criarHora({
			data: data,
			hr_inicial: hr_inicial,
			hr_final: hr_final,
			fk_funcionario_id: funcionarioId,
			fk_servico_id: servicoId,
			fk_maquina_id: maquinaId,
		});
		res.status(201).json(novaHora);
	} catch (error) {
		console.log("Erro ao registrar horas:", error);
		res.sendStatus(500);
	}
};

const atualizaHora = async (req, res) => {
	const id = parseInt(req.params.id);
	const { data, hr_inicial, hr_final, funcionarioId, servicoId, maquinaId } = req.body;

	try {
        // Monta objeto apenas com os campos que foram enviados
		const dadosParaAtualizar = {};
		if (data) dadosParaAtualizar.data = data;
		if (hr_inicial) dadosParaAtualizar.hr_inicial = hr_inicial;
		if (hr_final) dadosParaAtualizar.hr_final = hr_final;
		if (funcionarioId) dadosParaAtualizar.fk_funcionario_id = funcionarioId;
		if (servicoId) dadosParaAtualizar.fk_servico_id = servicoId;
		if (maquinaId) dadosParaAtualizar.fk_maquina_id = maquinaId;

		const horaAtualizada = await horasRepository.atualizarHora(
			id,
			dadosParaAtualizar,
		);

		if (horaAtualizada) {
			res.status(200).json(horaAtualizada);
		} else {
			res.status(404).json({ message: "Registro não encontrado" });
		}
	} catch (error) {
		console.log("Erro ao atualizar horas:", error);
		res.sendStatus(500);
	}
};

const deletaHora = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const removido = await horasRepository.deletarHora(id);

		if (removido) {
			res.status(200).json({ message: "Registro removido com sucesso." });
		} else {
			res.status(404).json({ message: "Registro não encontrado" });
		}
	} catch (error) {
		console.log("Erro ao deletar horas:", error);
		res.status(500).json({ message: "Erro interno" });
	}
};

module.exports = {
	retornaTodasHoras,
	retornaHoraPorId,
	criaHora,
	atualizaHora,
	deletaHora,
};