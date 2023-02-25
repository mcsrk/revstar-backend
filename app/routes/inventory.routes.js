const express = require("express");
const router = express.Router();

//Auth
const JWTAuth = require("middelware/JWTAuth");

// Controllers
const inventoryController = require("controllers/inventory.controller");

// Create
router.post("/inventories", (req, res) => {
	JWTAuth.validateAuth({ req, res }, inventoryController.createInventory);
});

// GET
// Get all inventories
router.get("/inventories", (req, res) => {
	JWTAuth.validateAuth({ req, res }, inventoryController.getAllInventories);
});

// Get a single inventory
router.get("/inventories/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, inventoryController.getInventoryById);
});

// UPDATE
// Update a single inventory
router.put("/inventories/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, inventoryController.updateInventory);
});

// DELETE
// Delete a single inventory
router.delete("/inventories/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, inventoryController.deleteInventory);
});

module.exports = router;
