<template>
  <AccountFields
    @delete="(id: string) => store.remove(id)"
    v-for="[id, account] in getEntries"
    :key="id"
    :account="account"
    :id="id"
  />
</template>

<script setup lang="ts">
import AccountFields from '@/features/edit-account/ui/AccountFields.vue'
import { useAccountsStore } from '@/entities/account/model/store'
import { storeToRefs } from 'pinia'

const store = useAccountsStore()
const { getEntries } = storeToRefs(store)
</script>
