const express = require("express");
const router = express.Router();

//Auth
const JWTAuth = require("middelware/JWTAuth");

// Controllers
const productController = require("controllers/product.controller");

// Get all products from inventory
router.get("/inventories/:inventory_id/products", (req, res) => {
	JWTAuth.validateAuth({ req, res }, productController.getAllProductsByInventory);
});

// Create
router.post("/inventories/:inventory_id/products", (req, res) => {
	JWTAuth.validateAuth({ req, res }, productController.createProduct);
});

// Route to get a single product by ID
router.get("/products/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, productController.getProductById);
});

// Update product by id
router.put("/products/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, productController.updateProduct);
});

// Delete product by id
router.delete("/products/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, productController.deleteProduct);
});

module.exports = router;
