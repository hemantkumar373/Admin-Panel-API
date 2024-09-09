const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  removeProject,
  deleteProject,
} = require("../controllers/projectController.js");
const isAuthenticated = require("../middleware/auth.js");
const { roleAdmin } = require("../middleware/roleAuth.js");

const router = express.Router();

router.post("/", isAuthenticated, roleAdmin, createProject);
router.get("/", isAuthenticated, getAllProjects);
router.get("/:id", isAuthenticated, getProjectById);
router.put("/:id", isAuthenticated, roleAdmin, updateProject);
router.delete("/:id", isAuthenticated, roleAdmin, removeProject);
router.delete("/permanent/:id", isAuthenticated, roleAdmin, deleteProject);

module.exports = router;
