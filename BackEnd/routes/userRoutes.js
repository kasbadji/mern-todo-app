// routes/userRoutes.js
const express = require('express');
const { signUp, login, refresh } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/refresh', refresh); // 🔄 new route

module.exports = router;
