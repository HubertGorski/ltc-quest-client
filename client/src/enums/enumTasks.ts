import { FilterTasks } from "@/models/Filters";

export enum TASK_STATUS {
  CONFIRMED = 2,
  EXPECTANCY = 1,
  UNDONE = 0,
  REJECTED = -1,
}
export const taskStatusItems: FilterTasks[] = [
  new FilterTasks("filters.taskStatus.confirmed", 'confirmed'),
  new FilterTasks("filters.taskStatus.expectancy", 'expectancy'),
  new FilterTasks("filters.taskStatus.undone", 'undone'),
  new FilterTasks("filters.taskStatus.rejected", 'rejected'),
]

export const taskPointsItems: FilterTasks[] = [
  new FilterTasks("filters.taskPoints.positive", 'positive'),
  new FilterTasks("filters.taskPoints.negative", 'negative'),
]

export const taskTypesItems: FilterTasks[] = [
  new FilterTasks("filters.taskType.additional", 'additional'),
  new FilterTasks("filters.taskType.default", 'default'),
]

export const taskTeamAdvantageItems: FilterTasks[] = [
  new FilterTasks("filters.taskTeamAdvantage.win", 'win'),
  new FilterTasks("filters.taskTeamAdvantage.lose", 'lose'),
]

export const taskNatureItems: FilterTasks[] = [
  new FilterTasks("filters.taskNature.special", 'special'),
  new FilterTasks("filters.taskNature.basic", 'basic'),
]
