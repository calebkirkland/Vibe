import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import PromptInput from './components/PromptInput';
import PlaylistDisplay from './components/PlaylistDisplay';
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on component mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status', { credentials: 'include' });
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const handleLogin = () => {
    window.location.href = '/api/auth/login';
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      setIsAuthenticated(false);
      setPlaylist(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handlePromptSubmit = async (prompt) => {
    try {
      const response = await fetch('/api/playlist/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        credentials: 'include',
      });
      const data = await response.json();
      setPlaylist(data.playlist);
    } catch (error) {
      console.error('Error generating playlist:', error);
    }
  };

  const handleSavePlaylist = async () => {
    try {
      await fetch('/api/playlist/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlist }),
        credentials: 'include',
      });
      alert('Playlist saved to your Spotify account!');
    } catch (error) {
      console.error('Error saving playlist:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>vibe</h1>
        <Auth
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </header>
      <main className="app-main">
        {isAuthenticated ? (
          <>
            <PromptInput onSubmit={handlePromptSubmit} />
            <PlaylistDisplay playlist={playlist} onSave={handleSavePlaylist} />
          </>
        ) : (
          <p className="login-message">Please connect your Spotify account to get started.</p>
        )}
      </main>
    </div>
  );
}

export default App;
