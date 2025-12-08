const custosRepository = require("../repositories/custos-repository");

const retornaTodosCustos = async (req, res) => {
	try {
		const custos = await custosRepository.obterTodosCustos();
		res.status(200).json({ custos });
	} catch (error) {
		console.log("Erro ao buscar custos:", error);
		res.sendStatus(500);
	}
};

const retornaCustoPorId = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const custo = await custosRepository.obterCustoPorId(id);
		if (custo) {
			res.status(200).json(custo);
		} else {
			res.status(404).json({ message: "Custo não encontrado" });
		}
	} catch (error) {
		res.sendStatus(500);
	}
};

const criaCusto = async (req, res) => {
	const { descricao, categoria, valor, maquinaId, dtLancamento } = req.body;

	try {
		if (!descricao || !valor || !maquinaId || !dtLancamento) {
			return res.status(400).json({
				message: "Descrição, Valor, Máquina e Data são obrigatórios.",
			});
		}

		const novoCusto = await custosRepository.criarCusto({
			descricao: descricao,
			categoria: categoria || "Geral",
			valor: valor,
			fk_maquina_id: maquinaId,
			dt_lancamento: dtLancamento,
		});
		res.status(201).json(novoCusto);
	} catch (error) {
		console.log("Erro ao criar custo:", error);
		res.sendStatus(500);
	}
};

const atualizaCusto = async (req, res) => {
	const id = parseInt(req.params.id);
	const { descricao, categoria, valor, maquinaId, dtLancamento } = req.body;

	try {
		const dados = {};
		if (descricao) dados.descricao = descricao;
		if (categoria) dados.categoria = categoria;
		if (valor) dados.valor = valor;
		if (maquinaId) dados.fk_maquina_id = maquinaId;
		if (dtLancamento) dados.dt_lancamento = dtLancamento;

		const custoAtualizado = await custosRepository.atualizarCusto(id, dados);

		if (custoAtualizado) {
			res.status(200).json(custoAtualizado);
		} else {
			res.status(404).json({ message: "Custo não encontrado" });
		}
	} catch (error) {
		console.log("Erro ao atualizar custo:", error);
		res.sendStatus(500);
	}
};

const deletaCusto = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const removido = await custosRepository.deletarCusto(id);

		if (removido) {
			res.status(200).json({ message: "Custo removido com sucesso." });
		} else {
			res.status(404).json({ message: "Custo não encontrado" });
		}
	} catch (error) {
		res.status(500).json({ message: "Erro interno" });
	}
};

module.exports = {
	retornaTodosCustos,
	retornaCustoPorId,
	criaCusto,
	atualizaCusto,
	deletaCusto,
};