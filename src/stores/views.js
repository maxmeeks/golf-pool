import { defineStore } from "pinia";

export const useViewsStore = defineStore("viewsStore", {
	state: () => ({
		event: "us open",
		activeView: "standings",
	}),
	actions: {
		toggleView(value) {
			this.activeView = value;
		},
	},
});
