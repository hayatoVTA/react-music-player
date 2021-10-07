import { atom } from 'recoil';

export const isPlayAtom = atom({
  key: "isPlayAtom",
  default: false
})

export const trackIndexAtom = atom({
  key: "trackIndexAtom",
  default: 0
})

export const isRepeatAtom = atom({
  key: "isRepeatAtom",
  default: 0,
})

export const isShuffleAtom = atom({
  key: "isShuffleAtom",
  default: false,
})
