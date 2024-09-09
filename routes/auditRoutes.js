const express = require("express");
const { logAction } = require("../utils/logger.js");
const isAuthenticated = require("../middleware/auth.js");

const router = express.Router();

router.get("/audit-logs", isAuthenticated, logAction);

module.exports = router;
