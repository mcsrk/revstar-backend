module.exports = (sequelize, DataTypes) => {
	const Inventory = sequelize.define(
		"INVETORY",
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			// company_nit: {
			// 	type: DataTypes.STRING(50),
			// 	allowNull: false,
			// },
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Inventory",
			tableName: "INVENTORY",
			timestamps: true,
			paranoid: true,
		}
	);

	return Inventory;
};
