<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
<!doctype html>
<html>
<div class="card w-96 bg-base-100 card-lg shadow-sm">
  <div class="card-body">
    <h2 class="card-title">Timer</h2>

    <div class="flex w-full flex-col">

  <div class="divider"></div>

</div>
    <span class="countdown font-mono text-2xl">
  <span style="--value:45;" aria-live="polite" aria-label="45">45</span>
  :
  <span style="--value:00;" aria-live="polite" aria-label="00">00</span>
</span>

    <p>Create your session</p>
    <button class="btn">Active study</button>
    <button class="btn">Short break</button>
    <button class="btn">Long break</button>
  </div>
</div>
</html>
</template>