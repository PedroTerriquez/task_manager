const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient;

const all = async(req,res) => {
    try {
        const tasks = await prisma.task.findMany();
        if (!tasks) return res.status(404).json({error: 'No tasks yet'});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'No data', detail: error})
    }
};

const getById = async(req, res) => {
    const {id} = req.params;
    try {
        const task = await prisma.task.findUnique({where : {id: Number(id)}})
        if (!task) return res.status(404).json({error: 'Task not found'});
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error getting the task'})
    }
};

const create = async (req, res) => {
    const { title, description, status, userId } = req.body;
    try {
        const newTask = await prisma.task.create({
            data: { title, description, status, userId },
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Error creating the task", details: error});
    }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, projectId } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, status, projectId },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating the task" });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the task" });
  }
};

module.exports = {all, getById, create, update, destroy};