CREATE TABLE Cliente (
    IdCliente SERIAL PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    CPF_CNPJ VARCHAR UNIQUE NOT NULL,
    Cliente_TIPO CHAR(1) NOT NULL,
    senha VARCHAR(20) NOT NULL
);

CREATE TABLE Servico (
    ID SERIAL PRIMARY KEY,
    Valor_hora FLOAT NOT NULL,
    Status VARCHAR(20) NOT NULL,
    Dt_final DATE NOT NULL,
    Dt_inicio DATE NOT NULL,
    fk_Cliente_IdCliente INT NOT NULL,
    Descricao VARCHAR(50) NOT NULL
);

CREATE TABLE Maquina (
    ID SERIAL PRIMARY KEY,
    Vida_util INT NOT NULL,
    Dt_Compra DATE NOT NULL,
    Valor_Compra FLOAT NOT NULL,
    Modelo VARCHAR(50) NOT NULL
);

CREATE TABLE Funcionario (
    ID SERIAL PRIMARY KEY,
    Salario FLOAT NOT NULL,
    Nome VARCHAR NOT NULL,
    Funcionario_TIPO CHAR(1) NOT NULL,
    senha VARCHAR(20) NOT NULL
);

CREATE TABLE Custos (
    Id SERIAL PRIMARY KEY,
    Descricao VARCHAR NOT NULL,
    Categoria VARCHAR NOT NULL,
    Valor FLOAT NOT NULL,
    fk_Maquina_ID INT NOT NULL,
    dt_lancamento DATE NOT NULL
);

/* --- MUDANÇA PRINCIPAL AQUI --- */
CREATE TABLE Horas (
    ID SERIAL PRIMARY KEY,
    Data DATE NOT NULL,
    Hr_inicial TIME NOT NULL,
    Hr_Final TIME NOT NULL,
    fk_Funcionario_ID INT NOT NULL, 
    fk_Servico_ID INT NOT NULL,    
    fk_Maquina_ID INT NOT NULL            
);

/* --- CONSTRAINTS / CHAVES ESTRANGEIRAS --- */

ALTER TABLE Servico ADD CONSTRAINT FK_Servico_Cliente
    FOREIGN KEY (fk_Cliente_IdCliente)
    REFERENCES Cliente (IdCliente)
    ON DELETE CASCADE;

ALTER TABLE Custos ADD CONSTRAINT FK_Custos_Maquina
    FOREIGN KEY (fk_Maquina_ID)
    REFERENCES Maquina (ID)
    ON DELETE CASCADE;

/* FKs da tabela HORAS */

ALTER TABLE Horas ADD CONSTRAINT FK_Horas_Funcionario
    FOREIGN KEY (fk_Funcionario_ID)
    REFERENCES Funcionario (ID)
    ON DELETE RESTRICT;

ALTER TABLE Horas ADD CONSTRAINT FK_Horas_Servico
    FOREIGN KEY (fk_Servico_ID)
    REFERENCES Servico (ID)
    ON DELETE CASCADE;

ALTER TABLE Horas ADD CONSTRAINT FK_Horas_Maquina
    FOREIGN KEY (fk_Maquina_ID)
    REFERENCES Maquina (ID)
    ON DELETE RESTRICT;

—-----------------------------------------------------
/*INSERTIS*/

-- Inserindo Clientes
INSERT INTO Cliente (Nome, CPF_CNPJ, Cliente_TIPO, senha) VALUES
('Indústria Metalúrgica A', '12.345.678/0001-90', 'J', 'senha123'),
('Construtora Predial B', '98.765.432/0001-10', 'J', 'segredo456'),
('João da Silva MEI', '111.222.333-44', 'F', 'minhasenha789');

-- Inserindo Máquinas
INSERT INTO Maquina (Vida_util, Dt_Compra, Valor_Compra, Modelo) VALUES
(10, '2022-01-15', 45000.00, 'Trator'),
(5, '2023-06-10', 12000.00, 'Escavadeira'),
(8, '2021-11-20', 3500.00, 'Retroescavadeira');

-- Inserindo Funcionários
INSERT INTO Funcionario (Salario, Nome, Funcionario_TIPO, senha) VALUES
(0, 'Fulano', 'A', '123'),
(4200.00, 'Ciclano', 'O', '456'),
(2800.00, 'Beltrano', 'O', '789');

-- Inserindo Serviços (Depende de Cliente)
-- Supondo que os IDs gerados acima foram 1, 2 e 3 respectivamente
INSERT INTO Servico (Valor_hora, Status, Dt_final, Dt_inicio, fk_Cliente_IdCliente, Descricao) VALUES
(150.00, 'Em Andamento', '2024-12-20', '2024-12-01', 1, 'Serviço 1'),
(200.00, 'Concluído', '2024-11-30', '2024-11-25', 2, 'Serviço 2'),
(100.00, 'Pendente', '2025-01-15', '2025-01-10', 3, 'Serviço 3');

-- Inserindo Custos (Depende de Máquina)
INSERT INTO Custos (Descricao, Categoria, Valor, fk_Maquina_ID, dt_lancamento) VALUES
('Troca de Óleo Hidráulico', 'Manutenção', 250.00, 1, '2024-10-05'),
('Reparo no Pneu Traseiro', 'Manutenção', 180.00, 2, '2024-11-12'),
('Seguro', 'Custo Fixo', 1005.00, 3, '2024-09-20');

-- Inserindo Horas (Depende de Funcionario, Servico e Maquina)
INSERT INTO Horas (Data, Hr_inicial, Hr_Final, fk_Funcionario_ID, fk_Servico_ID, fk_Maquina_ID) VALUES
-- Carlos (ID 1) trabalhou 4 horas no Serviço 1 (Usinagem) usando a Máquina 1 (Torno)
('2024-12-02', '08:00:00', '12:00:00', 1, 1, 1),

-- Carlos (ID 1) continuou no mesmo serviço e máquina à tarde (mais 4 horas)
('2024-12-02', '13:00:00', '17:00:00', 1, 1, 1),

-- Pedro (ID 3) trabalhou 2 horas no Serviço 2 (Manutenção) usando a Máquina 2 (Empilhadeira)
('2024-11-26', '09:00:00', '11:00:00', 3, 2, 2);
