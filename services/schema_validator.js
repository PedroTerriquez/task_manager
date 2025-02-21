const { z } = require("zod");

const userSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
});

const validateUser = (req, res, next) => {
    try {
        userSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
};

module.exports = validateUser;
