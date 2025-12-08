const express = require("express");
const servicoService = require("../services/servico-service");

const servicoRouter = express.Router();

// Rotas CRUD
servicoRouter.get("/todos", servicoService.retornaTodosServicos);
servicoRouter.get("/:id", servicoService.retornaServicoPorId);
servicoRouter.post("/", servicoService.criaServico);
servicoRouter.put("/atualiza/:id", servicoService.atualizaServico);
servicoRouter.delete("/delete/:id", servicoService.deletaServico);

module.exports = servicoRouter;