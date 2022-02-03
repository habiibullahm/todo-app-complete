const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todo");
const { isAuthenticated } = require("../middlewares/auth")


router.get("/", todoControllers.getAll);
router.get("/:id", todoControllers.view);
router.post("/",isAuthenticated, todoControllers.create);
router.put("/:id",isAuthenticated, todoControllers.edit);
router.delete("/:id",isAuthenticated, todoControllers.delete)


module.exports = router