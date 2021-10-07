import React from "react";
// import { ReactComponent as Play } from "./assets/play.svg";
// import { ReactComponent as Pause } from "./assets/pause.svg";
// import { ReactComponent as Next } from "./assets/next.svg";
// import { ReactComponent as Prev } from "./assets/prev.svg";
// import {BsFillSkipEndFill, BsFillSkipStartFill} from 'react-icons/bs'
// import { FaPlay, FaStop } from 'react-icons/fa'
import { green } from '@mui/material/colors';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import styled from '@emotion/styled'
import { Badge } from "@mui/material";
import { useAudioControllers } from "../utils/hooks";

const AudioControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
  margin: 0 auto 15px;
  align-items: center;
`;

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

const RepeatButton = styled(RepeatRoundedIcon)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const ShuffleButton = styled(ShuffleRoundedIcon)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
  isRepeating,
  onRepeat,
  isShuffling,
  onShuffle
}: any) => {
  const { increaseRepeatNum } = useAudioControllers();
  return (
    <AudioControlsWrapper>
      {
        isShuffling
          ?
          (
            <ShuffleButton
              onClick={() => onShuffle(false)}
              sx={{ color: green[400] }}
            />
          )
          :
          (
            <ShuffleButton
              onClick={() => onShuffle(true)}
            />
          )
      }
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
      {(() => {
        if (isRepeating === 1) {
          return (
            <RepeatButton
              onClick={increaseRepeatNum}
              sx={{ color: green[400] }}
            />
          )
        } else if (isRepeating === 2) {
          return (
            <Badge badgeContent={1} color="success">
              <RepeatButton
                onClick={increaseRepeatNum}
                sx={{ color: green[400] }}
              />
            </Badge>
          )
        } else {
          return (
            <RepeatButton
              onClick={increaseRepeatNum}
            />
          )
        }
      })()}
    </AudioControlsWrapper>
  )
};

export default AudioControls;
