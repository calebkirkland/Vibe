const openaiService = require('../services/openaiService');
const spotifyService = require('../services/spotifyService');
const User = require('../models/User');

exports.generatePlaylist = async (req, res) => {
  try {
    const { prompt } = req.body;
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const playlistDescription = await openaiService.generatePlaylistDescription(prompt);
    const playlist = await spotifyService.generatePlaylist(user.accessToken, playlistDescription);

    res.json({ playlist });
  } catch (error) {
    console.error('Error generating playlist:', error);
    res.status(500).json({ error: 'Failed to generate playlist' });
  }
};

exports.savePlaylist = async (req, res) => {
  try { 

    const { playlist } = req.body;
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    await spotifyService.savePlaylist(user.accessToken, playlist);

    res.json({ message: 'Playlist saved successfully' });
  } catch (error) {
    console.error('Error saving playlist:', error);
    res.status(500).json({ error: 'Failed to save playlist' });
  }
};

