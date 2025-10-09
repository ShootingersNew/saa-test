<script setup lang="ts">
import { useAddAccount } from '../model/useAddAccount'
const { addEmpty } = useAddAccount()
function onClick() {
  addEmpty()
}
</script>
<template>
  <v-btn color="primary" size="small" @click="onClick" prepend-icon="mdi-plus"></v-btn>
</template>
