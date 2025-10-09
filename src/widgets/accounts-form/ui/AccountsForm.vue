<template>
  <v-alert density="compact" type="info" variant="tonal" class="mb-3 py-2" :border="false">
    <div class="d-flex align-center" style="gap: 8px">
      <span>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель;
      </span>
    </div>
  </v-alert>
  <v-row class="mb-1 text-caption font-weight-medium" no-gutters>
    <v-col cols="3">Метки</v-col>
    <v-col cols="2">Тип записи</v-col>
    <v-col cols="3">Логин</v-col>
    <v-col cols="3">Пароль</v-col>
    <v-col cols="1" class="text-right">&nbsp;</v-col>
  </v-row>
  <AccountFields v-for="[id, account] in getEntries" :key="id" :account="account" :id="id" />
</template>

<script setup lang="ts">
import AccountFields from '@/features/edit-account/ui/AccountFields.vue'
import { useAccountsStore } from '@/entities/account/model/store'
import { storeToRefs } from 'pinia'

const store = useAccountsStore()
const { getEntries } = storeToRefs(store)
</script>
