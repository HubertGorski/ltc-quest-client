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
    clearable: boolean = true,
  ) {
    this.name = name,
    this.value = isDate ? queriesToDates(value) : value;
    this.options = options;
    this.label = label;
    this.isDate = isDate;
    this.multipleSelect = multipleSelect;
    this.hideDetails = hideDetails;
    this.clearable = clearable;
  }
}

type FilterValue =  Date[] | LocationQueryValue | LocationQueryValue[];

export interface FilterObjectLabel {
  title: string;
  value: number | string;
}

export interface SelectedFilterObject {
  name: string;
  value: FilterValue;
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