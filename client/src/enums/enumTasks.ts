import { FilterTasks } from "@/models/Filters";

export enum TASK_STATUS {
  CONFIRMED = 2,
  EXPECTANCY = 1,
  UNDONE = 0,
  REJECTED = -1,
  DISABLED = -2,
}
export const taskStatusItems: FilterTasks[] = [
  new FilterTasks("filters.taskStatus.confirmed", "confirmed"),
  new FilterTasks("filters.taskStatus.expectancy", "expectancy"),
  new FilterTasks("filters.taskStatus.undone", "undone"),
  new FilterTasks("filters.taskStatus.rejected", "rejected"),
  new FilterTasks("filters.taskStatus.disabled", "disabled"),
];

export const taskPointsItems: FilterTasks[] = [
  new FilterTasks("filters.taskPoints.positive", "positive"),
  new FilterTasks("filters.taskPoints.negative", "negative"),
];

export const taskTypesItems: FilterTasks[] = [
  new FilterTasks("filters.taskType.basic", "basic"),
  new FilterTasks("filters.taskType.special", "special"),
];

export const taskTeamAdvantageItems: FilterTasks[] = [
  new FilterTasks("filters.taskTeamAdvantage.win", "win"),
  new FilterTasks("filters.taskTeamAdvantage.lose", "lose"),
];

export const taskAvailabilityItems: FilterTasks[] = [
  new FilterTasks("filters.availability.forAll", "forAll"),
  new FilterTasks(
    "filters.availability.onlySelectedTeams",
    "onlySelectedTeams"
  ),
];
