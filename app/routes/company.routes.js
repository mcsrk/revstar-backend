const express = require("express");
const router = express.Router();

//Auth
const JWTAuth = require("middelware/JWTAuth");

// Controllers
const companyController = require("controllers/company.controller");

// Create
router.post("/companies", (req, res) => {
	JWTAuth.validateAuth({ req, res }, companyController.createCompany);
});

// GET
// Get all companies
router.get("/companies", (req, res) => {
	JWTAuth.validateAuth({ req, res }, companyController.getAllCompanies);
});

// Get a single company
router.get("/companies/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, companyController.getCompanyById);
});

// UPDATE
// Update a single company
router.put("/companies/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, companyController.updateCompany);
});

// DELETE
// Delete a single company
router.delete("/companies/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, companyController.deleteCompany);
});

module.exports = router;
