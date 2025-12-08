"use strict";

module.exports = (sequelize, DataTypes) => {
	const Custos = sequelize.define(
		"Custos",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			descricao: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			categoria: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			valor: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			fk_maquina_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			dt_lancamento: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "Custos",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Custos.associate = function (models) {
		// Custo pertence a uma Máquina
		if (models.Maquina) {
			Custos.belongsTo(models.Maquina, {
				foreignKey: "fk_maquina_id",
				targetKey: "id",
				as: "maquina",
			});
		}
	};

	return Custos;
};