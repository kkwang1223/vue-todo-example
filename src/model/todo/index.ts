export interface ITodo {
  id: number;
  completed: boolean;
  date: string;
  job: string;
}

export interface IFilters {
  [k: number]: IFilter;
}

export interface IFilter {
  str: string;
  func: any;
  category: boolean;
}