import { reactive, toRefs } from 'vue';

export const useStorage = () => {
  const KEY = 'my-todo-list';
  const storageObj = reactive({ storageId: 0 });
  
  const loadTodos = (initTodos: any) => {
    const tempTodos = JSON.parse(localStorage.getItem(KEY) || '[]');
    tempTodos.forEach((todo: any, idx: number) => {
      todo.id = idx;
    });
    storageObj.storageId = tempTodos.length;
    initTodos(tempTodos);
  };

  const saveTodos = (todos: any) => {
    localStorage.setItem(KEY, JSON.stringify(todos.value));
  };

  return {
    ...toRefs(storageObj),
    loadTodos,
    saveTodos,
  };
};