const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.post('/generate', playlistController.generatePlaylist);
router.post('/save', playlistController.savePlaylist);

module.exports = router;
