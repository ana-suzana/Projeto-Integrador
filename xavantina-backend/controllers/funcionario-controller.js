const express = require("express");
const funcionarioService = require("../services/funcionario-service");
const funcionariorRouter = express.Router();

// A única rota necessária para o dropdown
funcionariorRouter.get("/todos", funcionarioService.retornaTodosFuncionarios);

module.exports = funcionariorRouter;