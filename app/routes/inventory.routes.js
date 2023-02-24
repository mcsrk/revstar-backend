const express = require("express");
const router = express.Router();

// Controllers
const inventoryController = require("controllers/inventory.controller");

// Create
router.post("/inventories", inventoryController.createInventory);

// GET
// Get all inventories
router.get("/inventories", inventoryController.getAllInventories);

// Get a single inventory
router.get("/inventories/:id", inventoryController.getInventoryById);

// UPDATE
// Update a single inventory
router.put("/inventories/:id", inventoryController.updateInventory);

// DELETE
// Delete a single inventory
router.delete("/inventories/:id", inventoryController.deleteInventory);

module.exports = router;
