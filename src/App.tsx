import AudioPlayer from './components/AudioPlayer';
import tracks from './utils/tracks';
import './styles/reset.css'
import './styles/style.css'
import MusicList from './components/MusicList';
import styled from '@emotion/styled'
import { RecoilRoot } from 'recoil';

const Wrapper = styled.div`
  padding: 5px;
  margin-top: 50px;
  padding-bottom: 50px;
  @media screen and (min-width: 850px){
    display: flex;
    justify-content: space-evenly;
  }
`;


function App() {
  return (
    <RecoilRoot>
      <Wrapper>
        <AudioPlayer tracks={tracks} />
        <MusicList tracks={tracks} />
      </Wrapper>
    </RecoilRoot>
  );
}

export default App;
