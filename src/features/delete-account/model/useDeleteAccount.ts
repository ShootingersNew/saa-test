import { useAccountsStore } from '@/entities/account/model/store'

export function useDeleteAccount() {
  const store = useAccountsStore()
  function deleteById(id: string) {
    store.remove(id)
  }
  return { deleteById }
}
