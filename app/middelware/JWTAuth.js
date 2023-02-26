const CONFIG_AUTH = require("config/auth.config.js");

const jwt = require("jsonwebtoken");

exports.validateAuth = (req, res, next) => {
	const excludedRoutes = ["/"]; // Array of routes that don't require authentication

	if (excludedRoutes.includes(req.path)) {
		return next(); // Skip authentication for excluded routes
	}

	let token = req.headers["authorization"]?.split(" ")[1];
	try {
		jwt.verify(token, CONFIG_AUTH.secret, (err, decoded) => {
			if (err || !token) {
				return res.status(401).send({ message: "No token provided" });
			}
			req.decoded = decoded;

			next();
		});
	} catch (err) {
		return res.status(401).send({ message: "Authentication error", err });
	}
};
