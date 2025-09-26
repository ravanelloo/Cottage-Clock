<script setup lang="ts">
import { ref } from "vue"

interface Subtask {
  text: string
  done: boolean
}

interface Task {
  title: string
  subtasks: Subtask[]
}

const tasks = ref<Task[]>([])

const newTask = ref("")
const newSubtask = ref("")
const selectedTaskIndex = ref<number | null>(null)

function addTask() {
  if (newTask.value.trim() !== "") {
    tasks.value.push({
      title: newTask.value.trim(),
      subtasks: []
    })
    newTask.value = ""
  }
}

function addSubtask() {
  if (
    selectedTaskIndex.value !== null &&
    newSubtask.value.trim() !== ""
  ) {
    tasks.value[selectedTaskIndex.value].subtasks.push({
      text: newSubtask.value.trim(),
      done: false
    })
    newSubtask.value = ""
  }
}

function toggleSubtask(taskIndex: number, subIndex: number) {
  const subtask = tasks.value[taskIndex].subtasks[subIndex]
  subtask.done = !subtask.done
}

function isTaskDone(task: Task) {
  return task.subtasks.length > 0 && task.subtasks.every(s => s.done)
}

function toggleTask(task: Task, event: Event) {
  const input = event.target as HTMLInputElement
  task.subtasks.forEach(sub => {
    sub.done = input.checked
  })
}

</script>

<template>
  <div class="card w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-5xl justify-center">Tasks</h2>

      <div class="divider"></div>

      <!-- Add main task -->
      <div class="join mt-2">
        <input
          v-model="newTask"
          type="text"
          placeholder="New task..."
          class="input input-bordered join-item w-full"
        />
        <button @click="addTask" class="btn btn-primary join-item">Add</button>
      </div>

      <!-- Add subtask -->
      <div class="join mt-2">
        <select
          v-model="selectedTaskIndex"
          class="select select-bordered join-item"
        >
          <option :value="null" disabled>Select task</option>
          <option v-for="(task, index) in tasks" :key="index" :value="index">
            {{ task.title }}
          </option>
        </select>
        <input
          v-model="newSubtask"
          type="text"
          placeholder="New subtask..."
          class="input input-bordered join-item w-full"
        />
        <button @click="addSubtask" class="btn btn-secondary join-item">Add</button>
      </div>

      <!-- Task list -->
      <div class="mt-4 space-y-4">
        <div v-for="(task, taskIndex) in tasks" :key="taskIndex" class="bg-base-200 p-3 rounded-lg">
          <div class="flex items-center space-x-2">
           <input
  type="checkbox"
  class="checkbox checkbox-primary"
  :checked="isTaskDone(task)"
  @change="toggleTask(task, $event)"
/>

            <span class="font-semibold">{{ task.title }}</span>
          </div>
          <ul class="ml-6 mt-2 space-y-1">
            <li
              v-for="(sub, subIndex) in task.subtasks"
              :key="subIndex"
              class="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                class="checkbox checkbox-sm checkbox-accent"
                :checked="sub.done"
                @change="toggleSubtask(taskIndex, subIndex)"
              />
              <span :class="{ 'line-through text-gray-400': sub.done }">
                {{ sub.text }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
