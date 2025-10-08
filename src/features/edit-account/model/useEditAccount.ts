import { reactive, computed } from 'vue';
import { useAccountsStore } from '@/entities/account/model/store';
import type { Account } from '@/entities/account/model/types';

interface EditAccountForm {
  labelString: string;
  type: Account['type'];
  login: string;
  password: string | null;
}

export function useEditAccount(account: Account) {
  const store = useAccountsStore();

  const form = reactive<EditAccountForm>({
    labelString: account.labels.map(l => l.text).join('; '),
    type: account.type,
    login: account.login,
    password: account.password ?? '',
  });

  function toLabels(str: string) {
    return str
      .split(';')
      .map(s => s.trim())
      .filter(Boolean)
      .map(text => ({ text }));
  }

  function normalizePassword(type: Account['type'], pwd: string) {
    return type === 'ldap' ? null : pwd;
  }

  function saveField(idx: string) {
    if (!form.login.trim()) return;
    const isPasswordRequired = form.type === 'local';
    const isPasswordEmpty = !form.password || !form.password.trim();
    if (isPasswordRequired && isPasswordEmpty) return;

    const password = isPasswordRequired ? normalizePassword(form.type, form.password!.trim()) : null;

    store.update(idx, {
      labels: toLabels(form.labelString),
      type: form.type,
      login: form.login.trim(),
      password,
    });
  }

  const isLocal = computed(() => form.type === 'local');

  return {
    form,
    isLocal,
    saveField,
  };
}
