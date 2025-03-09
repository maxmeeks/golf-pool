<template>
	<div class="prose">
		<div class="w-full flex items-center justify-between space-x-4">
			<h2 class="text-xl font-medium text-tournament-900">Rules</h2>
		</div>

		<ul class="list-disc pl-6 py-6 space-y-2">
			<li>$15 Tournament Entry Fee</li>
			<li>Entries are limited to one team per person</li>
			<li>Payouts made to 1st, 2nd & 3rd place</li>
			<li>Pick one player from each tier to create your team</li>
			<li>
				Each team’s top 4 player rankings contribute to your overall
				team score
			</li>
			<li>
				Your team must have 4 players make the cut to be eligible to
				win. If you only have 3 players make the cut, your entire team
				is considered cut for the remainder of the tournament
			</li>
			<li>Lowest total team score wins</li>
			<li>
				In the result of a tie at the end of contention, the winner will
				be determined based on the winning score prediction submitted
				prior to the start of the tournament
			</li>
		</ul>
	</div>
</template>

<script setup>
import { useViewsStore } from "@/stores/views";

const event = useViewsStore().event;
</script>
