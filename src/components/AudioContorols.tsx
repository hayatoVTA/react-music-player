import React from "react";
// import { ReactComponent as Play } from "./assets/play.svg";
// import { ReactComponent as Pause } from "./assets/pause.svg";
// import { ReactComponent as Next } from "./assets/next.svg";
// import { ReactComponent as Prev } from "./assets/prev.svg";
// import {BsFillSkipEndFill, BsFillSkipStartFill} from 'react-icons/bs'
// import { FaPlay, FaStop } from 'react-icons/fa'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import styled from '@emotion/styled'

const BackButton = styled(FastRewindRoundedIcon)`
  font-size: 3.5rem;
  cursor: pointer;
`;

const PauseButton = styled(PauseRoundedIcon)`
  font-size: 3.5rem;
  cursor: pointer;
`;

const PlayButton = styled(PlayArrowRoundedIcon)`
  font-size: 3.5rem;
  cursor: pointer;
`;

const ForwardButton = styled(FastForwardRoundedIcon)`
  font-size: 3.5rem;
  cursor: pointer;
`;

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick
}:any) => (
  <div className="audio-controls">
    <BackButton
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    />
    {isPlaying ? (
      <PauseButton
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      />
    ) : (
      <PlayButton
        className="play"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      />
    )}
    <ForwardButton
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    />
  </div>
);

export default AudioControls;
