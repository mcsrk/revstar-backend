const express = require("express");
const router = express.Router();

// Controllers
const userController = require("controllers/user.controller");

//create
router.post("/users", userController.createUser);


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
