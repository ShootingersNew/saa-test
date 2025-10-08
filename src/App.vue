<script setup lang="ts">
import AccountsForm from '@/widgets/accounts-form/ui/AccountsForm.vue'
import AddButton from '@/features/add-account/ui/AddButton.vue'
</script>

<template>
  <v-app>
    <v-main class="pa-4">
      <div class="d-flex align-center mb-4" style="gap: 12px">
        <h2 class="text-h6 mb-0">Учетные записи</h2>
        <AddButton />
      </div>
      <AccountsForm />
    </v-main>
  </v-app>
</template>

<style scoped></style>
