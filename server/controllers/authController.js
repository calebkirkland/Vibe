const spotifyService = require('../services/spotifyService');
const User = require('../models/User');

exports.login = (req, res) => {
  const authUrl = spotifyService.createAuthorizationUrl();
  res.redirect(authUrl);
};

exports.callback = async (req, res) => {
  try {
    const { code } = req.query;
    const tokenData = await spotifyService.getAccessToken(code);
    const userData = await spotifyService.getUserProfile(tokenData.access_token);

    let user = await User.findOne({ spotifyId: userData.id });
    if (!user) {
      user = await User.create({
        spotifyId: userData.id,
        email: userData.email,
        displayName: userData.display_name,
      });
    }

    user.accessToken = tokenData.access_token;
    user.refreshToken = tokenData.refresh_token;
    await user.save();

    req.session.userId = user.id;
    res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.error('Error in auth callback:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
};

exports.status = (req, res) => {
  res.json({ isAuthenticated: !!req.session.userId });
};
