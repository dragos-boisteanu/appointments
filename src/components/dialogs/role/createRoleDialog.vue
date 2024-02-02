<template>
  <customDialog @close="close()">
    <template #header>Create new role</template>
    <template #content>
      <form class="flex flex-col gap-y-4">
        <textInput
          :autofocus="true"
          id="name"
          name="name"
          label="Name"
          v-model="role.name"
        />

        <textareaInput
          id="description"
          name="description"
          label="Description"
          placeholder="Extra info about the role"
          v-model="role.description"
        />
      </form>
    </template>
    <template #actions>
      <buttonComponent
        :disabled="isLoading"
        @click="close()"
        :text="true"
        type="danger"
        >Cancel</buttonComponent
      >
      <buttonComponent :loading="isLoading" @click="saveRole()"
        >Add</buttonComponent
      >
    </template>
  </customDialog>
</template>

<script setup>
  import { reactive, ref, toRaw } from 'vue';
  import { useToast } from 'vue-toastification';
  import { addRole } from '../../../services/rolesService';
  import { useRolesStore } from '@/stores/roles.js';

  const toast = useToast();

  const emit = defineEmits(['close']);

  const rolesStore = useRolesStore();

  const role = reactive({
    id: '',
    name: '',
    description: '',
  });

  const isLoading = ref(false);

  const saveRole = async () => {
    try {
      isLoading.value = true;
      const roleId = await addRole(toRaw(role));
      role.id = roleId.toString();

      rolesStore.add(role);

      toast.success('New role creeated successfully');

      emit('close');
    } catch (error) {
      console.error('saveRole error: ', error);
      toast.error('Failed to creeate new role');
    } finally {
      isLoading.value = false;
    }
  };

  const close = () => emit('close');
</script>
