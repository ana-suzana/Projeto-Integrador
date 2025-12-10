import React from "react";
import axios from "axios";
import './login.css';
import { Alert, Button, Snackbar, Stack, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

export default function Login({ handleLogin }) {
    const [username, setUsername] = React.useState("");
    const [passwd, setPasswd] = React.useState("");
    const [tipoUsuario, setTipoUsuario] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    const handleTipoUsuarioChange = (event) => {
        setTipoUsuario(event.target.value);
    };

    async function enviaLogin(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/login", {
                username: username,
                password: passwd,
                tipo: tipoUsuario,
            });
            if (response.status >= 200 && response.status < 300) {
                // Salva o token JWT na sessão
                localStorage.setItem("token", response.data.token);
                // seta o estado do login caso tudo deu certo, passando o username
                handleLogin(true, username);
            } else {
                // falha
                console.error("Falha na autenticação");
                setOpenMessage(true);
                setMessageText("Falha na autenticação!");
                setMessageSeverity("error");
            }
        } catch (error) {
            console.log(error);
            setOpenMessage(true);
            setMessageText("Falha ao logar usuário!");
            setMessageSeverity("error");
        }
    }

    function handleCloseMessage(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    }

    return (
        <div id="body">
            <div className="main">
                <Stack>
                    <img src="/logo_XT.png" alt="Logo da Empresa" className="logo"/>
                    <p>Sistema de gerenciamento de custos</p>
                </Stack>
                
                {/*FORMULÁRIO*/}
                <Stack spacing={2}>
                    {/*CAMPO CPF/CNPJ*/}
                    <Stack className="campos_form">
                        <label><b>CPF/CNPJ:</b></label>
                        <TextField
                            className="input"
                            required
                            id="username-input"
                            label="Digite seu CPF ou CNPJ: "
                            
                            size="small"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                    </Stack>
                    {/*CAMPO SENHA*/}
                    <Stack className="campos_form">
                        <label><b>Senha:</b></label>
                        <TextField
                            className="input"
                            required
                            id="passwd-input"
                            label="Insira sua senha: "
                            type="password"
                            size="small"
                            value={passwd}
                            onChange={(event) => {
                                setPasswd(event.target.value);
                            }}
                        />
                    </Stack>
                    {/*SELEÇÃO DE TIPO DE USUÁRIO*/}
                    <Stack className="campos_form">
                        <label><b>Tipo de Usuário:</b></label>
                        <FormControl fullWidth size="small" required>
                            
                            <select
                                labelId="tipo-usuario-label"
                                id="tipo-usuario-select"
                                value={tipoUsuario} // Usa o estado
                                label="Tipo de Usuário"
                                onChange={handleTipoUsuarioChange} // Usa a função de mudança
                            >
                                <option value="">
                                    <em>Selecione...</em>
                                </option>
                                <option value={'administrador'}>Administrador</option>
                                <option value={'cliente'}>Cliente </option>
                                <option value={'operador'}>Operador</option>
                            </select>
                        </FormControl>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={3}>
                    <Button
                        variant="contained"
                        className="botao_enviar"
                        color="primary"
                        onClick={enviaLogin}
                    >
                        Entrar
                    </Button>
                </Stack>
                <Snackbar
                    open={openMessage}
                    autoHideDuration={6000}
                    onClose={handleCloseMessage}
                >
                    <Alert
                        severity={messageSeverity}
                        onClose={handleCloseMessage}
                    >
                        {messageText}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}
