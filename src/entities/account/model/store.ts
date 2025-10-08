import { defineStore } from 'pinia';
import type { Account, UpdateAccountDto } from './types';

interface State {
  items: Map<string, Account>;
}
type TItemsEntries = [string, Account][]

export const useAccountsStore = defineStore('accounts', {
  state: (): State => ({
    items: new Map<string, Account>(),
  }),
  getters: {
    getEntries(state): TItemsEntries {
      return Array.from(state.items.entries())
    }
  },
  actions: {
    add(key: string, account: Account) {
      this.items.set(key, account);
    },
    remove(id: string) {
      this.items.delete(id);
    },
    update(id: string, data: UpdateAccountDto) {
      const current = this.items.get(id);
      if (!current) return;
      this.items.set(id, { ...current, ...data });
    },
  },
});
