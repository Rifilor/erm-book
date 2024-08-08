import { defineStore } from 'pinia'
import type {IStore} from "@/interface/interfaces";



export const useStore = defineStore('storeId', {
  state: ():IStore => {
    return {
      links: [{
        name: 'users',
        linkName: 'users',
      }, {
        name: 'books',
        linkName: 'books',
      }, {
        name: 'settings',
        linkName: 'settings',
      }],
      transitionName: 'page',
    }
  },
  actions: {
    setTransitionName(name: string): void {
      this.transitionName = name
    }
  },
  getters: {
  },
})