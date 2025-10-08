import { useAccountsStore } from '@/entities/account/model/store'
import type { Account } from '@/entities/account/model/types'

let seq = 0
function generateId() { return `acc_${Date.now()}_${seq++}` }

export function useAddAccount() {
  const store = useAccountsStore()
  function addEmpty() {
    const id = generateId()
    const account: Account = {
      labels: [],
      type: 'local',
      login: '',
      password: '',
    }
    store.add(id, account)
    return id
  }
  return { addEmpty }
}
