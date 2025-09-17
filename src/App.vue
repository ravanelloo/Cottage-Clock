<script setup lang="ts">
import { useCounterStore } from './stores/counter'

const counter = useCounterStore()
</script>

<template>
  <h1>Hello App!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/settings">Go to About</RouterLink>
  </nav>
  <main>
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>