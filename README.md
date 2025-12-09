# Xavantina Terraplanagens - Sistema de Gestão

Sistema web desenvolvido como Projeto Integrador para a disciplina de Desenvolvimento Web. O objetivo é gerenciar os processos internos da empresa Xavantina Terraplanagens, permitindo o controle de serviços, apontamento de horas de operadores e gestão financeira de máquinas.

## Módulos do Sistema
- Gestão de Serviços: Cadastro e acompanhamento de obras e serviços prestados a clientes.
- Apontamento de Horas: Registro diário de horas trabalhadas por operadores em cada máquina/serviço.
- Controle de Custos: Lançamento de despesas (manutenção, combustível) vinculadas a máquinas específicas.

## Tecnologias Utilizadas

### Backend
- Node.js: Ambiente de execução.
- Express: Framework web para criação da API.
- Sequelize (ORM): Gerenciamento e modelagem do banco de dados.
- PostgreSQL: Banco de dados relacional.
- JWT: Autenticação segura via JSON Web Tokens.

### Frontend
- React.js: Biblioteca para construção da interface.
- Material UI (MUI): Biblioteca de componentes visuais.
- Axios: Cliente HTTP para comunicação com a API.

## Como Executar o Projeto

### Pré-requisitos
- Node.js instalado.
- PostgreSQL instalado e rodando.

### Passos
- Clone o repositório;
- Configurar o Banco de Dados:
- Crie um banco de dados no PostgreSQL chamado progII (ou ajuste no arquivo localConnection.js).
- Execute o script SQL fornecido na pasta docs/database.sql para criar as tabelas.
- Executar o Backend:

cd xavantina-backend
npm install
node server.js

O servidor rodará na porta 3002.

- Executar o Frontend (com instalações necessárias):

cd frontend
npm install axios
npm install react-router-dom 
npm install @mui/material @emotion/react @emotion/styled
npm run dev

Caso já tenha as instalações, basta executar npm run dev dentro da pasta frontend.

- Acesse pelo navegador no endereço indicado (geralmente http://localhost:5173).

# Autores
- Ana Luiza Scatolon
- Ana Tereza Suzana

Projeto desenvolvido para fins acadêmicos.
