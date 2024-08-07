import React from 'react';

const Auth = ({ isAuthenticated, onLogin, onLogout }) => {
  return (
    <div className="auth-container">
      {isAuthenticated ? (
        <button onClick={onLogout} className="auth-button logout">
          Logout
        </button>
      ) : (
        <button onClick={onLogin} className="auth-button login">
          Connect Spotify
        </button>
      )}
    </div>
  );
};

export default Auth;
