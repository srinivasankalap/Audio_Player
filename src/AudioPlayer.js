import React, { useRef, useEffect, useState } from 'react';

const AudioPlayer = ({ track, onEnded }) => {
  const audioRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    audioRef.current.load();
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
      audioRef.current.play();
    });
  }, [track]);

  return (
    <div>
      <h2>Now Playing: {track ? track.name : 'No track selected'}</h2>
      <audio ref={audioRef} controls onEnded={onEnded}>
        <source src={track ? track.url : ''} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      {!isLoaded && <p>Loading...</p>}
    </div>
  );
};

export default AudioPlayer;
