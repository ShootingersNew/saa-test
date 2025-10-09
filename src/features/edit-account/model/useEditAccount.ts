import { reactive, computed } from 'vue'
import { useAccountsStore } from '@/entities/account/model/store'
import type { Account } from '@/entities/account/model/types'
import {
  fieldStrategies,
  type FieldKey,
  type FieldStrategyResult,
  parseLabels,
  normalizeLogin,
  normalizePassword,
} from '@/entities/account/lib/normalizers'
import { validateRequiredAll as validateRequiredAllShared } from '@/shared/lib/validation/accountValidation'
import { diffAccount } from '@/entities/account/lib/diff'

interface EditAccountForm {
  labelString: string
  type: Account['type']
  login: string
  password: string | null
}

export function useEditAccount(accountId: string, snapshot: Account) {
  const store = useAccountsStore()

  const form = reactive<EditAccountForm>({
    labelString: snapshot.labels.map((l) => l.text).join('; '),
    type: snapshot.type,
    login: snapshot.login,
    password: snapshot.password ?? '',
  })

  const fieldErrors = reactive<Record<FieldKey, string | null>>({
    labelString: null,
    type: null,
    login: null,
    password: null,
  })

  const isLocal = computed(() => form.type === 'local')

  function validateRequiredAll(): boolean {
    const { loginErr, passwordErr, ok } = validateRequiredAllShared(form.type, form.login, form.password)
    fieldErrors.login = loginErr
    fieldErrors.password = passwordErr
    return ok
  }

  function makeSnapshot(): Account {
    return {
      labels: parseLabels(form.labelString),
      type: form.type,
      login: normalizeLogin(form.login),
      password: normalizePassword(form.type, form.password),
    }
  }

  function saveField(field: FieldKey): void {
    const strategy = fieldStrategies[field]
    if (!strategy) return
    const result: FieldStrategyResult = strategy(form)
    let hasStrategyError = false
    if ('error' in result) {
      fieldErrors[field] = result.error
      hasStrategyError = true
    } else {
      fieldErrors[field] = null
    }

    const isRequiredOk = validateRequiredAll()

    if (!hasStrategyError && isRequiredOk) {
      const current = store.items[accountId] as Account | undefined
      const next = makeSnapshot()
      const patch = diffAccount(current, next)
      if (Object.keys(patch).length > 0) {
        store.update(accountId, patch)
      }
      if ('patch' in result && result.cb) result.cb(form)
    }
  }

  return {
    form,
    isLocal,
    saveField,
    fieldErrors,
  }
}
