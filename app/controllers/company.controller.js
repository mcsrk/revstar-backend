// Managers
const companyManager = require("managers/company.manager");
const inventoryManager = require("managers/inventory.manager");

const fileTag = "[company.controller]";

// Create and Save a new Company
const createCompany = async (req, res) => {
	const { nit, owner_id, name, address, phone } = req.body;

	try {
		// Validate request
		if (!nit || !owner_id || !name) {
			return res.status(400).send({
				message: "Missing required fields: nit, owner_id or name!",
			});
		}

		// Check if the company already exists
		const existingCompany = await companyManager.getCompanyById(nit);
		if (existingCompany) {
			return res.status(409).send({ message: `The company with Nit ${nit} already exists` });
		}

		// Create a Company body
		const companyBody = {
			nit,
			owner_id,
			name,
			address,
			phone,
		};

		// Save Company in the database
		const newCompany = await companyManager.createCompany(companyBody);

		// Create its default Inventory
		const defaultInventoryBody = {
			name: "Products",
			company_nit: newCompany.nit,
		};

		const newInventory = await inventoryManager.createInventory(defaultInventoryBody);

		// Return the newly created Company and associated Inventory
		return res.status(201).send({
			company: newCompany,
			inventory: newInventory,
		});
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while creating the Company and its default Inventory.",
		});
	}
};

// Retrieve all Companies from the database.
const getAllCompanies = async (req, res) => {
	try {
		const companies = await companyManager.getAllCompanies();
		return res.status(200).send(companies);
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while retrieving the Companies.",
		});
	}
};

// Find a single Company by an id
const getCompanyById = async (req, res) => {
	const { id } = req.params;

	try {
		const company = await companyManager.getCompanyById(id);
		return res.status(200).send(company);
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while fetching a Company.",
		});
	}
};

// Update a Company by the id in the request
const updateCompany = async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	try {
		const updatedCompany = await companyManager.updateCompany(id, data);

		let message = "";

		if (updatedCompany == 1) {
			message = "Company was updated successfully.";
		} else {
			message = `Cannot update company with Nit ${id}. Maybe the company was not found or req.body is empty!`;
		}

		return res.status(200).send({ message });
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while updating a Company.",
		});
	}
};

// Delete a Company with the specified id in the request
const deleteCompany = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedCompany = await companyManager.deleteCompany(id);

		let message = "";

		if (deletedCompany == 1) {
			message = "Company was deleted successfully.";
		} else {
			message = `Cannot delete company with Nit ${id}. Maybe the company was not found!`;
		}

		return res.status(200).send({ message });
	} catch (error) {
		return res.status(500).send({
			message: error.message || "Some error occurred while deleting a company.",
		});
	}
};

module.exports = {
	createCompany,
	getAllCompanies,
	getCompanyById,
	updateCompany,
	deleteCompany,
};
