const express = require("express");

// Controllers
const userController = require("controllers/user.controller");

const router = express.Router();

//read
//all users
router.get("/users", userController.getAllUsers);

//a single user
router.get("/users/:id", userController.getUserById);

//update
//a single user
router.put("/users/:id", userController.updateUser);

//delete
//a single user
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
