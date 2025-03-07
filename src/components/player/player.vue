<template>
  <div class="space-y-8">
    <div
      v-for="(team, index) in leaderboardStore.createdTeams"
      :key="index"
      class="w-full space-y-2"
    >
      <score
        :name="team.teamName"
        :score="team.totalScore"
        :team-index="index"
      />

      <div>
        <div
          v-for="(item, index) in team.players"
          :key="index"
          class="w-full relative"
          :class="{ 'border-b border-tournament-400': index === 3 }"
        >
          <span
            v-if="index === cutLine(team.players)"
            class="text-tournament-300 text-[8px] font-semibold absolute right-3 bottom-0"
            >Cut Line</span
          >
          <div
            class="w-full"
            :class="{
              'border-b border-tournament-300': index === cutLine(team.players),
            }"
          >
            <player-item
              :model="item"
              :index="index"
              :cut-index="cutLine(team.players)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PlayerItem from "@/components/player/components/item.vue";
import Score from "@/components/player/components/score.vue";
import { useLeaderboardStore } from "@/stores/leaderboard";

const leaderboardStore = useLeaderboardStore();

const roundThreeStarted = (players) => {
  let roundThreeStarted = false;

  players.forEach((player) => {
    if (player?.status?.period > 2) {
      roundThreeStarted = true;
      return;
    }
  });

  return roundThreeStarted;
};

const cutLine = (players) => {
  const cutIndex = players.findIndex(
    (player) =>
      player?.statistics[0]?.displayValue > leaderboardStore.tournament.cutScore
  );

  if (!roundThreeStarted(players)) {
    return cutIndex - 1;
  } else {
    return -1;
  }
};
</script>
