

const express = require("express");
const router = express.Router();
// const users = require("../model/userSchema");
const userController = require("../controller/userController");

router.post("/register", userController.adduser);

module.exports = router;