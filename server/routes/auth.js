const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.login);
router.get('/callback', authController.callback);
router.post('/logout', authController.logout);
router.get('/status', authController.status);

module.exports = router;
