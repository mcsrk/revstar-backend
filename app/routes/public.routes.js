const express = require("express");
const router = express.Router();

// Controller
const userController = require("controllers/user.controller");

// register
router.post("/users", userController.createUser);

//autentication
router.post("/login", userController.login);

module.exports = router;
