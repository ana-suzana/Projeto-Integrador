"use strict";

module.exports = (sequelize, DataTypes) => {
	const Cliente = sequelize.define(
		"Cliente",
		{
			idcliente: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			nome: DataTypes.STRING,
			cpf_cnpj: DataTypes.STRING,
			cliente_tipo: DataTypes.CHAR(1),
			senha: DataTypes.STRING
		},
		{
			sequelize,
			tableName: "cliente", // Nome exato da tabela
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

    // Cliente se associa a muitos serviços
	Cliente.associate = function (models) {
		Cliente.hasMany(models.Servico, {
			foreignKey: "fk_cliente_idcliente",
			sourceKey: "idcliente",
		});
	};

	return Cliente;
};