module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"USER",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			is_admin: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "User",
			tableName: "USER",
			timestamps: true,
			paranoid: true,
		}
	);

	return User;
};
