<script setup lang="ts">
import { inject } from 'vue';
import TodoListContainer from './components/todo/TodoListContainer.vue';

const today = inject<string>('today');
</script>

<template>
  <header>
    <div class="my-5 hgroup">
      <h1>나의 할일</h1>
      <em>{{ today }}</em>
    </div>
  </header>
  <TodoListContainer />
</template>

<style scoped>
.hgroup {
  text-align: center;
  font-family: 'Arial Bold';
}

.hgroup h1 {
  font-weight: bolder;
}
</style>