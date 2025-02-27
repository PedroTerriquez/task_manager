const { PrismaClient } = require('@prisma/client');
const { getIO } = require('../socket_io_server');
const prisma = new PrismaClient;

const all = async (req, res) => {
  const userId = req.user.id;
  try {
    const projects = await prisma.project.findMany({ where: { userId }});
    if (!projects) return res.status(404).json({ error: 'No projects yet' });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'No data', detail: error })
  }
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const project = await prisma.project.findUnique({ where: { id: Number(id), userId: userId } })
    if (!project) return res.status(404).json({ error: 'Task not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error getting the task' })
  }
};

const create = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;
  try {
    const newProject = await prisma.project.create({
      data: { name, description, userId },
    });
    const io = getIO();
    io.emit('projectCreated', newProject)
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error creating the project", details: error });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;
  try {
    const updatedProject = await prisma.project.update({
      where: { id: Number(id), userId: userId },
      data: { name, description },
    });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Error updating the project", details: error});
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    await prisma.project.delete({ where: { id: Number(id), userId: userId } });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error deleting the project", details: error });
  }
};

module.exports = { all, getByID, create, update, destroy }