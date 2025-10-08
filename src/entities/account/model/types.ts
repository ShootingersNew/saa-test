export type AccountType = 'local' | 'ldap';

export interface Label {
  text: string;
}

export interface Account {
  labels: Label[];
  type: AccountType;
  login: string;
  password: string | null;
}

export type CreateAccountDto = Account
export type UpdateAccountDto = Partial<Account>;
