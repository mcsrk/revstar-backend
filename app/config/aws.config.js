const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	region: process.env.REGION,
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
};
