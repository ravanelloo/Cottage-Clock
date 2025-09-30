<script setup lang="ts">
import { useCounterStore } from './stores/counter'
import Timer from './components/Timer.vue'
import Tasks from './components/Tasks.vue';
import BGM from './components/BGM.vue';
const counterStore = useCounterStore()
</script>

<template>
  <div class="min-h-screen flex">
    <div class="w-2/3 bg-base-200 p-4">
      <h2 class="text-4xl font-bold mb-4">Cottage Clock</h2>
      
      <div class="flex space-x-4 p-4">
        <div class="w-1/2">
          <Tasks />
        </div>
        
        <div class="w-1/2">
          <BGM />
        </div>
      </div>
    </div>

    <div class="w-1/3 p-4 flex justify-center items-start">
      <Timer />
    </div>
  </div>
</template>
