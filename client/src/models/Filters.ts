export class Filters {
  [key: string]: string[] | string | null;

  status: string[];
  points: string | null;
  types: string | null;
  advantage: string | null;
  availability: string | null;

  constructor(
    status: string[] = [],
    points: string | null = null,
    types: string | null = null,
    advantage: string | null = null,
    availability: string | null = null
  ) {
    this.status = status;
    this.points = points;
    this.types = types;
    this.advantage = advantage;
    this.availability = availability;
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
