const express = require("express");
const router = express.Router();

// Controllers
const companyController = require("controllers/company.controller");

// Create
router.post("/companies", companyController.createCompany);

// GET
// Get all companies
router.get("/companies", companyController.getAllCompanies);

// Get a single company
router.get("/companies/:id", companyController.getCompanyById);

// UPDATE
// Update a single company
router.put("/companies/:id", companyController.updateCompany);

// DELETE
// Delete a single company
router.delete("/companies/:id", companyController.deleteCompany);

module.exports = router;
