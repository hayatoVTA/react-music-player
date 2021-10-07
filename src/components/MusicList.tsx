import React from 'react'
import BoxLayout from './BoxLayout';
import styled from '@emotion/styled'

const Wrapper = styled.div`
  width: 350px;
  border-radius: 20px;
  padding: 12px;
  /* padding-right: 10px; */
  background: #d3e1f7;
  box-shadow: 8px 8px 16px #c2cfe3, -8px -8px 16px #e4f3ff;
  @media screen and (max-width: 850px) {
    margin: 0 auto;
    margin-top: 25px;
  }
`;
const MusicList = ({ tracks }: any) => {
  return (
    <Wrapper>
      {
        tracks.map((data: any) => (
          <BoxLayout tracks={data} />
        ))
      }
    </Wrapper>
  )
}

export default MusicList
