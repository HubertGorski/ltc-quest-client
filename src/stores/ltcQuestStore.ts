import { defineStore } from 'pinia';

interface SpaceState {
  isPointsBarsAvailable: boolean;
}

export const useLtcQuestStore = defineStore({
  id: 'ltcQuestStore',
  state: (): SpaceState => ({
    isPointsBarsAvailable: true,
  }),
});