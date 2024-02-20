import React from 'react';

const Playlist = ({ playlist, currentTrackIndex, onPlayButtonClick }) => {
  return (
    <div>
      <h2>Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li key={index} style={{ fontWeight: index === currentTrackIndex ? 'bold' : 'normal' }}>
            {track.name}
            <button onClick={() => onPlayButtonClick(index)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
