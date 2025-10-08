<script setup lang="ts">
import type { Account } from '@/entities/account/model/types'
import { useEditAccount } from '../model/useEditAccount'

const props = defineProps<{ id: string; account: Account }>()
const { form, isLocal, saveField } = useEditAccount(props.id, props.account)
</script>

<template>
  <v-row dense class="align-center mb-2" no-gutters>
    <v-col cols="3">
      <v-text-field
        v-model="form.labelString"
        label="Метка"
        density="compact"
        @blur="saveField('labelString')"
        hide-details
      />
    </v-col>
    <v-col cols="2">
      <v-select
        :model-value="form.type"
        :items="[
          { value: 'local', title: 'Локальная' },
          { value: 'ldap', title: 'LDAP' },
        ]"
        label="Тип"
        density="compact"
        @update:model-value="saveField('type')"
        hide-details
      />
    </v-col>
    <v-col cols="3">
      <v-text-field
        v-model="form.login"
        label="Логин"
        density="compact"
        @blur="saveField('login')"
        hide-details
      />
    </v-col>
    <v-col cols="3" v-if="isLocal">
      <v-text-field
        v-model="form.password"
        label="Пароль"
        type="password"
        density="compact"
        @blur="saveField('password')"
        hide-details
      />
    </v-col>
    <v-col cols="1" class="text-right">
      <v-btn icon="mdi-delete" size="small" variant="text" color="error" />
    </v-col>
  </v-row>
</template>

<style scoped></style>
