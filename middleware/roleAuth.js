const roleAdmin = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Insufficient permissions." });
  }
  next();
};

const roleManager = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== "admin" && userRole !== "manager") {
    return res
      .status(403)
      .json({ message: "Access denied. Insufficient permissions." });
  }
  next();
};

module.exports = {
  roleAdmin,
  roleManager,
};
