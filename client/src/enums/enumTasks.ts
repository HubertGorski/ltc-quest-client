export enum TASK_STATUS {
  CONFIRMED = 2,
  EXPECTANCY = 1,
  UNDONE = 0,
  REJECTED = -1,
}
export enum TASK_STATUS_TITLES {
  CONFIRMED = "Potwierdzone",
  EXPECTANCY = "Oczekujące",
  UNDONE = "Do zrealizowania",
  REJECTED = "Odrzucone",
}

export const taskStatusItems: FilterTasks[] = [
  {
    title: TASK_STATUS_TITLES.CONFIRMED,
    value: TASK_STATUS.CONFIRMED,
  },
  {
    title: TASK_STATUS_TITLES.EXPECTANCY,
    value: TASK_STATUS.EXPECTANCY,
  },
  {
    title: TASK_STATUS_TITLES.UNDONE,
    value: TASK_STATUS.UNDONE,
  },
  {
    title: TASK_STATUS_TITLES.REJECTED,
    value: TASK_STATUS.REJECTED,
  },
];

export enum TASK_POINTS {
  POSITIVE = 1,
  NEGATIVE = 0,
}
export enum TASK_POINTS_TITLES {
  POSITIVE = "Dodatnie punkty",
  NEGATIVE = "Ujemne punkty",
}

export const taskPointsItems: FilterTasks[] = [
  {
    title: TASK_POINTS_TITLES.POSITIVE,
    value: TASK_POINTS.POSITIVE,
  },
  {
    title: TASK_POINTS_TITLES.NEGATIVE,
    value: TASK_POINTS.NEGATIVE,
  },
];

export enum TASK_TYPE {
  DEFAULT = 0,
  ADDITIONAL = 1,
}
export enum TASK_TYPE_TITLES {
  DEFAULT = "Podstawowe",
  ADDITIONAL = "Dodatkowe",
}

export const taskTypesItems: FilterTasks[] = [
  {
    title: TASK_TYPE_TITLES.DEFAULT,
    value: TASK_TYPE.DEFAULT,
  },
  {
    title: TASK_TYPE_TITLES.ADDITIONAL,
    value: TASK_TYPE.ADDITIONAL,
  },
];

export enum TASK_LABELS {
  TASK = "Zadanie",
  TASK_STATUS = "Status zadania",
  TASK_POINTS = "Punkty zadania",
  TASK_TYPE = "Typ zadania",
}

interface FilterTasks {
  title: string;
  value: number;
}

export interface Filters {
  taskStatus: Number[];
  taskPoints: Number[];
  taskTypes: Number[];
}
export interface SearchData {
  sortState: Number;
  searchPhrase: String;
}
