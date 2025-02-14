const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient;

const singup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Singup error', detail: error});
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );
        
        res.status(201).json({token})

    } catch (error) {
        res.status(500).json({ error: 'Login error', detail: error});
    }
};

module.exports = { singup, login }
