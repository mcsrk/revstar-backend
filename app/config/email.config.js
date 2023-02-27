const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	senderEmail: process.env.SENDER_EMAIL,
};
