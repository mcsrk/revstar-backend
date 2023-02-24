// Managers
const productManager = require("managers/product.manager");
const inventoryManager = require("managers/inventory.manager");

const fileTag = "[product.controller]";

// Create a Product in a existing Inventory
const createProduct = async (req, res) => {
	const { inventory_id } = req.params;
	const { name, description, price, stock } = req.body;

	try {
		// Validate request
		if (!name || !price) {
			return res.status(400).send({
				message: "Missing required fields: name, price",
			});
		}

		// Find the inventory with the given ID
		const inventory = await inventoryManager.getInventoryById(inventory_id);

		// If the inventory does not exist, return a 404 error
		if (!inventory) {
			return res.status(404).send({ error: "Inventory not found" });
		}

		// Create a Product body
		const productBody = {
			name,
			description,
			price,
			stock,
			inventory_id,
		};

		// Save Product in the database
		const newProduct = await productManager.createProduct(productBody);
		return res.status(201).send(newProduct);
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while creating the Product.",
		});
	}
};

// Retrieve all Products from the database.
const getAllProductsByInventory = async (req, res) => {
	const { inventory_id } = req.params;

	try {
		// Find the inventory with the given ID
		const inventory = await inventoryManager.getInventoryById(inventory_id);

		// If the inventory does not exist, return a 404 error
		if (!inventory) {
			return res.status(404).send({ error: "Inventory not found" });
		}

		// Get all products associated with the inventory
		const products = await productManager.getProductsByInventory(inventory_id);

		// Return the list of products as a response
		return res.status(200).send(products);
	} catch (error) {
		return res.status(500).send({
			message:
				error.message || `Some error occurred while retrieving the Products from Inventory with ID ${inventory_id}.`,
		});
	}
};

// Find a single Product by an id
const getProductById = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await productManager.getProductById(id);
		return res.status(200).send(product);
	} catch (error) {
		return res.status(500).send({
			message: error.message || `Some error occurred while fetching a Product with ID ${products}.`,
		});
	}
};

// Update a Product by the id in the request
const updateProduct = async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	try {
		const updatedProduct = await productManager.updateProduct(id, data);

		let message = "";

		if (updatedProduct == 1) {
			message = "Product was updated successfully.";
		} else {
			message = `Cannot update product with ID ${id}. Maybe the product was not found or req.body is empty!`;
		}

		return res.status(200).send({ message });
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while updating a Product.",
		});
	}
};

// Delete a Product with the specified id in the request
const deleteProduct = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedProduct = await productManager.deleteProduct(id);

		let message = "";

		if (deletedProduct == 1) {
			message = "Product was deleted successfully.";
		} else {
			message = `Cannot delete product with ID ${id}. Make sure it exists beforehand.`;
		}

		return res.status(200).send({ message });
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while deleting a product.",
		});
	}
};

module.exports = {
	createProduct,
	getAllProductsByInventory,
	getProductById,
	updateProduct,
	deleteProduct,
};
