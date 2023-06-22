import { defineStore } from 'pinia';

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    toggle() {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle("dark");
    },
  },
});

