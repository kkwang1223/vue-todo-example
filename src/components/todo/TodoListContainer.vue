<script setup lang="ts">
import { ref, readonly, provide } from 'vue';
import { useStorage } from '../../compositions/storage';
import TodoListNew from './TodoListNew.vue';
import TodoListMain from './TodoListMain.vue';
import { ITodo } from '../../model/todo';

const todos = ref<any>([]);
const { loadTodos, saveTodos, storageId } = useStorage();

provide('todos', readonly(todos));

const initTodos = (init_todos: any) => {
  todos.value = init_todos;
}

const addTodo = (job: string, date: string) => {
  todos.value.push({
    id: storageId.value++,
    job,
    date,
    completed: false,
  });
  saveTodos(todos);
};

const removeTodo = (id: number) => {
  todos.value.splice(id, 1);
  todos.value.forEach((todo: any, idx: number) => {
    todo.id = idx;
  });
  saveTodos(todos);
};

const completeTodo = (id: number) => {
  todos.value.find((todo: any) => todo.id === id).completed = true;
  saveTodos(todos);
};

provide('addTodo', addTodo);
provide('removeTodo', removeTodo);
provide('completeTodo', completeTodo);

loadTodos(initTodos);
</script>

<template>
  <TodoListNew />
  <section class="container">
    <div class="row justify-content-center m-2">
      <TodoListMain />
    </div>
  </section>
</template>