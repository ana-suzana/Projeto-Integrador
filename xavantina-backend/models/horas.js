"use strict";

module.exports = (sequelize, DataTypes) => {
	const Horas = sequelize.define(
		"Horas",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			data: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			hr_inicial: {
				type: DataTypes.TIME,
				allowNull: false,
			},
			hr_final: {
				type: DataTypes.TIME,
				allowNull: false,
			},
			fk_funcionario_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			fk_servico_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			fk_maquina_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "horas",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Horas.associate = function (models) {

		// Associação com Funcionario
		// Nota: Certifique-se de que o model 'Funcionario' existe, senão dará erro aqui
		Horas.belongsTo(models.Funcionario, {
			foreignKey: "fk_funcionario_id",
			targetKey: "id",
		});

        Horas.belongsTo(models.Servico, {
            foreignKey: "fk_servico_id",
            targetKey: "id",
        });

		// Associação com Maquina
		// Nota: Certifique-se de que o model 'Maquina' existe
			Horas.belongsTo(models.Maquina, {
				foreignKey: "fk_maquina_id",
				targetKey: "id",
			});
	};

	return Horas;
};