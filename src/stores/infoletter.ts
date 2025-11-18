import { defineStore } from 'pinia';
import type { Infoletter } from '../models/infoletter';

export const useInfoletterStore = defineStore('infoletter', {
  state: () => ({
    infoletters: [] as Infoletter[]
  }),
  actions: {
    setInfoletters(list: Infoletter[]) {
      this.infoletters = list;
    },
    addInfoletter(letter: Infoletter) {
      this.infoletters.push(letter);
    },
  }
});