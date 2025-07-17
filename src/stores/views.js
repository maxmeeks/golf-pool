import { defineStore } from "pinia";

export const useViewsStore = defineStore("viewsStore", {
	state: () => ({
		event: "open championship",
		activeView: "standings",
	}),
	actions: {
		toggleView(value) {
			this.activeView = value;
		},
	},
});
