const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient;

const all = async(req,res) => {
    try {
        const projects = await prisma.project.findMany();
        if (!projects) return res.status(404).json({error: 'No projects yet'});
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'No data', detail: error})
    }
};

const getByID = async(req, res) => {
    const {id} = req.params;
    try {
        const project = await prisma.project.findUnique({where : {id: Number(id)}})
        if (!project) return res.status(404).json({error: 'Task not found'});
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Error getting the task'})
    }
};

const create = async (req, res) => {
    const { name, description, userId } = req.body;
    try {
        const newProject = await prisma.project.create({
            data: { name, description, userId },
        });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: "Error creating the project", details: error});
    }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: { name, description },
    });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Error updating the project" });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id: Number(id) } });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the project" });
  }
};

module.exports = { all, getByID, create, update, destroy }