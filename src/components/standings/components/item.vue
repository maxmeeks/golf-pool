<template>
	<div class="w-full flex flex-col px-3 py-1" @click="toggle">
		<div class="flex space-x-3">
			<div
				class="text-sm md:text-base font-semibold w-8 flex items-center"
			>
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
				>
					<trophy-icon
						class="h-4 w-4"
						:class="[
							{
								'text-amber-400':
									calculatedPosition == 1 ||
									calculatedPosition == 'T1',
							},
							{
								'text-grey-400':
									calculatedPosition == 2 ||
									calculatedPosition == 'T2',
							},
							{
								'text-amber-700':
									calculatedPosition == 3 ||
									calculatedPosition == 'T3',
							},
						]"
					/>
				</span>
				<span class="w-full md:text-lg">
					{{ model.teamName }}
				</span>
			</div>
			<div
				class="md:text-xl font-semibold"
				:class="[
					{ 'text-tournament-300': model.totalScore < 0 },
					{ 'text-tournament-100': model.totalScore > 0 },
					{
						'text-masters-900':
							model.totalScore === 0 || displayScore === 'CUT',
					},
				]"
			>
				<span>{{ displayScore }}</span>
			</div>
		</div>

		<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter"
			@before-leave="beforeLeave"
			@leave="leave"
			@after-leave="afterLeave"
		>
			<div
				v-show="isOpen"
				ref="accordionContent"
				class="accordion-panel bg-gray-50 border-slate-300 mt-2"
			>
				<div class="border-r border-t border-slate-300">
					<div
						v-for="(item, index) in model.players"
						:key="index"
						class="w-full relative"
						:class="{
							'border-b border-tournament-300': index === 3,
						}"
					>
						<span
							v-if="index === cutLine(model.players)"
							class="text-tournament-300 text-[8px] font-semibold absolute right-3 bottom-0"
						>
							Cut Line
						</span>
						<div
							class="w-full"
							:class="{
								'border-b border-tournament-300':
									index === cutLine(model.players),
							}"
						>
							<player-item
								:model="item"
								:index="index"
								:cut-index="cutLine(model.players)"
							/>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
import PlayerItem from "@/components/player/components/item.vue";
import { computed, ref } from "vue";
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

const isOpen = ref(false);
const toggle = () => {
	isOpen.value = !isOpen.value;
};

function beforeEnter(el) {
	el.style.height = "0";
}
function enter(el) {
	el.style.height = el.scrollHeight + "px";
}
function afterEnter(el) {
	el.style.height = "auto";
}
function beforeLeave(el) {
	el.style.height = el.scrollHeight + "px";
}
function leave(el) {
	el.offsetHeight;
	el.style.height = "0";
}
function afterLeave(el) {
	el.style.height = "auto";
}

const roundThreeStarted = (players) => {
	let started = false;
	players.forEach((player) => {
		if (player?.status?.period > 2) {
			started = true;
		}
	});
	return started;
};

const cutLine = (players) => {
	const cutIndex = players.findIndex(
		(player) =>
			player?.statistics[0]?.displayValue >
			leaderboardStore.tournament.cutScore
	);
	return !roundThreeStarted(players) ? cutIndex - 1 : -1;
};

const displayScore = computed(() => {
	return props.model.totalScore === 0 ? "E" : props.model.totalScore;
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

<style scoped>
.accordion-panel {
	transition: height 0.3s ease;
	overflow: hidden;
}
</style>
