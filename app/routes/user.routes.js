const express = require("express");

//Auth
const JWTAuth = require("middelware/JWTAuth");

// Controllers
const userController = require("controllers/user.controller");

const router = express.Router();

//create
router.post("/users", userController.createUser);

//autentication
router.post("/login", userController.login);

//read
//all users
router.get("/users", (req, res) => {
	JWTAuth.validateAuth({ req, res }, userController.getAllUsers);
});

//a single user
router.get("/users/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, userController.getUserById);
});

//update
//a single user
router.put("/users/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, userController.updateUser);
});

//delete
//a single user
router.delete("/users/:id", (req, res) => {
	JWTAuth.validateAuth({ req, res }, userController.deleteUser);
});

module.exports = router;
