"use strict";

module.exports = (sequelize, DataTypes) => {
	const Maquina = sequelize.define(
		"Maquina",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			vida_util: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			vt_Compra: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			valor_compra: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			modelo: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "maquina",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Maquina.associate = function (models) {
		// Uma máquina tem muitos custos
		if (models.Custos) {
			Maquina.hasMany(models.Custos, {
				foreignKey: "fk_Maquina_id",
				sourceKey: "id",
				as: "custos",
			});
		}
		// Uma máquina tem muitas horas trabalhadas
		if (models.Horas) {
			Maquina.hasMany(models.Horas, {
				foreignKey: "fk_maquina_id",
				sourceKey: "id",
				as: "horas",
			});
		}
	};

	return Maquina;
};