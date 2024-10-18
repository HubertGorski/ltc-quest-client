import { defineStore } from 'pinia';

interface SpaceState {
  isPointsBarsAvailable: boolean;
}

export const useltcQuestStore = defineStore({
  id: 'ltcQuestStore',
  state: (): SpaceState => ({
    isPointsBarsAvailable: true,
  }),
});