"use strict";

module.exports = (sequelize, DataTypes) => {
	const Funcionario = sequelize.define(
		"Funcionario",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			salario: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			nome: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			funcionario_tipo: {
				type: DataTypes.CHAR(1),
				allowNull: false,
			},
			senha: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "funcionario",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Funcionario.associate = function (models) {
		// Um funcionário pode ter vários registros de horas
			Funcionario.hasMany(models.Horas, {
				foreignKey: "fk_funcionario_id",
				sourceKey: "id",
			});
	};

	return Funcionario;
};