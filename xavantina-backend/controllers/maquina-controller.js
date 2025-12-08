const express = require("express");
const maquinaService = require("../services/maquina-service");
const router = express.Router();

router.get("/todos", maquinaService.retornaTodasMaquinas);

module.exports = router;