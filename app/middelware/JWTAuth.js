const CONFIG_AUTH = require("config/auth.config.js");

const jwt = require("jsonwebtoken");

exports.validateAuth = async ({ req, res }, callback) => {
	// Get token from cookies
	const token = req.cookies.token;
	// Check if token is provided
	if (!token) return res.status(401).send({ message: "No token provided" });

	try {
		const user = jwt.verify(token, CONFIG_AUTH.secret);
		req.user = user;
		if (callback) await callback(req, res);
	} catch (err) {
		res.clearCookie("token");
		res.status(403).send({ message: "Required authentication" });
	}
};
