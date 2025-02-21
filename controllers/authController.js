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

        const token = jwt.sign(
            { id: newUser.id, name: newUser.name },
            process.env.JWT_SECRET,
            process.env.NODE_ENV === "dev" ? {} : { expiresIn: "1h" }
        );

        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict'}).json({token})
    } catch (error) {
        res.status(500).json({ error: 'Singup error', detail: error});
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) return res.status(401).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({ message: "Wrong password" });

        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET,
            process.env.NODE_ENV === "dev" ? {} : { expiresIn: "1h" }
        );
        
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict'}).json({token})
    } catch (error) {
        res.status(500).json({ error: 'Login error', detail: error});
    }
};

module.exports = { singup, login }
