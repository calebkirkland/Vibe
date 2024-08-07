const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

exports.createAuthorizationUrl = () => {
  const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
  return spotifyApi.createAuthorizeURL(scopes);
};

exports.getAccessToken = async (code) => {
  const data = await spotifyApi.authorizationCodeGrant(code);
  return {
    access_token: data.body['access_token'],
    refresh_token: data.body['refresh_token'],
  };
};

exports.getUserProfile = async (accessToken) => {
  spotifyApi.setAccessToken(accessToken);
  const { body } = await spotifyApi.getMe();
  return body;
};

exports.generatePlaylist = async (accessToken, description) => {
  spotifyApi.setAccessToken(accessToken);
  const { body } = await spotifyApi.searchTracks(description, { limit: 20 });
  return body.tracks.items.map(track => ({
    name: track.name,
    artists: track.artists.map(artist => artist.name),
    uri: track.uri,
  }));
};

exports.savePlaylist = async (accessToken, playlist) => {
  spotifyApi.setAccessToken(accessToken);
  const { body: user } = await spotifyApi.getMe();
  const { body: createdPlaylist } = await spotifyApi.createPlaylist(user.id, 'Vibe Generated Playlist');
  await spotifyApi.addTracksToPlaylist(createdPlaylist.id, playlist.map(track => track.uri));
};
