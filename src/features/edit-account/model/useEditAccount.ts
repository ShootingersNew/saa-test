import { reactive, computed } from 'vue';
import { useAccountsStore } from '@/entities/account/model/store';
import type { Account } from '@/entities/account/model/types';
import { fieldStrategies, type FieldKey, type FieldStrategyResult } from '@/entities/account/lib/normalizers';

interface EditAccountForm {
  labelString: string;
  type: Account['type'];
  login: string;
  password: string | null;
}

export function useEditAccount(accountId: string, snapshot: Account) {
  const store = useAccountsStore();

  const form = reactive<EditAccountForm>({
    labelString: snapshot.labels.map(l => l.text).join('; '),
    type: snapshot.type,
    login: snapshot.login,
    password: snapshot.password ?? '',
  });

  const fieldErrors = reactive<Record<FieldKey, string | null>>({
    labelString: null,
    type: null,
    login: null,
    password: null,
  });

  const isLocal = computed(() => form.type === 'local');

  interface SaveFieldResult {
    applied: boolean;
    error: string | null;
    field: FieldKey;
  }

  function saveField(field: FieldKey): SaveFieldResult {
    const strategy = fieldStrategies[field];
    if (!strategy) return { applied: false, error: 'unknown_field', field };
    const result: FieldStrategyResult = strategy(form);
    if ('error' in result) {
      fieldErrors[field] = result.error;
      return { applied: false, error: result.error, field };
    }
    const { patch, cb } = result;

    const hasPatch = patch && Object.keys(patch).length > 0;
    if (hasPatch) {
      store.update(accountId, patch!);
      if (cb) cb(form);
    }

    fieldErrors[field] = null;
    return { applied: !!hasPatch, error: null, field };
  }

  return {
    form,
    isLocal,
    saveField,
    fieldErrors,
  };
}
