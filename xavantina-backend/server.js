const express = require("express");
const servicoRouter = require("./controllers/servico-controller");
const maquinaRouter = require("./controllers/maquina-controller");
const funcionarioRouter = require("./controllers/funcionario-controller");
const clienteRouter = require("./controllers/cliente-controller");
const horasRouter = require("./controllers/horas-controller");
const custosRouter = require("./controllers/custos-controller");

const app = express();
app.use(express.json());

const PORT = 3002;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}.`));

const cors = require("cors");
app.use(cors());


app.use("/servico", servicoRouter)
app.use("/maquina", maquinaRouter);
app.use("/funcionario", funcionarioRouter);
app.use("/cliente", clienteRouter);
app.use("/horas", horasRouter);
app.use("/custos", custosRouter);

