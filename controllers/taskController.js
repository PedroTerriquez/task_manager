const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient;
const { getIO } = require('../socket_io_server');

const all = async(req,res) => {
    const {projectId} = req.params;
    try {
        const tasks = await prisma.task.findMany({where: { projectId: Number(projectId)}});
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
    const userId = req.user.id;
    const { title, description, projectId } = req.body;
    try {
        const newTask = await prisma.task.create({
            data: { title, description, userId, projectId },
        });
        const io = getIO();
        io.emit('newTask', newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error)
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
    const io = getIO();
    io.emit('updateTask', updatedTask);
    res.json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating the task", details: error });
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