import { Ref } from 'vue';

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
  func: (todos: Ref<ITodo[]>) => ITodo[];
  category: boolean;
}

export interface IGroupByTodos {
  [k: string]: ITodo[];
}

export type TAddTodo = (job: string, date: string) => void;
export type TRemovTodo = (id: number) => void;
export type TCompleteTodo = (id: number) => void;