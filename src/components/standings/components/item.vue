<template>
  <div class="w-full flex space-x-3">
    <div class="text-sm md:text-base font-semibold w-8 flex items-center">
      {{ calculatedPosition }}
    </div>
    <div class="flex-1 flex items-center space-x-2">
      <span
        v-if="
          leaderboardStore.status.type.completed &&
          (calculatedPosition < 4 ||
            calculatedPosition === 'T1' ||
            calculatedPosition === 'T2' ||
            calculatedPosition === 'T3')
        "
        ><trophy-icon
          class="h-4 w-4"
          :class="[
            {
              'text-amber-400':
                calculatedPosition == 1 || calculatedPosition == 'T1',
            },
            {
              'text-grey-400':
                calculatedPosition == 2 || calculatedPosition == 'T2',
            },
            {
              'text-amber-700':
                calculatedPosition == 3 || calculatedPosition == 'T3',
            },
          ]"
      /></span>
      <span class="w-full uppercase md:text-lg">
        {{ model.teamName }}
      </span>
    </div>
    <div
      class="md:text-xl font-semibold"
      :class="[
        { 'text-tournament-300': model.totalScore < 0 },
        { 'text-tournament-100': model.totalScore > 0 },
        {
          'text-tournament-500':
            model.totalScore === 0 || displayScore === 'CUT',
        },
      ]"
    >
      <span>
        {{ displayScore }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useLeaderboardStore } from "@/stores/leaderboard";
import { TrophyIcon } from "@heroicons/vue/24/solid";

const leaderboardStore = useLeaderboardStore();

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  },
  position: {
    type: Number,
    default: null,
  },
});

const displayScore = computed(() => {
  if (props.model.totalScore === 0) {
    return "E";
  } else {
    return props.model.totalScore;
  }
});

const calculatedPosition = computed(() => {
  let rank = leaderboardStore.leaderboard.findIndex(
    (team) => team.totalScore === props.model.totalScore
  );

  if (
    leaderboardStore.leaderboard[rank + 1]?.totalScore ===
    props.model.totalScore
  ) {
    return `T${rank + 1}`;
  } else {
    return rank + 1;
  }
});
</script>
