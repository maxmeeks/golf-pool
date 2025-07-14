import { defineStore } from "pinia";

export const useViewsStore = defineStore("viewsStore", {
	state: () => ({
		event: "open championship",
		activeView: "signup",
	}),
	actions: {
		toggleView(value) {
			this.activeView = value;
		},
	},
});
