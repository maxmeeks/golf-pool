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
					class="flex justify-between items-center"
					:class="{
						'bg-green-100 border-l-4 border-green-500 pl-2':
							player.isBestInTier,
					}"
				>
					<div class="flex items-center gap-2">
						<span>{{ player.name }}</span>
						<span
							v-if="player.isBestInTier"
							class="text-green-600 font-bold text-sm"
							>⭐ BEST</span
						>
					</div>
					<div class="flex items-center gap-2">
						<span
							v-if="player.score !== 999 && player.playerInfo"
							class="text-sm text-gray-600"
						>
							{{
								player.playerInfo.status?.displayValue ===
									"CUT" ||
								player.playerInfo.status?.displayValue === "WD"
									? player.playerInfo.status.displayValue
									: Number(player.score) === 0
									? "E"
									: (Number(player.score) > 0 ? "+" : "") +
									  player.score
							}}
						</span>
						<span>{{ player.ownership }}%</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { useOwnershipStore } from "@/stores/ownership";

const ownershipStore = useOwnershipStore();
</script>
