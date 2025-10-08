import { defineStore } from 'pinia';
import type { Account, UpdateAccountDto } from './types';

interface State {
  items: Record<string, Account>;
}
type TItemsEntries = [string, Account][];

export const useAccountsStore = defineStore('accounts', {
  state: (): State => ({
    items: {},
  }),
  getters: {
    getEntries(state): TItemsEntries {
      return Object.entries(state.items);
    },
  },
  actions: {
    add(key: string, account: Account) {
      this.items[key] = account;
    },
    remove(id: string) {
      delete this.items[id];
    },
    update(id: string, data: UpdateAccountDto) {
      const current = this.items[id];
      if (!current) return;
      this.items[id] = { ...current, ...data };
    },
  },
  persist: true
});
