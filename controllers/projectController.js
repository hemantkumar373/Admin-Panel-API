const project = require("../db/models/projectschema");
const { user } = require("../db/models/userschema"); // Assuming you need this

const createProject = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    const newProject = new project({
      name: body.name,
      description: body.description,
      createdBy: userId,
      assignedBy: body.assignedBy,
    });
    await newProject.save();
    res.status(200).json({ message: "Project created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await project.findAll({
      include: user,
      where: { createdBy: userId },
    });

    return res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const result = await project.findByPk(projectId, { include: user });
    if (!result) {
      return res.status(400).json({ message: "Invalid Project ID" });
    }
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;
    const body = req.body;

    const result = await project.findOne({
      where: { id: projectId, createdBy: userId },
    });
    if (!result) {
      return res.status(404).json({ message: "Project not found" });
    }
    await result.update(body);
    return res.json({
      success: true,
      message: "Project updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const result = await project.findByIdAndDelete(req.body.id);
    if (!result) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    const result = await project.findOne({
      where: { id: projectId, createdBy: userId },
    });
    if (!result) {
      return res.status(404).json({ message: "Invalid project ID" });
    }
    await result.destroy();
    return res.json({
      success: true,
      message: "Project removed successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  removeProject,
};
