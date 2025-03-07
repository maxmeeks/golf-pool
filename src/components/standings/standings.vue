<template>
  <div class="mb-20 flex flex-col space-y-2">
    <div class="flex items-center justify-between space-x-4 px-3">
      <h2 class="text-xl font-medium text-tournament-900">Standings</h2>
      <div class="flex items-center space-x-3">
        <div class="w-full flex items-center space-x-1">
          <div class="font-semibold flex items-center">
            <trophy-icon class="h-3 w-3 text-amber-400" />
          </div>
          <div class="flex-1 text-sm uppercase">$200</div>
        </div>
        <div class="w-full flex items-center space-x-1">
          <div class="font-semibold flex items-center">
            <trophy-icon class="h-3 w-3 text-grey-400" />
          </div>
          <div class="flex-1 text-sm uppercase">$80</div>
        </div>
        <div class="w-full flex items-center space-x-1">
          <div class="font-semibold flex items-center">
            <trophy-icon class="h-3 w-3 text-amber-700" />
          </div>
          <div class="flex-1 text-sm uppercase">$40</div>
        </div>
      </div>
    </div>

    <div class="border border-slate-300">
      <div
        v-for="(team, index) in leaderboardStore.leaderboard"
        :key="index"
        class="w-full px-3 py-1 bg-white"
        :class="{
          'border-b border-slate-300':
            index !== leaderboardStore.leaderboard.length - 1,
        }"
      >
        <standings-item :model="team" :position="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrophyIcon } from "@heroicons/vue/24/solid";
import StandingsItem from "@/components/standings/components/item.vue";
import { useLeaderboardStore } from "@/stores/leaderboard";

const leaderboardStore = useLeaderboardStore();
</script>
