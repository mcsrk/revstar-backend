module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		"PRODUCT",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			// inventory_id: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: false,
			// },
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: "Product",
			tableName: "PRODUCT",
			timestamps: true,
			paranoid: true,
		}
	);

	return Product;
};
