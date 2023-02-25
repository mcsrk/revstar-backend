// Models
const db = require("models");
const User = db.user;

const createUser = async (data) => {
	try {
		const newUser = await User.create(data);
		return newUser;
	} catch (error) {
		throw new Error(error);
	}
};


const getAllUsers = async () => {
	try {
		const users = await User.findAll();
		return users;
	} catch (error) {
		throw new Error(error);
	}
};

const getUserById = async (id) => {
	try {
		const user = await User.findOne({ where: { id } });
		return user;
	} catch (error) {
		throw new Error(error);
	}
};

const getUserByUsername = async (username) => {
	try {
		const user = await User.findOne({ where: { username } });
		return user;
	} catch (error) {
		throw new Error(error);
	}
};

const updateUser = async (id, data) => {
	try {
		const updatedUser = await User.update(data, {
			where: { id },
		});
		return updatedUser;
	} catch (error) {
		throw new Error(error);
	}
};

const deleteUser = async (id) => {
	try {
		const deletedUser = await User.destroy({
			where: { id },
			force: true, // remove this if you want to keep data and use "deletedAt" flag
		});
		return deletedUser;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	createUser,
	getAllUsers,
    getUserById,
	getUserByUsername,
	updateUser,
	deleteUser,
};
