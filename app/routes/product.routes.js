const express = require("express");
const router = express.Router();

// Controllers
const productController = require("controllers/product.controller");

// Get all products from inventory
router.get("/inventories/:inventory_id/products", productController.getAllProductsByInventory);

// Create
router.post("/inventories/:inventory_id/products", productController.createProduct);

// Route to get a single product by ID
router.get("/products/:id", productController.getProductById);

// Update product by id
router.put("/products/:id", productController.updateProduct);

// Delete product by id
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
