import React from 'react';

const PlaylistDisplay = ({ playlist, onSave }) => {
  if (!playlist) return null;

  return (
    <div className="playlist-container">
      <h2>Generated Playlist</h2>
      <ul className="track-list">
        {playlist.map((track, index) => (
          <li key={index} className="track-item">
            {track.name} - {track.artists.join(', ')}
          </li>
        ))}
      </ul>
      <button onClick={onSave} className="save-button">
        Save to Spotify
      </button>
    </div>
  );
};

export default PlaylistDisplay;
