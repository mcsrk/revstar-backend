// Models
const db = require("models");
const Inventory = db.inventory;

const createInventory = async (data) => {
	try {
		const newInventory = await Inventory.create(data);
		return newInventory;
	} catch (error) {
		throw new Error(error);
	}
};

const getAllInventories = async () => {
	try {
		const inventories = await Inventory.findAll();
		return inventories;
	} catch (error) {
		throw new Error(error);
	}
};

const getInventoriesByCompany = async (company_nit) => {
	try {
		const inventory = await Inventory.findAll({
			where: { company_nit },
		});
		return inventory;
	} catch (error) {
		throw new Error(error);
	}
};
const getInventoryById = async (id) => {
	try {
		const inventory = await Inventory.findByPk(id);
		return inventory;
	} catch (error) {
		throw new Error(error);
	}
};

const updateInventory = async (id, data) => {
	console.log({ id, data });
	try {
		const updatedInventory = await Inventory.update(data, {
			where: { id: id },
		});
		return updatedInventory;
	} catch (error) {
		throw new Error(error);
	}
};

const deleteInventory = async (id) => {
	try {
		const deletedInventory = await Inventory.destroy({
			where: { id },
		});
		return deletedInventory;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	createInventory,
	getAllInventories,
	getInventoriesByCompany,
	getInventoryById,
	updateInventory,
	deleteInventory,
};
