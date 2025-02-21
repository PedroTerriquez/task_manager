const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware);

router.get('/:id', taskController.getById);
router.post('/:projectId', taskController.all);
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.destroy);

module.exports = router;