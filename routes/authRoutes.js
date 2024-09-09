const express = require("express");
const { signup, login, register } = require("../controllers/authController.js");
const isAuthenticated = require("../middleware/auth.js");
const { roleAdmin } = require("../middleware/roleAuth.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/register", isAuthenticated, roleAdmin, register);
router.post("/login",login);

module.exports = router;
