const express = require("express");
const router = express.Router();

// Controllers
const companyController = require("controllers/company.controller");

// Create
router.post("/companies", companyController.createCompany);

// GET
// Get all companies
router.get("/companies", companyController.getAllCompanies);

//a single user
router.get("/users/:id/companies", companyController.getCompaniesByUser);

// Get a single company
router.get("/companies/:id", companyController.getCompanyById);

// UPDATE
// Update a single company
router.put("/companies/:id", companyController.updateCompany);

// DELETE
// Delete a single company
router.delete("/companies/:id", companyController.deleteCompany);

module.exports = router;
