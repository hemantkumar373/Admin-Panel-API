const User = require("../db/models/userschema");
const Role = require("../db/models/roleschema");
const { logAction } = require("../utils/logger");

const roleController = {
  async assignRole(req, res, next) {
    try {
      const userId = req.params.id;
      const { role } = req.body;
      const validRoles = ["Admin", "Manager", "User"];
      if (!validRoles.includes(role)) {
        return res.status(404).json({ message: "User not found" });
      }
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.role = role;
      await user.save();
      res.json({ message: "Role assigned successfully", user });

      await logAction("Assign Role", req.user.id, user.id, "User");

      res.status(200).json({
        message: `Role ${role.name} assigned to user ${user.username}.`,
      });
    } catch (err) {
      return next(err);
    }
  },
  async revokeRole(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(404).json({ message: "Role not found." });
      }
      user.role = null;
      await user.save();
      res.json({ message: "Role revoked successfully", user });
      await logAction("Revoke Role", req.user.id, user.id, "User");

      res
        .status(200)
        .json({ message: `Role revoked from user ${user.username}.` });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = roleController;
