import type { AccountType, Label, Account } from '../model/types'
import {
  MAX_LABEL_LEN,
  MAX_LOGIN_LEN,
  MAX_PASSWORD_LEN,
} from '@/shared/lib/validation/accountValidation'

export function parseLabels(src: string): Label[] {
  const uniqueLabelTexts = new Set<string>()
  const out: Label[] = []
  for (const raw of src.split(';')) {
    const text = raw.trim()
    if (!text) continue
    if (text.length > MAX_LABEL_LEN) continue
    if (uniqueLabelTexts.has(text)) continue
    uniqueLabelTexts.add(text)
    out.push({ text })
  }
  return out
}

export function normalizeLogin(login: string): string {
  return login.trim()
}

export function normalizePassword(
  type: AccountType,
  pwd: string | null | undefined,
): string | null {
  if (type === 'ldap') return null
  return (pwd ?? '').trim()
}

export type FieldKey = 'labelString' | 'type' | 'login' | 'password'

export interface EditLikeForm {
  labelString: string
  type: AccountType
  login: string
  password: string | null
}

export interface FieldStrategyResultOk {
  patch?: Partial<Account>
  cb?: (form: EditLikeForm) => void
}
export interface FieldStrategyResultErr {
  error: string
}
export type FieldStrategyResult = FieldStrategyResultOk | FieldStrategyResultErr

type FieldStrategy = (form: EditLikeForm) => FieldStrategyResult

export const fieldStrategies: Record<FieldKey, FieldStrategy> = {
  labelString(form) {
    return { patch: { labels: parseLabels(form.labelString) } }
  },
  type(form) {
    const password = normalizePassword(form.type, form.password)
    return {
      patch: { type: form.type, password },
      cb: (f) => {
        if (f.type === 'ldap') {
          f.password = null
        } else if (f.type === 'local' && f.password == null) {
          f.password = ''
        }
      },
    }
  },
  login(form) {
    const login = normalizeLogin(form.login)
    if (!login) return { error: 'Обязательное поле' }
    if (login.length > MAX_LOGIN_LEN) return { error: `Превышена длина > ${MAX_LOGIN_LEN}` }
    return { patch: { login } }
  },
  password(form) {
    if (form.type === 'ldap') {
      return { patch: undefined }
    }
    const password = normalizePassword(form.type, form.password)
    if (!password) return { error: 'Обязательное поле' }
    if (password.length > MAX_PASSWORD_LEN)
      return { error: `Превышена длина > ${MAX_PASSWORD_LEN}` }
    return { patch: { password } }
  },
}
