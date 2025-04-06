import { defineStore } from "pinia";

export const useViewsStore = defineStore("viewsStore", {
	state: () => ({
		event: "masters",
		activeView: "signup",
	}),
	actions: {
		toggleView(value) {
			this.activeView = value;
		},
	},
});
