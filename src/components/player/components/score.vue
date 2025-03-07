<template>
  <div class="w-full flex items-center justify-between space-x-4 px-3">
    <div class="flex">
      <button class="flex items-center space-x-2" @click="handlePinnedTeam()">
        <template v-if="leaderboardStore.createdTeams[teamIndex].isPinned">
          <star-icon class="w-5 h-5" />
        </template>
        <template v-else>
          <star-outline-icon class="w-5 h-5" />
        </template>
        <h2 class="text-xl font-medium text-tournament-900">
          {{ name }}
        </h2>
      </button>
    </div>
    <div class="flex items-center space-x-4">
      <span class="text-xs leading-8">TEAM SCORE</span>
      <div
        class="text-xl font-semibold"
        :class="[
          { 'text-tournament-300': score < 0 },
          { 'text-tournament-100': score > 0 },
          {
            'text-tournament-500':
              score === 0 || score === 'CUT' || score === 'WD',
          },
        ]"
      >
        {{ displayScore }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { StarIcon as StarOutlineIcon } from "@heroicons/vue/24/outline";
import { StarIcon } from "@heroicons/vue/24/solid";
import { useLeaderboardStore } from "@/stores/leaderboard";

const leaderboardStore = useLeaderboardStore();

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  score: {
    type: Number,
    default: null,
  },
  teamIndex: {
    type: Number,
    default: -1,
  },
});

const displayScore = computed(() => {
  if (props.score === 0) {
    return "E";
  } else {
    return props.score;
  }
});

const handlePinnedTeam = () => {
  leaderboardStore.updatePinnedTeam(props.teamIndex, props.name);
};
</script>
