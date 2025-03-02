const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware);

router.get("/", userController.getUser);
router.put("/update", userController.updateUser);

module.exports = router;