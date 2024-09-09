const express = require("express");
const { assignRole, revokeRole } = require("../controllers/roleController.js");
const isAuthenticated = require("../middleware/auth.js");
const { roleAdmin } = require("../middleware/roleAuth.js");

const router = express.Router();

router.post("/users/:id/assign-role", isAuthenticated, roleAdmin, assignRole);
router.post("/users/:id/revoke-role", isAuthenticated, roleAdmin, revokeRole);

module.exports = router;
