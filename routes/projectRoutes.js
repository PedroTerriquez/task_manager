const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware);

router.get('/', projectController.all);
router.get('/:id' , projectController.getByID);
router.post("/",  projectController.create);
router.put("/:id", projectController.update);
router.delete("/:id", projectController.destroy);

module.exports = router;