import React, { useState } from 'react';

const PromptInput = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prompt);
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit} className="prompt-form">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your mood or desired playlist..."
        className="prompt-input"
      />
      <button type="submit" className="submit-button">
        Generate Playlist
      </button>
    </form>
  );
};

export default PromptInput;
