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
import { useRecoilState } from "recoil";
import { isPlayAtom, trackIndexAtom } from "../utils/atoms";

const BackButton = styled(FastRewindRoundedIcon)`
  font-size: 3.5rem;
  cursor: pointer;
`;

const PauseButton = styled(PauseRoundedIcon)`
  font-size: 3.5rem;
  cursor: pointer;
`;

const PlayArrowButton = styled(PlayArrowRoundedIcon)`
  font-size: 3.5rem;
  cursor: pointer;
`;

const ForwardButton = styled(FastForwardRoundedIcon)`
  font-size: 3.5rem;
  cursor: pointer;
`;

const PlayButton = ({id}:any) => {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayAtom);
  const [trackIndex, setTrackIndex] = useRecoilState(trackIndexAtom);
  return (
    <div>
      {(() => {
        if (id === trackIndex && isPlaying) {
          return (
            <PauseButton
              className="pause"
                onClick={() => {
                  setIsPlaying(false)
                  setTrackIndex(id)
                }}
              aria-label="Pause"
            />
          )
        } else {
          return (
            <PlayArrowButton
              className="play"
                  onClick={() => {
                    setIsPlaying(true)
                    setTrackIndex(id)
                  }}
              aria-label="Play"
            />
          )
        }
      })()}
  </div>
  )
}

export default PlayButton;
