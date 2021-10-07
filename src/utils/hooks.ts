import * as React from 'react';
import { useRecoilState } from 'recoil';
import { isRepeatAtom } from './atoms';

export const useAudioControllers = () => {
  const [isRepeat, setIsRepeat] = useRecoilState(isRepeatAtom);

  const increaseRepeatNum = () => {
    if (isRepeat >= 2) {
      setIsRepeat(0)
    } else {
      setIsRepeat(isRepeat + 1)
    }
  }
  return {increaseRepeatNum}
}
