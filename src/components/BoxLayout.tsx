import React from 'react'
import styled from '@emotion/styled'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayButton from './PlayButton';
import { useRecoilState } from 'recoil';
import { isPlayAtom } from '../utils/atoms';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 350px;
  margin-top: 15px;
  margin-bottom: 15px;
  margin: 7px;
  justify-content: space-between;
  @media screen and (max-width: 850px) {
    margin: 0 auto;
    margin: 7px;
  }
`;

const MusicBox = styled.div`
  /* margin-left: 15px; */
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const InnerMusicBox = styled.div`
  margin-left: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MusicImage = styled.img`
  /* border-radius: 120px; */
  display: block;
  height: 60px;
  width: 60px;
  object-fit: cover;
`;

const MusicTitle = styled.h3`
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ArtistName = styled.p`
  font-size: 12px;
  margin-top: 4px;
`;

const BoxLayout = ({ tracks }: any) => {
  return (
    <Wrapper>
      <MusicBox>
        <MusicImage
          src={tracks.image}
          alt={`track artwork for ${tracks.title} by ${tracks.artist}`}
        />
        <InnerMusicBox>
          <MusicTitle>{tracks.title}</MusicTitle>
          <ArtistName>{tracks.artist}</ArtistName>
        </InnerMusicBox>
      </MusicBox>
      <PlayButton
        // className="play"
        // onClick={() => onPlayPauseClick(true)}
        // aria-label="Play"
        id={tracks.id}
      />
    </Wrapper>
  )
}

export default BoxLayout
