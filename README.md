
![Screenshot 2024-08-08 165725](https://github.com/user-attachments/assets/2ea60a13-ab4f-43c5-a894-a14be4db5585)

# Vibe.fm

AI-powered Spotify playlist creator that knows your library and current mood.

## Overview

Vibe.fm is a web application that leverages AI to generate personalized Spotify playlists based on your mood and libarary data. Connect your Spotify account, describe how you're feeling, and let vibe create the perfect playlist for you.

## Features

- Spotify OAuth integration for secure account connection
- Playlist generation using natural language prompts + your library.
- AI that understands your music preferences.
- Seamless playlist saving to your Spotify account

## Tech Stack

- Frontend: React
- Backend: Node.js with Express
- Database: MongoDB
- Model: GPT-4
- Authentication: Spotify OAuth

## Getting Started

1. Start MongoDB instance. 
2. Clone the repository
3. Set up the server:
   - Navigate to the `server` folder
   - Run `npm install`
   - Create a `.env` file with necessary environment variables
4. Set up the client:
   - Navigate to the `client` folder
   - Run `npm install`
   - Create a `.env` file with `REACT_APP_API_URL`
5. Start the server: `npm run dev` in the server folder
6. Start the client: `npm start` in the client folder
7. Open your browser and go to `http://localhost:3000`
