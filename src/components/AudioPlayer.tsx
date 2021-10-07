import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioContorols";
import Backdrop from "./Backdrop";
import "../styles/style.css";
import styled from '@emotion/styled'
import { useRecoilState } from "recoil";
import { isPlayAtom, isRepeatAtom, isShuffleAtom, trackIndexAtom } from "../utils/atoms";

const SliderBar = styled.input`
  -webkit-appearance: none;
`;


const AudioPlayer = ({ tracks }: any) => {

  // State
  const [trackIndex, setTrackIndex] = useRecoilState(trackIndexAtom);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayAtom);
  const [isRepeat, setIsRepeat] = useRecoilState(isRepeatAtom);
  const [isShuffle, setIsShuffle] = useRecoilState(isShuffleAtom)
  const [shuffleValue, setShuffleValue] = useState<any>([])

  // Destructure for conciseness
  const filteringTracks = tracks.filter((t:any) => t.id === trackIndex)
  const { title, artist, color, image, audioSrc }:any = filteringTracks[0] || {};;

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef<any>(null);
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;


  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        // 単曲リピートか確認
        if (isRepeat === 2) {
          toRepeatTrack();
        } else {
          // 違う場合、
          // シャッフルモードか確認
          if (isShuffle) {
            toShuffle();
          } else {
            if (isRepeat === 1) {
              toNextRepeatTrack();
            } else {
              toNextTrack();
            }
          }
        }
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value:any) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (shuffleValue.indexOf(trackIndex) - 1 < 0) {
      setTrackIndex(Math.max(...shuffleValue));
    } else {
      setTrackIndex(shuffleValue[shuffleValue.indexOf(trackIndex)-1]);
    }
  };

  const toNextRepeatTrack = () => {
    if (shuffleValue.indexOf(trackIndex) < tracks.length - 1) {
      setTrackIndex(shuffleValue[shuffleValue.indexOf(trackIndex)+1]);
    } else {
      setTrackIndex(0);
    }
  };

  const toNextTrack = () => {
    if (shuffleValue.indexOf(trackIndex) < tracks.length - 1) {
      setTrackIndex(shuffleValue[shuffleValue.indexOf(trackIndex)+1]);
    } else {
      setIsPlaying(false)
    }
  };

  const toRepeatTrack = async () => {
    await setTrackIndex(trackIndex);
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }

  const toShuffle = () => {
    // console.log(shuffleValue[Math.floor(Math.random() * shuffleValue.length)])
    const randomValue = shuffleValue[Math.floor(Math.random() * shuffleValue.length)]
    setTrackIndex(randomValue);
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }

  const next = () => {
    if (isRepeat === 2) {
      toRepeatTrack();
    } else {
      // 違う場合、
      // シャッフルモードか確認
      if (isShuffle) {
        toShuffle();
      } else {
        if (isRepeat === 1) {
          toNextRepeatTrack();
        } else {
          toNextTrack();
        }
      }
    }
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // const filteringTracks = tracks.filter((t: any) => t.id)
    let data: any[] = []
    tracks.forEach((t: any) => {
      // console.log([t.id].concat(shuffleValue))
      data.push(t.id)
    });
    setShuffleValue(data)
    // const { title, artist, color, image, audioSrc } = filteringTracks[0];
  }, [tracks])

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-player">
      <div className="track-info">
        <img
          className={`artwork ${isPlaying ? 'rotate-artwork': ''}`}
          src={image}
          alt={`track artwork for ${title} by ${artist}`}
        />
        <h2 className="title">{title}</h2>
        <h3 className="artist">{artist}</h3>
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={next}
          onPlayPauseClick={setIsPlaying}
          isRepeating={isRepeat}
          onRepeat={setIsRepeat}
          isShuffling={isShuffle}
          onShuffle={setIsShuffle}
        />
        <SliderBar
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
      <Backdrop
        trackIndex={trackIndex}
        activeColor={color}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default AudioPlayer;
