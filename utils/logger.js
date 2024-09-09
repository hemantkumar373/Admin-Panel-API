const AuditLog = require("../db/models/auditlogschema");

const logAction = async ({
  action,
  performedBy,
  targetResource,
  targetResourceId,
}) => {
  try {
    await AuditLog.create({
      action,
      performedBy,
      targetResource,
      targetResourceId,
      performedAt: new Date(),
    });
  } catch (error) {
    console.error("Error logging action:", error);
  }
};

module.exports = {
  logAction,
};
