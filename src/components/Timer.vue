<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed, onUnmounted } from 'vue'

const time = ref(2700)
let intervalId: number | null = null

const seconds = computed(() => String(time.value % 60).padStart(2, '0'))
const minutes = computed(() => String(Math.floor(time.value / 60)).padStart(2, '0'))

function start() {
  if (intervalId !== null) return
  intervalId = window.setInterval(() => {
    if (time.value > 0) {
      time.value--
    } else {
      pause()
    }
  }, 1000)
}

function pause() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onUnmounted(() => {
  pause()
})

</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="card w-96 bg-base-200 text-base-content shadow-xl">
      <div class="card-body">
        <!-- Main Header -->
        <h2 class="card-title text-4xl justify-center">Timer</h2>

        <div class="divider"></div>

        <!-- Countdown -->
        <div class="flex justify-center items-center text-4xl">
  <span>{{ minutes }}</span> : <span>{{ seconds }}</span>
</div>



        <!-- Start Button -->
        <div class="card-actions justify-center mt-4 flex gap-2">
          <button class="btn btn-primary" @click="start">Start</button>
          <button class="btn btn-secondary" @click="pause">Pause</button>
        </div>

        <!-- Second Header -->
        <h3 class="card-title text-2xl font-bold mt-4 justify-center">
          Create your session!
        </h3>

        <!-- Buttons -->
        <div class="flex flex-wrap gap-1 justify-center mt-1">
          <button class="btn">Active study</button>
          <button class="btn">Short break</button>
          <button class="btn">Long break</button>
        </div>
      </div>
    </div>
  </div>
</template>
