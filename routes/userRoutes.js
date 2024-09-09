const express = require("express");
const {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  softDeleteUser,
  restoreUser,
} = require("../controllers/userController.js");
const isAuthenticated = require("../middleware/auth.js");
const { roleAdmin, roleManager } = require("../middleware/roleAuth.js");

const router = express.Router();

router.get("/users", isAuthenticated, roleAdmin, createUser);
router.get("/users", isAuthenticated, roleManager, roleAdmin, getAllUser);
router.get("/users/:id", isAuthenticated, getUserById);
router.put("/users/:id", isAuthenticated, roleAdmin, updateUser);
router.delete("/users/:id", isAuthenticated, roleAdmin, softDeleteUser);
router.patch("/users/restore/:id", isAuthenticated, roleAdmin, restoreUser);

module.exports = router;
