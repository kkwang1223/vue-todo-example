<script setup lang="ts">
import { Ref, ref, watch, provide, inject } from 'vue';
import { useFilter } from '../../compositions/useFilter';

import TodoListMenu from './TodoListMenu.vue';
import TodoList from './TodoList.vue';
import { ITodo, IFilters, IGroupByTodos } from '../../models/todo';

const { getPendingTodos, getActiveTodayTodos, getCompletedTodayTodos, getAllTodayTodos, getAllTodos } = useFilter();
const filter = ref(0);
const filtered_todos = ref<IGroupByTodos>({});
const pending_todos = ref<ITodo[]>([]);
const use_category = ref(false);
const todos = inject<Ref<ITodo[]>>('todos');

const filters: IFilters = {
  0: {
    str: '해야 할 작업들',
    func: getActiveTodayTodos,
    category: false,
  },
  1: {
    str: '완료한 작업들',
    func: getCompletedTodayTodos,
    category: false,
  },
  2: {
    str: '오늘의 모든 기록',
    func: getAllTodayTodos,
    category: false,
  },
  3: {
    str: '모든 작업',
    func: getAllTodos,
    category: true,
  },
};

provide('filters', filters);

const groupBy = (todos: ITodo[]) => {
  return todos.reduce((acc: IGroupByTodos, cur: ITodo) => {
    acc[cur['date']] = acc[cur['date']] || [];
    acc[cur['date']].push(cur);
    return acc;
  }, {});
};

const onChangeFilter = (filter_idx: number) => {
  filter.value = Number(filter_idx);
};

todos && watch([() => filter.value, todos.value],
  ([new_filter, new_todos], [old_filter, old_todos]) => {
    pending_todos.value = getPendingTodos(todos);
    if (typeof new_filter !== 'undefined') {
      const temp_todos = filters[new_filter].func(todos);
      filtered_todos.value = groupBy(temp_todos);
      use_category.value = filters[new_filter].category;
    }
  },
  { immediate: true }
);
</script>

<template>
  <TodoListMenu @change-filter="onChangeFilter" class="p-0" />
  <div v-for="key in Object.keys(filtered_todos)" :key="key" class="mb-3">
    <div v-if="use_category">
      <em>{{ key }}</em>
    </div>
    <TodoList :data="filtered_todos[key]" />
  </div>
  <div class="my-2 mt-5">
    <span style="background-color: red;">&nbsp;</span>&nbsp;
    <strong>처리하지 못한 작업들</strong>
  </div>
  <TodoList :data="pending_todos" />
</template>