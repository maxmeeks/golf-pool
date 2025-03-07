<template>
  <div
    class="bg-slate-100 font-nova min-h-screen flex flex-col justify-between"
  >
    <main class="container max-w-3xl p-4 pb-10 mx-auto">
      <div class="w-full flex justify-center mb-10">
        <template v-if="viewsStore.event === 'masters'">
          <img
            alt="The masters"
            src="@/assets/masters-logo.png"
            class="w-full max-w-[200px]"
          />
        </template>
        <template v-if="viewsStore.event === 'pga'">
          <img
            alt="PGA Championship"
            src="@/assets/pga-championship-logo.png"
            class="w-full max-w-[200px] mix-blend-multiply"
          />
        </template>
        <template v-if="viewsStore.event === 'us open'">
          <img
            alt="Us Open"
            src="@/assets/us-open-logo.png"
            class="w-full max-w-[200px] mix-blend-multiply"
          />
        </template>
        <template v-if="viewsStore.event === 'open championship'">
          <img
            alt="The Open Championship"
            src="@/assets/open-championship-logo.png"
            class="w-full max-w-[200px] mix-blend-multiply"
          />
        </template>
      </div>
      <template v-if="viewsStore.activeView === 'signup'">
        <rules />
        <signup />
      </template>
      <template v-else>
        <template v-if="viewsStore.activeView === 'standings'">
          <standings />
          <player />
        </template>
        <template v-if="viewsStore.activeView === 'leaderboard'">
          <leaderboard />
        </template>
      </template>
      <template v-if="viewsStore.activeView === 'rules'">
        <rules />
      </template>
    </main>
    <sticky-nav v-if="viewsStore.activeView !== 'signup'" />
  </div>
</template>

<script setup>
import "@/assets/index.css";
import { useLeaderboardStore } from "@/stores/leaderboard";
import { useViewsStore } from "@/stores/views";
import Standings from "@/components/standings/standings.vue";
import Player from "@/components/player/player.vue";
import StickyNav from "@/components/sticky-nav.vue";
import Leaderboard from "@/components/leaderboard/leaderboard.vue";
import Rules from "@/components/rules.vue";
import Signup from "@/components/signup.vue";
import { onBeforeMount, onMounted } from "vue";

const leaderboard = useLeaderboardStore();
const viewsStore = useViewsStore();

onBeforeMount(() => {
  leaderboard.createTiers();
});

onMounted(async () => {
  if (viewsStore.activeView !== "signup") {
    await leaderboard.fetchLeaderboard();
    if (!leaderboard.status.type.completed) {
      setInterval(leaderboard.fetchLeaderboard, 5000);
    }
  }
});
</script>
