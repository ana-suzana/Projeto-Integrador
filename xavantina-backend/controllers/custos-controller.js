const express = require("express");
const custosService = require("../services/custos-service");

const custosRouter = express.Router();

custosRouter.get("/todos", custosService.retornaTodosCustos);
custosRouter.get("/:id", custosService.retornaCustoPorId);
custosRouter.post("/", custosService.criaCusto);
custosRouter.put("/atualiza/:id", custosService.atualizaCusto);
custosRouter.delete("/delete/:id", custosService.deletaCusto);

module.exports = custosRouter;