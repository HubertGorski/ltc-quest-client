import { defineStore } from 'pinia';

interface SpaceState {
  isPointsBarsAvailable: boolean;
}

export const useSpaceStore = defineStore({
  id: 'spaceStore',
  state: (): SpaceState => ({
    isPointsBarsAvailable: true,
  }),

  actions: {
    togglePointsBars() {
      this.isPointsBarsAvailable = !this.isPointsBarsAvailable;
    },
    setPointsBarsVisibility(isVisible: boolean) {
      this.isPointsBarsAvailable = isVisible;
    },
  },
});
