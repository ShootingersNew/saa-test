<script setup lang="ts">
import type { Account } from '@/entities/account/model/types'
import { useEditAccount } from '../model/useEditAccount'
import {
  MAX_LABEL_LEN,
  MAX_LOGIN_LEN,
  MAX_PASSWORD_LEN,
} from '@/shared/lib/validation/accountValidation'

const props = defineProps<{ id: string; account: Account }>()
const { form, isLocal, saveField, fieldErrors } = useEditAccount(props.id, props.account)
</script>

<template>
  <v-row dense class="align-center mb-2" no-gutters>
    <v-col cols="3">
      <v-text-field
        variant="outlined"
        v-model="form.labelString"
        label="Метка"
        density="compact"
        @blur="saveField('labelString')"
        :error="!!fieldErrors.labelString"
        :maxLength="MAX_LABEL_LEN"
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
        @update:model-value="
          (val) => {
            form.type = val
            saveField('type')
          }
        "
        :error="!!fieldErrors.type"
        hide-details
      />
    </v-col>
    <v-col :cols="isLocal ? 3 : 6">
      <v-text-field
        variant="outlined"
        v-model="form.login"
        :error="!!fieldErrors.login"
        label="Логин *"
        density="compact"
        @blur="saveField('login')"
        hide-details
        :maxlength="MAX_LOGIN_LEN"
      />
    </v-col>
    <v-col cols="3" v-if="isLocal">
      <v-text-field
        variant="outlined"
        v-model="form.password"
        :error="!!fieldErrors.password"
        label="Пароль *"
        type="password"
        density="compact"
        @blur="saveField('password')"
        hide-details
        :maxlength="MAX_PASSWORD_LEN"
      />
    </v-col>
    <v-col cols="1" class="text-right">
      <v-btn
        @click="$emit('delete', props.id)"
        icon="mdi-delete"
        size="small"
        variant="text"
        color="error"
      />
    </v-col>
  </v-row>
</template>

<style scoped></style>
