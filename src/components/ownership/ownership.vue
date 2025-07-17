<template>
	<div class="space-y-4">
		<div
			v-for="(tier, index) in ownershipStore.ownershipTiers"
			:key="index"
			class="bg-white p-4 shadow border border-open-900"
		>
			<h2 class="text-xl font-bold mb-2">Tier {{ index + 1 }}</h2>
			<ul>
				<li
					v-for="player in tier"
					:key="player.name"
					class="flex justify-between"
				>
					<span>{{ player.name }}</span>
					<span>{{ player.ownership }}%</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { useOwnershipStore } from "@/stores/ownership";

const ownershipStore = useOwnershipStore();
</script>
