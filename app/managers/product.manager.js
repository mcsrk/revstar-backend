// Models
const db = require("models");
const Product = db.product;

const createProduct = async (data) => {
	try {
		const newProduct = await Product.create(data);
		return newProduct;
	} catch (error) {
		throw new Error(error);
	}
};

const getProductsByInventory = async (inventory_id) => {
	try {
		const procucts = await Product.findAll({
			where: {
				inventory_id,
			},
		});
		return procucts;
	} catch (error) {
		throw new Error(error);
	}
};

const getProductById = async (id) => {
	try {
		const product = await Product.findByPk(id);
		return product;
	} catch (error) {
		throw new Error(error);
	}
};

const updateProduct = async (id, data) => {
	console.log({ id, data });
	try {
		const updatedProduct = await Product.update(data, {
			where: { id: id },
		});
		return updatedProduct;
	} catch (error) {
		throw new Error(error);
	}
};

const deleteProduct = async (id) => {
	try {
		const deletedProduct = await Product.destroy({
			where: { id },
		});
		return deletedProduct;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	createProduct,
	getProductsByInventory,
	getProductById,
	updateProduct,
	deleteProduct,
};
