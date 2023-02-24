// Models
const db = require("models");
const Company = db.company;

const createCompany = async (data) => {
	try {
		const newCompany = await Company.create(data);
		return newCompany;
	} catch (error) {
		throw new Error(error);
	}
};

const getAllCompanies = async () => {
	try {
		const companies = await Company.findAll();
		return companies;
	} catch (error) {
		throw new Error(error);
	}
};

const getCompanyById = async (id) => {
	try {
		const company = await Company.findByPk(id);
		return company;
	} catch (error) {
		throw new Error(error);
	}
};

const updateCompany = async (id, data) => {
	try {
		const updatedCompany = await Company.update(data, {
			where: { nit: id },
		});
		return updatedCompany;
	} catch (error) {
		throw new Error(error);
	}
};

const deleteCompany = async (id) => {
	try {
		const deletedCompany = await Company.destroy({
			where: { nit: id },
			force: true,
		});
		return deletedCompany;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	createCompany,
	getAllCompanies,
	getCompanyById,
	updateCompany,
	deleteCompany,
};
