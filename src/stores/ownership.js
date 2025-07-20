import { defineStore } from "pinia";
import { usePlayersListStore } from "@/stores/players-list";
import { useLeaderboardStore } from "@/stores/leaderboard";

export const useOwnershipStore = defineStore("ownership", {
	state: () => ({
		teams: [],
		playerOwnership: {},
		ownershipTiers: [],
	}),
	actions: {
		async fetchTeams() {
			try {
				const response = await fetch("/teams-data-open.json");
				const data = await response.json();
				this.teams = data.teams;
			} catch (error) {
				console.error("Error fetching teams data:", error);
			}
		},
		calculateOwnership() {
			const ownership = {};
			this.teams.forEach((team) => {
				team.players.forEach((player) => {
					if (ownership[player.id]) {
						ownership[player.id]++;
					} else {
						ownership[player.id] = 1;
					}
				});
			});
			this.playerOwnership = ownership;
		},
		createOwnershipTiers() {
			const leaderboardStore = useLeaderboardStore();
			const playersListStore = usePlayersListStore();
			const tiers = [];
			const tempPlayers = JSON.parse(
				JSON.stringify(playersListStore.tournamentPlayers)
			);

			while (tempPlayers.length > 0) {
				tiers.push(
					tempPlayers.splice(0, leaderboardStore.tierPlayersPerGroup)
				);
			}

			if (tiers[leaderboardStore.tierGroupAmount]) {
				tiers[leaderboardStore.tierGroupAmount - 1] = [
					...tiers[leaderboardStore.tierGroupAmount - 1],
					...tiers[leaderboardStore.tierGroupAmount],
				];
				tiers.splice(leaderboardStore.tierGroupAmount, 1);
			}

			this.ownershipTiers = tiers.map((tier) => {
				const tierWithOwnership = tier.map((player) => {
					const playerInfo = leaderboardStore.players.find(
						(p) => p.athlete.displayName === player.name
					);
					const ownershipCount =
						this.playerOwnership[playerInfo?.athlete.id] || 0;
					const ownershipPercentage = (
						(ownershipCount / this.teams.length) *
						100
					).toFixed(2);
					return {
						...player,
						ownership: ownershipPercentage,
						playerInfo: playerInfo,
						score:
							playerInfo?.statistics?.[0]?.value === "E"
								? "E"
								: playerInfo?.statistics?.[0]?.value !==
								  undefined
								? Number(playerInfo?.statistics?.[0]?.value)
								: 999,
						isBestInTier: false,
					};
				});

				// Find the best player in this tier (lowest score)
				const eligiblePlayers = tierWithOwnership.filter(
					(p) =>
						p.playerInfo &&
						p.playerInfo.status?.displayValue !== "CUT" &&
						p.playerInfo.status?.displayValue !== "WD" &&
						p.score !== 999
				);

				if (eligiblePlayers.length > 0) {
					const bestPlayer = eligiblePlayers.reduce((best, current) =>
						current.score < best.score ? current : best
					);
					bestPlayer.isBestInTier = true;
				}

				return tierWithOwnership;
			});
		},
		async generateOwnershipData() {
			await this.fetchTeams();
			this.calculateOwnership();
			this.createOwnershipTiers();
		},
	},
});
