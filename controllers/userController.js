const user = require("../db/models/userschema");
const { logAction } = require("../utils/logger");

const userController = {
  async createUser(req, res, next) {
    try {
      const { username, email, password, roleId } = req.body;
      const users = await user.create({ username, email, password, roleId });

      await logAction({
        action: "Create User",
        performedBy: req.user.id,
        targetResource: "user",
        targetResourceId: user.id,
      });

      res.status(201).json({
        message: "User created successfully.",
        user,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user." });
    }
  },
  async getAllUser(req, res, next) {
    try {
      const users = await user.findAll();
      res.json(users);
    } catch (err) {
      return next(err);
    }
  },
  async getUserById(req, res, next) {
    try {
      const users = await user.findByPk(req.params.id);
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(users);
    } catch (err) {
      return next(err);
    }
  },
  async updateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const users = await user.findByPk(userId);
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }
      const updatedUser = await users.update(req.body);
      res.json(updatedUser);
    } catch (err) {
      return next(err);
    }
  },
  async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;
      const users = await user.findByPk(userId);
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }
      await users.update({ isDeleted: true, deletedAt: new Date() });
      res.json({ message: "User has been deleted" });
    } catch (err) {
      return next(err);
    }
  },
  async softDeleteUser(req, res, next) {
    try {
      const userId = req.params.id;
      const users = await user.findByPk(userId);
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }
      await users.update({ isDeleted: true, deletedAt: new Date() });
      res.json({ message: "User has been soft deleted" });
    } catch (err) {
      return next(err);
    }
  },
  async restoreUser(req, res, next) {
    try {
      const userId = req.params.id;
      const users = await user.findOne({
        where: {
          id: userId,
          isDeleted: true,
        },
      });
      if (!users) {
        return next(CustomErrorHandler.notFound("User not found!"));
      }
      await users.update({ isDeleted: false, deletedAt: null });
      res.json({ message: "User has been restored", users });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = userController;
