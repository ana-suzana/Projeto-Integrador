const express = require("express");
const horasService = require("../services/horas-service");

const horasRouter = express.Router();

// GET /horas/todos - Listar todos os registros de horas
horasRouter.get("/todos", horasService.retornaTodasHoras);

// GET /horas/:id - Buscar registro específico
horasRouter.get("/:id", horasService.retornaHoraPorId);

// POST /horas - Novo apontamento de horas
horasRouter.post("/", horasService.criaHora);

// PUT /horas/atualiza/:id - Atualizar apontamento
horasRouter.put("/atualiza/:id", horasService.atualizaHora);

// DELETE /horas/delete/:id - Remover apontamento
horasRouter.delete("/delete/:id", horasService.deletaHora);

module.exports = horasRouter;