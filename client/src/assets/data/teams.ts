import { TEAM_ID, TEAM_NAME, TEAM_COLOR, TEAM_LOGO } from "@/enums/enumTeams";
import { Team } from "@/models/Team";

export const teams = [
  new Team(
    TEAM_ID.TEAM_1,
    TEAM_NAME.TEAM_1,
    TEAM_COLOR.TEAM_1,
    TEAM_LOGO.TEAM_1
  ),
  new Team(
    TEAM_ID.TEAM_2,
    TEAM_NAME.TEAM_2,
    TEAM_COLOR.TEAM_2,
    TEAM_LOGO.TEAM_2
  ),
  new Team(
    TEAM_ID.TEAM_3,
    TEAM_NAME.TEAM_3,
    TEAM_COLOR.TEAM_3,
    TEAM_LOGO.TEAM_3
  ),
  new Team(
    TEAM_ID.TEAM_4,
    TEAM_NAME.TEAM_4,
    TEAM_COLOR.TEAM_4,
    TEAM_LOGO.TEAM_4
  ),
  new Team(
    TEAM_ID.ALL_TEAMS,
    TEAM_NAME.ALL_TEAMS,
    TEAM_COLOR.ALL_TEAMS,
    TEAM_LOGO.ALL_TEAMS
  ),
];
