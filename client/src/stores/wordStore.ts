import { defineStore } from "pinia";
import type { Team } from "@/models/Team";
import { teams } from "@/assets/data/teams";

interface WordState {
  wordId: number;
  name: string;
  logo: string;
  teams: Team[];
  isCoop: boolean;
}

export const useWordStore = defineStore({
  id: "wordStore",
  state: (): WordState => ({
    wordId: 1,
    name: 'LTC quest',
    logo: '',
    teams: teams,
    isCoop: true,
  }),

  getters: {
    getTeams: (state) => {
      return state.teams;
    },
    getTeamById: (state) => (teamId: number) => {
      return state.teams.find(team => team.teamId === teamId)
    },
  },

});
