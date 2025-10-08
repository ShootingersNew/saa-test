<template>
  <AccountFields v-for="[id, account] in getEntries" :key="id" :account="account" :id="id" />
</template>

<script setup lang="ts">
import AccountFields from '@/features/edit-account/ui/AccountFields.vue'
import { useAccountsStore } from '@/entities/account/model/store'
const { getEntries } = useAccountsStore()
</script>
