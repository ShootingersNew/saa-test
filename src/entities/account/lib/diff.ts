import type { Account } from '@/entities/account/model/types'

export function diffAccount(current: Account | undefined, next: Account): Partial<Account> {
  const patch: Partial<Account> = {}
  if (!current || current.login !== next.login) patch.login = next.login
  if (!current || current.type !== next.type) patch.type = next.type
  if (!current || current.password !== next.password) patch.password = next.password
  const labelsChanged =
    !current ||
    current.labels.length !== next.labels.length ||
    current.labels.some((l, i) => l.text !== next.labels[i]?.text)
  if (labelsChanged) patch.labels = next.labels
  return patch
}
