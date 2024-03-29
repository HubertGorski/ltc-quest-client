export class Filters {
  [key: string]: string[] | string | Date[] | null;

  status: string[];
  points: string | null;
  types: string | null;
  advantage: string | null;
  availability: string | null;
  taskStartDate: Date[];
  taskEndDate: Date[];

  constructor(
    status: string[] = [],
    points: string | null = null,
    types: string | null = null,
    advantage: string | null = null,
    availability: string | null = null,
    taskStartDate: Date[] = [],
    taskEndDate: Date[] = []
  ) {
    this.status = status;
    this.points = points;
    this.types = types;
    this.advantage = advantage;
    this.availability = availability;
    this.taskStartDate = taskStartDate;
    this.taskEndDate = taskEndDate;
  }
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
