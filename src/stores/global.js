import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    darkMode: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    toggle() {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle("dark");
    },
  },
});
