import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import Playlist from './Playlist';
import './App.css';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(storedPlaylist);
    const lastTrackIndex = JSON.parse(localStorage.getItem('lastTrackIndex')) || 0;
    setCurrentTrackIndex(lastTrackIndex);
  }, []);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newPlaylist = [...playlist];

    for (const file of files) {
      newPlaylist.push({ name: file.name, url: URL.createObjectURL(file) });
    }

    setPlaylist(newPlaylist);
    localStorage.setItem('playlist', JSON.stringify(newPlaylist));
  };

  const handlePlayButtonClick = (index) => {
    setCurrentTrackIndex(index);
  };

  const handlePlayNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  useEffect(() => {
    localStorage.setItem('lastTrackIndex', JSON.stringify(currentTrackIndex));
  }, [currentTrackIndex]);

  return (
    <>
    <h1>AUDIO PLAYER</h1>
    <div className='playback'>
      <input type="file" accept="audio/*" multiple onChange={handleFileUpload} />
      <Playlist
        playlist={playlist}
        currentTrackIndex={currentTrackIndex}
        onPlayButtonClick={handlePlayButtonClick}
      />
      <AudioPlayer
        track={playlist[currentTrackIndex]}
        onEnded={handlePlayNext}
        key={currentTrackIndex}
      />
    </div>
    </>
  );
};

export default App;
