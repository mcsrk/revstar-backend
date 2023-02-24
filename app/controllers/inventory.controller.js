// Managers
const inventoryManager = require("managers/inventory.manager");

const fileTag = "[inventory.controller]";

// Create and Save a new Inventory
const createInventory = async (req, res) => {
	const { name, company_nit } = req.body;

	try {
		// Validate request
		if (!name || !company_nit) {
			return res.status(400).send({
				message: "Missing required fields: name, company_nit!",
			});
		}

		// Create a Inventory body
		const inventoryBody = {
			name,
			company_nit,
		};

		// Save Inventory in the database
		const newInventory = await inventoryManager.createInventory(inventoryBody);
		return res.status(201).send(newInventory);
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while creating the Inventory.",
		});
	}
};

// Retrieve all Inventories from the database.
const getAllInventories = async (req, res) => {
	try {
		const inventories = await inventoryManager.getAllInventories();
		return res.status(200).send(inventories);
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while retrieving the Inventories.",
		});
	}
};

// Find a single Inventory by an id
const getInventoryById = async (req, res) => {
	const { id } = req.params;

	try {
		const inventory = await inventoryManager.getInventoryById(id);
		return res.status(200).send(inventory);
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while fetching a Inventory.",
		});
	}
};

// Update a Inventory by the id in the request
const updateInventory = async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	try {
		const updatedInventory = await inventoryManager.updateInventory(id, data);

		let message = "";

		if (updatedInventory == 1) {
			message = "Inventory was updated successfully.";
		} else {
			message = `Cannot update inventory with ID ${id}. Maybe the inventory was not found or req.body is empty!`;
		}

		return res.status(200).send({ message });
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while updating a Inventory.",
		});
	}
};

// Delete a Inventory with the specified id in the request
const deleteInventory = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedInventory = await inventoryManager.deleteInventory(id);

		let message = "";

		if (deletedInventory == 1) {
			message = "Inventory was deleted successfully.";
		} else {
			message = `Cannot delete inventory with ID ${id}. Make sure it exists beforehand.`;
		}

		return res.status(200).send({ message });
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while deleting a inventory.",
		});
	}
};

module.exports = {
	createInventory,
	getAllInventories,
	getInventoryById,
	updateInventory,
	deleteInventory,
};
