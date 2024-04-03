import type { LocationQueryValue } from "vue-router";

export class Filters {
  [key: string]: Date[] | LocationQueryValue | LocationQueryValue[]

  status: LocationQueryValue | LocationQueryValue[];
  points: LocationQueryValue | LocationQueryValue[];
  types: LocationQueryValue | LocationQueryValue[];
  advantage: LocationQueryValue | LocationQueryValue[];
  availability: LocationQueryValue | LocationQueryValue[];
  taskStartDate: Date[];
  taskEndDate: Date[];

  constructor(
    status: LocationQueryValue | LocationQueryValue[],
    points: LocationQueryValue | LocationQueryValue[],
    types: LocationQueryValue | LocationQueryValue[],
    advantage: LocationQueryValue | LocationQueryValue[],
    availability: LocationQueryValue | LocationQueryValue[],
    taskStartDate: LocationQueryValue | LocationQueryValue[],
    taskEndDate: LocationQueryValue | LocationQueryValue[],
  ) {
    this.status = status;
    this.points = points;
    this.types = types;
    this.advantage = advantage;
    this.availability = availability;
    this.taskStartDate = queriesToDates(taskStartDate);
    this.taskEndDate = queriesToDates(taskEndDate);
  }
}

function queriesToDates(stringDates: LocationQueryValue | LocationQueryValue[]): Date[] {
  if (!stringDates) {
    return [];
  }

  if(typeof stringDates === 'string'){
    const timestamp: number = parseInt(stringDates);
    return [new Date(timestamp)];
  }

  const dates: Date[] = [];
  for (const dateString of stringDates) {
    const timestamp: number = parseInt(String(dateString));
    const date: Date = new Date(timestamp);
    dates.push(date);
  }

  return dates;    
}

export class FilterTasks {
  title: string;
  value: number | string;

  constructor(title: string, value: number | string) {
    this.title = title;
    this.value = value;
  }
}

export interface SearchData {
  sortState: Number;
  searchPhrase: string;
}
