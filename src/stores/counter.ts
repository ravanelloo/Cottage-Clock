import { defineStore } from 'pinia'

// Define the shape of your state
interface CounterState {
  count: number
}

export const useCounterStore = defineStore('counter', {
  // State with type
  state: (): CounterState => ({
    count: 0
  }),

  // Actions
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  },

  // Getters (like computed properties)
  getters: {
    doubleCount: (state) => state.count * 2
  }
})
