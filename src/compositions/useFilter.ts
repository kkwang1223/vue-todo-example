import { Ref, inject } from 'vue';
import { ITodo } from '../models/todo';

export const useFilter = () => {
  const today = inject<string>('today');
  const fnSort = (a: ITodo, b: ITodo) => {
    const a_date = Date.parse(a.date);
    const b_date = Date.parse(b.date);

    if (a_date > b_date) {
      return 1;
    } else if (a_date < b_date) {
      return 0;
    } else {
      return a.id - b.id;
    }
  };

  const getPendingTodos = (todos: Ref<ITodo[]>) => {
    return todos.value.filter((todo: ITodo) => today && todo.date < today && !todo.completed)
    .slice()
    .sort(fnSort);
  };

  const getActiveTodayTodos = (todos: Ref<ITodo[]>) => {
    return todos.value.filter((todo: ITodo) => today && todo.date === today && !todo.completed)
    .slice()
    .sort(fnSort);
  };

  const getCompletedTodayTodos = (todos: Ref<ITodo[]>) => {
    return todos.value.filter((todo: ITodo) => today && todo.date === today && todo.completed)
    .slice()
    .sort(fnSort);
  };

  const getAllTodayTodos = (todos: Ref<ITodo[]>) => {
    return getActiveTodayTodos(todos).concat(getCompletedTodayTodos(todos))
    .slice()
    .sort(fnSort);
  };

  const getAllTodos = (todos: Ref<ITodo[]>) => {
    return todos.value.slice().sort(fnSort);
  };

  return {
    getPendingTodos,
    getActiveTodayTodos,
    getCompletedTodayTodos,
    getAllTodayTodos,
    getAllTodos,
  }
};