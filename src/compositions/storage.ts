import { Ref, reactive, toRefs } from 'vue';
import { ITodo } from '../models/todo';

export const useStorage = () => {
  const KEY = 'my-todo-list';
  const storageObj = reactive({ storageId: 0 });
  
  const loadTodos = (initTodos: (todos: ITodo[]) => void) => {
    const tempTodos = JSON.parse(localStorage.getItem(KEY) || '[]');
    tempTodos.forEach((todo: ITodo, idx: number) => {
      todo.id = idx;
    });
    storageObj.storageId = tempTodos.length;
    initTodos && initTodos(tempTodos);
  };

  const saveTodos = (todos: Ref<ITodo[]>) => {
    localStorage.setItem(KEY, JSON.stringify(todos.value));
  };

  return {
    ...toRefs(storageObj),
    loadTodos,
    saveTodos,
  };
};