<script setup lang="ts">
import { useCounterStore } from './stores/counter'
import Timer from './components/Timer.vue'
import Tasks from './components/Tasks.vue';
const counter = useCounterStore()
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left content (2/3 width) -->
    <div class="w-2/3 bg-base-200 p-4">
      <h2 class="text-5xl font-bold mb-4">Cottage Clock</h2>
      <!-- Add other components here -->
    <div class="w-2/3 p-4 flex">
      <Tasks/>
    </div>
    </div>

    <!-- Right Timer (1/3 width) -->
    <div class="w-1/3 p-4 flex justify-center items-start">
      <Timer />
    </div>
  </div>
</template>