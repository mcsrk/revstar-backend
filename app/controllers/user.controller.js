const CONFIG_AUTH = require("config/auth.config.js");
const jwt = require("jsonwebtoken");

// Managers
const userManager = require("managers/user.manager");
const bcrypt = require("bcrypt");

const fileTag = "[user.controller]";

// Create and Save a new User
const createUser = async (req, res) => {
	const { username, password, is_admin } = req.body;
	const decodedUsername = Buffer.from(username, "base64").toString();
	consolelog({ encrypted: decodedUsername, original: username });

	try {
		// Validate request
		if (!decodedUsername || !password) {
			return res.status(400).send({
				message: "Missing required fields: username or password!",
			});
		}

		// Check if the user already exists
		const existingUser = await userManager.getUserByUsername(decodedUsername);
		if (existingUser) {
			return res.status(409).send({ message: `The user with Username ${decodedUsername} already exists` });
		}

		// Hash password
		const hash = bcrypt.hashSync(req.body.password, CONFIG_AUTH.saltRounds);

		// Create a User body
		const userBody = {
			username: decodedUsername,
			password: hash,
			is_admin,
		};

		// Save User in the database
		const newUser = await userManager.createUser(userBody);

		// Return the newly created User and associated Inventory
		return res.status(201).send(newUser);
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while creating the User",
		});
	}
};

// Log the user into the system
const login = async (req, res) => {
	// Get, decode and split the credentials sent in Headers
	if (!req.headers.authorization) {
		return res.status(401).send({ message: "Credentials not found" });
	}
	const credentialsToken = req.headers.authorization.split(" ")[1];
	const decodedCredentials = Buffer.from(credentialsToken, "base64").toString();

	const [username, password] = decodedCredentials.split(":");

	try {
		// Check if the user  exists
		const user = await userManager.getUserByUsername(username);
		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}

		// Check if the password is valid
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(401).send({ message: "Invalid password" });
		}

		// Generate a JWT token for the authenticated user
		const token = jwt.sign({ userId: user.id, isAdmin: user.is_admin }, CONFIG_AUTH.secret, {
			expiresIn: "1h",
		});

		if (!token) {
			return res.status(403).send({ message: "Invalid authentication" });
		} else {
			res.cookie("token", token, {
				httpOnly: true /*,
                secure: true,
                signed: true,
                maxAge: 100000*/,
			});
			return res.status(200).send(token);
		}
	} catch (e) {
		return res.status(500).send({ message: e });
	}
};

// Retrieve all Users from the database.
const getAllUsers = async (req, res) => {
	try {
		const users = await userManager.getAllUsers();
		return res.status(200).send(users);
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while retrieving the Users.",
		});
	}
};

// Find a single User by an id
const getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await userManager.getUserById(id);
		return res.status(200).send(user);
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while fetching a User.",
		});
	}
};

// Update a User by the id in the request
const updateUser = async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	try {
		const updatedUser = await userManager.updateUser(id, data);

		let message = "";

		if (updatedUser == 1) {
			message = "User was updated successfully.";
		} else {
			message = `Cannot update User with ID ${id}. Maybe the user was not found or req.body is empty!`;
		}

		return res.status(200).send({ message });
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while updating a User.",
		});
	}
};

// Delete a User with the specified id in the request
const deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedUser = await userManager.deleteUser(id);

		let message = "";

		if (deletedUser == 1) {
			message = "User was deleted successfully.";
		} else {
			message = `Cannot delete User with ID ${id}. Maybe the user was not found!`;
		}

		return res.status(200).send({ message });
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while deleting a user.",
		});
	}
};

module.exports = {
	createUser,
	login,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
};
