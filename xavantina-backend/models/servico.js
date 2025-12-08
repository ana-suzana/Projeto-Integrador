"use strict";

module.exports = (sequelize, DataTypes) => {
	const Servico = sequelize.define(
		"Servico",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			valor_hora: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			dt_final: {
				type: DataTypes.DATEONLY, //sequelize usa dateonly quando é date no sql
				allowNull: false,
			},
			dt_inicio: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			fk_cliente_idcliente: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			descricao: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "servico",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Servico.associate = function (models) {
		// Associação com Cliente (N:1)
		Servico.belongsTo(models.Cliente, {
			foreignKey: "fk_cliente_idcliente",
			targetKey: "idcliente",
		});

		// Associação com Horas (1:N)
		// Agora o serviço tem várias horas apontadas, onde sabemos quem trabalhou e qual máquina usou
		Servico.hasMany(models.Horas, {
			foreignKey: "fk_servico_id",
			sourceKey: "id",
		});
	};

	return Servico;
};