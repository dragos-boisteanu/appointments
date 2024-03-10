<script setup>
  import CustomDialog from '@/components/dialogs/customDialog.vue';
  import { ref, toRaw } from 'vue';
  import { useRolesStore } from '@/stores/roles.js';
  import ButtonComponent from '@/components/buttonComponent.vue';

  const rolesStore = useRolesStore();

  const emit = defineEmits(['filter', 'close']);
  const props = defineProps({
    filterData: { type: Object, required: true },
  });

  const localFilter = ref(null);
  localFilter.value = Object.assign({}, props.filterData);
  const selectRoleId = (roleId) =>
    (localFilter.value.roleId = roleId);

  const close = () => emit('close');
  const filter = () => emit('filter', toRaw(localFilter.value));
</script>

<template>
  <custom-dialog @close="close()" width="600px">
    <template #header> Filter </template>
    <template #content>
      <form class="w-full">
        <div
          class="flex flex-wrap items-center gap-x-2 md:flex-nowrap"
        >
          <div class="flex-1 basis-full">
            <textInput
              id="phoneNumber"
              v-model.trim="localFilter.phoneNumber"
              name="phoneNumber"
              label="Phone number"
            />
          </div>
          <div class="flex-1 basis-full">
            <textInput
              id="email"
              v-model.trim="localFilter.email"
              name="email"
              label="Email"
            />
          </div>
        </div>
        <div
          class="flex flex-wrap items-center gap-x-2 md:flex-nowrap"
        >
          <div class="flex-1 basis-full">
            <textInput
              id="name"
              class="flex-1"
              v-model.trim="localFilter.name"
              name="name"
              label="Name"
            />
          </div>
          <div class="flex-1 basis-full">
            <dropdown-component
              id="role"
              v-model="localFilter.roleId"
              key-field="id"
              :values="rolesStore.list"
              :multi-select="false"
              name="role"
              name-field="name"
              label="Role"
              value-field="id"
              @select="selectRoleId"
            />
          </div>
        </div>
      </form>
    </template>
    <template #actions>
      <button-component @click="close">Cancel</button-component>
      <button-component @click="filter">Filter</button-component>
    </template>
    <custom-dialog />
  </custom-dialog>
</template>

<style scoped></style>
