<script setup lang="ts">
import { ref } from "vue"
import { Icon } from "@iconify/vue";

import mcLofi from "../assets/bgm/mclofi.opus";
import rainTrack from "../assets/bgm/rain.opus";
import birdsTrack from "../assets/bgm/birds.opus";
import riverTrack from "../assets/bgm/river.opus";
import stormTrack from "../assets/bgm/storm.opus";
import whiteTrack from "../assets/bgm/white.opus";

interface Sound {
  name: string
  src: string
  audio: HTMLAudioElement
  volume: number
  playing: boolean
  icon: string
}

const sounds = ref<Sound[]>([
  {
    name: "Lo-fi",
    src: mcLofi,
    audio: new Audio(mcLofi),
    volume: 0.5,
    playing: false,
    icon: "mingcute:music-fill",
  },
  {
    name: "Rain",
    src: rainTrack,
    audio: new Audio(rainTrack),
    volume: 0.5,
    playing: false,
    icon: "mingcute:rainstorm-line"
  },
  {
    name: "Storm",
    src: stormTrack,
    audio: new Audio(stormTrack),
    volume: 0.5,
    playing: false,
    icon: "mingcute:thunderstorm-line"
  },
  {
    name: "Birds",
    src: birdsTrack,
    audio: new Audio(birdsTrack),
    volume: 0.5,
    playing: false,
    icon: "mingcute:bird-line"
  },
  {
    name: "White noise",
    src: whiteTrack,
    audio: new Audio(whiteTrack),
    volume: 0.5,
    playing: false,
    icon: "mingcute:three-circles-line"
  },
  {
    name: "River",
    src: riverTrack,
    audio: new Audio(riverTrack),
    volume: 0.5,
    playing: false,
    icon: "mingcute:drop-line"
  }
])

function toggleSound(sound: Sound) {
  if (sound.playing) {
    sound.audio.pause()
    sound.playing = false
  } else {
    sound.audio.loop = true
    sound.audio.volume = sound.volume
    sound.audio.play()
    sound.playing = true
  }
}

function changeVolume(sound: Sound) {
  sound.audio.volume = sound.volume
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl w-full">
    <div class="card-body p-4">
      <h2 class="card-title text-5xl justify-center">Choose your sound</h2>

      <div class="divider"></div>

      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="(sound, index) in sounds"
          :key="index"
          class="flex flex-col items-center"
        >
         <button
  class="btn btn-circle btn-outline mb-2"
  @click="toggleSound(sound)"
>
  <Icon :icon="sound.icon" class="w-6 h-6" />
</button>

          <button
            class="btn btn-xs mb-2"
            @click="toggleSound(sound)"
          >
            {{ sound.playing ? "Pause" : "Play" }}
          </button>


          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-model="sound.volume"
            @input="changeVolume(sound)"
            class="range range-xs w-24"
          />
        </div>
      </div>
    </div>
  </div>
</template>