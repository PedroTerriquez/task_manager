const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.all);
router.get('/:id', taskController.getById);
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.destroy);

module.exports = router;