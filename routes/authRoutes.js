const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUser = require('../services/schema_validator');

router.post("/signup", validateUser, authController.singup);
router.post("/login", authController.login);
module.exports = router;