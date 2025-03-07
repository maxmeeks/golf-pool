<template>
  <footer
    class="sticky bottom-0 w-full flex items-center bg-white space-x-[1px]"
  >
    <button
      v-if="viewsStore.activeView !== 'standings'"
      class="flex-1 px-4 py-3 text-white flex items-center justify-center bg-tournament-900"
      @click="viewsStore.toggleView('standings')"
    >
      <span>Team Standings</span>
    </button>
    <button
      v-if="viewsStore.activeView !== 'leaderboard'"
      class="flex-1 px-4 py-3 text-white flex items-center justify-center bg-tournament-900"
      @click="viewsStore.toggleView('leaderboard')"
    >
      <span>Leaderboard</span>
    </button>
    <button
      v-if="viewsStore.activeView !== 'rules'"
      class="flex-1 px-4 py-3 text-white flex items-center justify-center bg-tournament-900"
      @click="viewsStore.toggleView('rules')"
    >
      <span>Rules</span>
    </button>
  </footer>
</template>

<script setup>
import { useViewsStore } from "@/stores/views";

const viewsStore = useViewsStore();
</script>
