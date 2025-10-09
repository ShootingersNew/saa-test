import type { AccountType } from '@/entities/account/model/types';

export const MAX_LABEL_LEN = 50;
export const MAX_LOGIN_LEN = 100;
export const MAX_PASSWORD_LEN = 100;

export function validateLogin(raw: string): string | null {
  const login = raw.trim();
  if (!login) return 'Обязательное поле';
  if (login.length > MAX_LOGIN_LEN) return `Превышена длина > ${MAX_LOGIN_LEN}`;
  return null;
}

export function validatePassword(type: AccountType, raw: string | null | undefined): string | null {
  if (type === 'ldap') return null;
  const password = (raw ?? '').trim();
  if (!password) return 'Обязательное поле';
  if (password.length > MAX_PASSWORD_LEN) return `Превышена длина > ${MAX_PASSWORD_LEN}`;
  return null;
}


export function validateRequiredAll(type: AccountType, login: string, password: string | null | undefined) {
  const loginErr = validateLogin(login);
  const passwordErr = validatePassword(type, password);
  return { loginErr, passwordErr, ok: !loginErr && !passwordErr };
}
