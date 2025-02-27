const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    console.log('NEW RESQUEST ' + req)
    if (!token) return res.status(401).send('Unauthorized');


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token'})
    }
}

module.exports = authMiddleware;