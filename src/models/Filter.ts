import type { LocationQueryValue } from "vue-router";

export class Filter {
  name: string;
  value: FilterValue;
  options: FilterObjectLabel[];
  label: string;
  isDate: boolean;
  multipleSelect: boolean;
  hideDetails: boolean;
  clearable: boolean;

  constructor(
    name: string,
    value: LocationQueryValue | LocationQueryValue[],
    options: FilterObjectLabel[],
    label: string,
    isDate: boolean = false,
    multipleSelect: boolean = false,
    hideDetails: boolean = true,
    clearable: boolean = true
  ) {
    (this.name = name), (this.value = isDate ? queriesToDates(value) : value);
    this.options = options;
    this.label = label;
    this.isDate = isDate;
    this.multipleSelect = multipleSelect;
    this.hideDetails = hideDetails;
    this.clearable = clearable;
  }
}

type FilterValue = Date[] | LocationQueryValue | LocationQueryValue[];

export interface FilterObjectLabel {
  title: string;
  value: number | string;
}

export interface SelectedFilterObject {
  name: string;
  value: FilterValue;
}

export interface SelectedFilterObjectChips {
  id: number;
  name: string;
  value: FilterValue;
}

function queriesToDates(
  stringDates: LocationQueryValue | LocationQueryValue[]
): Date[] {
  if (!stringDates) {
    return [];
  }

  if (typeof stringDates === "string") {
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

export function getChips(filters: Filter[]): SelectedFilterObjectChips[] {
  const filterObjects: SelectedFilterObject[] = [];
  Object.values(filters).forEach((filter) => {
    if (
      (Array.isArray(filter.value) && filter.value.length > 0) ||
      (!Array.isArray(filter.value) && filter.value)
    ) {
      filterObjects.push({ name: filter.name, value: filter.value });
    }
  });

  const newArray: SelectedFilterObjectChips[] = [];
  filterObjects.forEach((element) => {
    if (typeof element.value === "object" && element.value) {
      element.value.forEach((value) => {
        if (value !== null) {
          newArray.push({
            id: newArray.length,
            name: element.name,
            value: value,
          });
        }
      });
    } else {
      newArray.push({
        id: newArray.length,
        name: element.name,
        value: element.value,
      });
    }
  });
  return newArray;
}
