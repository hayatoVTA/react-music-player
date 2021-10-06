import React from 'react'
import ReactPlayer from 'react-player'
import AudioPlayer from './components/AudioPlayer';
import tracks from './utils/tracks';
import './styles/style.css'


function App() {
  return (
    <div className="App">
      <AudioPlayer tracks={tracks} />
    </div>
  );
}

export default App;
