import { defineStore } from "pinia";

export const useCookieStore = defineStore("cookieStore", {
  actions: {
    getCookie(cname) {
      const name = `${cname}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(";");

      for (const item of ca) {
        const c = item.trim();

        if (c.startsWith(name)) {
          return c.substring(name.length, c.length);
        }
      }

      return "";
    },
    setCookie(cname, cvalue, exdays) {
      const date = new Date();
      date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${cname}=${cvalue};${expires};path=/`;
    },
  },
});
