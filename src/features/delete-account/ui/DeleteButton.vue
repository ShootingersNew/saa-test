<script setup lang="ts">
import { useDeleteAccount } from '../model/useDeleteAccount'

const props = defineProps<{ id: string }>()
const { deleteById } = useDeleteAccount()
</script>

<template>
  <v-btn
    @click="deleteById(props.id)"
    icon="mdi-delete"
    size="small"
    variant="text"
    color="error"
  />
</template>
