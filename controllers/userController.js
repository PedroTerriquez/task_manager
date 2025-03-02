const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        user.projects = await prisma.project.findMany({
            where: { userId: userId },
            select: { id: true, name: true },
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error getting the user' });
    }
};

const updateUser = async (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, email },
        });
        res.json(updatedUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating the user' });
    }
};

module.exports = {getUser, updateUser};