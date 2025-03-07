<template>
  <div class="prose">
    <div class="w-full flex items-center justify-between space-x-4">
      <h2 class="text-xl font-medium text-tournament-900">Rules</h2>
    </div>

    <ul class="list-disc pl-6 py-6 space-y-2">
      <li>
        $20 to play. Payouts vary based on the amount of team entries.
        Expectation is to payout 1st-3rd place
      </li>
      <li>Pick one player from each tier</li>
      <li>Top 4 player rankings contribute to a team score</li>
      <li>Team must have 4 players make the cut to be eligible to win</li>
      <li>Lowest team score wins</li>
      <li>Positional ties split payout</li>
    </ul>
  </div>
</template>

<script setup>
import { useViewsStore } from "@/stores/views";

const event = useViewsStore().event;
</script>
