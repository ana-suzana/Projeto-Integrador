const express = require("express");
const clienteService = require("../services/cliente-service");
const clienteRouter = express.Router();

clienteRouter.get("/todos", clienteService.retornaTodosClientes);

module.exports = clienteRouter;