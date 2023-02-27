const fs = require("fs");

// Managers
const inventoryManager = require("managers/inventory.manager");
const companyManager = require("managers/company.manager");
const productManager = require("managers/product.manager");

// Utils
const { generatePdf } = require("utils/pdf.utils");
const { sendEmail, buildEmailOptions, verifyEmailInAWS } = require("utils/email.utils");

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
// Retrieve all Inventories by company.
const getInventoriesByCompany = async (req, res) => {
	const { id: company_nit } = req.params;

	try {
		// Check if the company  exists
		const existingCompany = await companyManager.getCompanyById(company_nit);
		if (!existingCompany) {
			return res.status(404).send({ message: `The company with Nit ${company_nit} doesnt exists` });
		}

		const inventories = await inventoryManager.getInventoriesByCompany(company_nit);
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

// Find a single Inventory by an id
const exportInventory = async (req, res) => {
	const { company_nit, inventory_id, email } = req.params;

	const fileName = "inventory-products";

	try {
		// Checks if comapny and its inventory does actually exists
		const existingCompany = await companyManager.getCompanyById(company_nit);
		if (!existingCompany) {
			return res.status(404).send({ message: `The company with Nit ${company_nit} doesnt exists` });
		}

		const existingInventory = await inventoryManager.getInventoryById(inventory_id);
		if (!existingInventory) {
			return res.status(404).send({ message: `The inventory with id ${inventory_id} doesnt exists` });
		}

		// Get all products associated with the inventory
		const products = await productManager.getProductsByInventory(inventory_id);

		await generatePdf(products, fileName, existingCompany.name, existingInventory.name);

		const response = await verifyEmailInAWS(email);

		if (response && response.status === "pending") {
			return res.status(response.code).send({ message: response.message });
		}

		const emailOptions = buildEmailOptions({
			emailTo: email,
			subject: `Productos exportados ${existingCompany.name} - ${existingInventory.name} (PDF)`,
			text: `Se han adjunato los productos del inventario: ${existingInventory.name} de tu empresa: ${existingCompany.name}`,
			html: `<b>Tus productos del inventario: ${existingInventory.name} de la empresa ${existingCompany.name}</b>`,
			fileName: fileName,
		});
		const result = await sendEmail(emailOptions);

		fs.unlinkSync(`${fileName}.pdf`);

		return res.status(200).send(result);
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
	exportInventory,
	getInventoriesByCompany,
	getInventoryById,
	updateInventory,
	deleteInventory,
};
