import { defineStore } from "pinia";

export const useViewsStore = defineStore("viewsStore", {
	state: () => ({
		event: "players",
		activeView: "leaderboard",
	}),
	actions: {
		toggleView(value) {
			this.activeView = value;
		},
	},
});
