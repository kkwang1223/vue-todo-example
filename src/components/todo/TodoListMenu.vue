<script setup lang="ts">
import { ref, watch, computed, inject } from 'vue';

const emits = defineEmits(['changeFilter']);
const filters = inject<any>('filters');
const filter = ref(0);

const state = computed(() => {
  return filters[filter.value].str;
});

watch(() => filter.value, (item) => {
  emits('changeFilter', item);
});

const onClick = (key: any) => {
  filter.value = key;
}

</script>

<template>
  <div class="row">
    <div class="col">
      <span style="background-color: blue;">&nbsp;</span>&nbsp;
      <strong>{{ state }}</strong>
    </div>
    <div class="col">
      <div class="btn-group float-end">
        <button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
          리스트 필터
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="key in Object.keys(filters)" :key="key">
            <a class="dropdown-item" @click="onClick(key)">
              {{filters[key].str}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>