<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed, onUnmounted } from 'vue'
import alarmSound from '../assets/Timer.mp3'
import sessionSound from '../assets/Session.mp3'

type SessionType = 'active' | 'short' | 'long'

const sessionSequence = ref<SessionType[]>([])
const currentStepIndex = ref(0)
const time = ref(0)
const intervalId = ref<number | null>(null)
const hasStarted = ref(false)

const alarmTimer = new Audio(alarmSound)
const alarmSession = new Audio(sessionSound)

function addStep(type: SessionType) {
  sessionSequence.value.push(type)
}

function removeStep(index: number) {
  sessionSequence.value.splice(index, 1)
}

const seconds = computed(() => String(time.value % 60).padStart(2, '0'))
const minutes = computed(() => String(Math.floor(time.value / 60)).padStart(2, '0'))

function getStepDuration(type: SessionType) {
  switch (type) {
    case 'active': return 1 * 60 
    case 'short': return 15 * 60
    case 'long': return 30 * 60
  }
}

function start() {
  if (intervalId.value !== null) return
  intervalId.value = window.setInterval(() => {
    if (time.value > 0) {
      time.value--
    } else {
      pause()
      if (currentStepIndex.value < sessionSequence.value.length - 1) {
        alarmTimer.play()
      }
      currentStepIndex.value++
      startNextStep()
    }
  }, 1000)
}

function pause() {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

onUnmounted(() => pause())

function startSession() {
  if (!hasStarted.value) {
    hasStarted.value = true
    currentStepIndex.value = 0
    startNextStep()
  } else {
    start()
  }
}

function startNextStep() {
  if (currentStepIndex.value >= sessionSequence.value.length) {
    hasStarted.value = false
    pause()
    alarmSession.play()
    return
  }

  const stepType = sessionSequence.value[currentStepIndex.value]
  time.value = getStepDuration(stepType)
  start()
}

const startButtonLabel = computed(() => {
  if (!hasStarted.value) return "Start Session"
  if (intervalId.value === null && time.value > 0) return "Resume"
  return "Running..."
})

const stepIcons: Record<SessionType, string> = {
  active: 'mingcute:book-4-line',
  short: 'mingcute:teacup-line',
  long: 'mingcute:bed-line',
}

const currentStep = computed(() => sessionSequence.value[currentStepIndex.value] || null)
</script>


<template>
  <div class="flex justify-center items-center h-screen">
    <div class="card w-96 bg-base-200 text-base-content shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-5xl justify-center">Timer</h2>
        <div class="divider"></div>

        <div class="flex justify-center items-center text-6xl">
          <span>{{ minutes }}</span> : <span>{{ seconds }}</span>
        </div>

        <div class="card-actions justify-center mt-2 flex gap-2">
          <button class="btn btn-primary" @click="startSession">
            {{ startButtonLabel }}
          </button>
          <button class="btn btn-secondary" @click="pause">Pause</button>
        </div>

        <div class="divider"></div>
        <h3 class="card-title text-3xl mt-1 justify-center">Create your session!</h3>

        <ul class="steps overflow-hidden">
          <li
            v-for="(step, index) in sessionSequence"
            :key="index"
            :class="[
              'step',
              index <= currentStepIndex ? 'step-primary' : '',
              'cursor-pointer hover:scale-110 transition'
              ]"

            @click="removeStep(index)"
          >
            <Icon :icon="stepIcons[step]" class="w-6 h-6" />
          </li>
        </ul>

        <div class="flex flex-wrap gap-2 justify-center mt-2">
          <button class="btn btn-primary" @click="addStep('active')">Active study</button>
          <button class="btn btn-primary" @click="addStep('short')">Short break</button>
          <button class="btn btn-primary" @click="addStep('long')">Long break</button>
        </div>
      </div>
    </div>
  </div>
</template>
