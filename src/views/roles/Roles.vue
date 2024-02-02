<script setup lang="ts">
  import { useRolesStore } from '@/stores/roles';

  const rolesStore = useRolesStore();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="role in rolesStore.list" :key="role.id">
        <td>{{ role.id }}</td>
        <td>{{ role.name }}</td>
        <td>{{ role.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
