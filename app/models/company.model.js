module.exports = (sequelize, DataTypes) => {
	const Company = sequelize.define(
		"COMPANY",
		{
			nit: {
				type: DataTypes.STRING(50),
				primaryKey: true,
				allowNull: false,
			},
			owner_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING(255),
			},
			phone: {
				type: DataTypes.STRING(16),
			},
		},
		{
			sequelize,
			modelName: "Company",
			tableName: "COMPANY",
			timestamps: true,
			paranoid: true,
		}
	);

	return Company;
};
