const CONFIG_MYSQL = require("config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");

// Models
const userModel = require("./user.model.js");
const companyModel = require("./company.model.js");
const inventoryModel = require("./inventory.model.js");
const productModel = require("./product.model.js");

// Create sequelize instance
const sequelize = new Sequelize(CONFIG_MYSQL.database, CONFIG_MYSQL.user, CONFIG_MYSQL.password, {
	host: CONFIG_MYSQL.host,
	dialect: CONFIG_MYSQL.dialect,
	dialectOptions: {
		ssl: "Amazon RDS",
	},
	port: CONFIG_MYSQL.port,
	maxConcurrentQueries: 100,
	logging: console.log,
	pool: {
		max: CONFIG_MYSQL.pool.max,
		min: CONFIG_MYSQL.pool.min,
		acquire: CONFIG_MYSQL.pool.acquire,
		idle: CONFIG_MYSQL.pool.idle,
	},
	language: "en",
});

const db = {};

// Assign
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models

db.user = userModel(sequelize, DataTypes);

db.company = companyModel(sequelize, DataTypes);
db.inventory = inventoryModel(sequelize, DataTypes);
db.product = productModel(sequelize, DataTypes);

// Relationships between models

// One-To-Many
db.user.hasMany(db.company, { as: "companies" });
db.company.belongsTo(db.user, {
	foreignKey: "owner_id",
	as: "owner",
	allowNull: false,
});

// One-To-One
db.company.hasOne(db.inventory);
db.inventory.belongsTo(db.company, {
	foreignKey: "company_nit",
	as: "company",
	allowNull: false,
});

// One-To-Many
db.inventory.hasMany(db.product, { as: "products" });
db.product.belongsTo(db.inventory, {
	foreignKey: "inventory_id",
	as: "inventory",
	allowNull: false,
});

module.exports = db;
