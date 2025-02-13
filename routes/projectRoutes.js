const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient;

router.get('/', async(req,res) => {
    try {
        const projects = await prisma.project.findMany();
        if (!projects) return res.status(404).json({error: 'No projects yet'});
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'No data', detail: error})
    }
});

router.get('/:id' , async(req, res) => {
    const {id} = req.params;
    try {
        const project = await prisma.project.findUnique({where : {id: Number(id)}})
        if (!project) return res.status(404).json({error: 'Task not found'});
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Error getting the task'})
    }
});

router.post("/", async (req, res) => {
    const { name, description, userId } = req.body;
    try {
        const newProject = await prisma.project.create({
            data: { name, description, userId },
        });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: "Error creating the project", details: error});
    }
});

router.put("/:id", async (req, res) => {
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
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id: Number(id) } });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the project" });
  }
});

module.exports = router;