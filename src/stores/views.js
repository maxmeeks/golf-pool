import { defineStore } from "pinia";

export const useViewsStore = defineStore("viewsStore", {
	state: () => ({
		event: "us open",
		activeView: "signup",
	}),
	actions: {
		toggleView(value) {
			this.activeView = value;
		},
	},
});
