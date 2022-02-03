const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')
const { isAuthenticated } = require("../middlewares/auth")

router.get("/", UserController.getAll)
router.get("/:id", UserController.view)
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.put("/:id",isAuthenticated, UserController.edit)
router.delete("/:id",isAuthenticated, UserController.delete)


module.exports = router