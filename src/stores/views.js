import { defineStore } from "pinia";

export const useViewsStore = defineStore("viewsStore", {
  state: () => ({
    event: "pga",
    activeView: "standings",
  }),
  actions: {
    toggleView(value) {
      this.activeView = value;
    },
  },
});
