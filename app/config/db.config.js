const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER_MYSQL,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	dialect: "mysql",
	port: Number(process.env.DB_PORT),
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
