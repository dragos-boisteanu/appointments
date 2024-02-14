<script setup>
  import CustomDialog from '../../dialogs/customDialog.vue';
  import DropdownComponent from '../../dropdownComponent.vue';
  import { useRolesStore } from '@/stores/roles.js';
  import { ref, toRaw, watch } from 'vue';
  import ConfirmDialog from '../../dialogs/confirmDialog.vue';

  const rolesStore = useRolesStore();

  const props = defineProps({
    user: { type: Object, required: true },
    isLoading: { type: Boolean, required: false, default: false },
  });
  const emit = defineEmits(['close', 'save', 'delete']);

  const user = ref(JSON.parse(JSON.stringify(props.user)));
  watch(
    () => user.value.role.id,
    (newValue, oldValue) => {
      if (!newValue) {
        return;
      }

      if (newValue !== oldValue) {
        const role = rolesStore.list.find(
          (role) => role.id === newValue,
        );

        user.value.role.name = role.name;
      }
    },
  );
  const save = () => {
    emit('save', toRaw(user.value));
  };

  const close = () => {
    if (!props.isLoading) {
      emit('close');
    }
  };

  const showDeleteConfirmationDialog = ref(false);
  const confirmationDialogTitle = ref('');
  const confirmationDialogText = ref('');
  const deleteUser = () => {
    confirmationDialogText.value = `Are you sure you want to delete user ${user.value.details.firstName} ${user.value.details.lastName}'s account ?`;
    confirmationDialogTitle.value = 'Delete user account';
    showDeleteConfirmationDialog.value = true;
  };
  const confirmDeleteUser = () => emit('delete', user.value.id);

  const selectRole = (roleId) => {
    if (roleId) {
      user.value.role = rolesStore.list.find(
        (role) => role.id === roleId,
      );
    } else {
      user.value.role = {
        id: '',
        name: '',
        color: '',
      };
    }
  };
</script>

<template>
  <custom-dialog @close="close()">
    <template #dialog>
      <confirm-dialog
        v-if="showDeleteConfirmationDialog"
        :title="confirmationDialogTitle"
        :text="confirmationDialogText"
        @close="showDeleteConfirmationDialog = false"
        @confirm="confirmDeleteUser"
      />
    </template>
    <template #header> Create new user </template>
    <template #content>
      <form class="flex flex-col gap-y-4">
        <div class="flex items-center justify-between gap-x-8">
          <textInput
            id="firstName"
            v-model="user.details.firstName"
            :autofocus="true"
            name="firstName"
            label="First name"
          />
          <textInput
            id="lastName"
            v-model="user.details.lastName"
            name="lastName"
            label="Last name"
          />
        </div>
        <div class="flex items-center justify-between gap-x-8">
          <textInput
            id="phoneNumber"
            v-model="user.details.phoneNumber"
            name="phoneNumber"
            label="Phone Number"
          />
          <textInput
            id="email"
            v-model="user.email"
            name="email"
            label="Email"
          />
        </div>

        <div class="flex items-center justify-between gap-x-8">
          <!--          TODO: fix date not being visible-->
          <datepickerInput
            id="birthDate"
            v-model="user.details.birthDate"
            name="birthDate"
            label="Birthday"
            mode="date"
            :enable-time-picker="false"
          ></datepickerInput>

          <dropdownComponent
            id="role"
            v-model="user.role.id"
            :values="rolesStore.list"
            name-field="name"
            key-field="id"
            value-field="id"
            label="Role"
            name="role"
            :multi-select="false"
            @select="selectRole"
          />
        </div>

        <textareaInput
          id="description"
          v-model="user.details.description"
          name="description"
          label="Description"
          placeholder="Extra info about the user"
        />
      </form>
    </template>
    <template #actions>
      <buttonComponent :text="true" type="plain" @click="close()"
        >Cancel</buttonComponent
      >

      <buttonComponent
        :text="true"
        type="danger"
        @click="deleteUser()"
        >Delete</buttonComponent
      >
      <buttonComponent :loading="props.isLoading" @click="save()"
        >Save</buttonComponent
      >
    </template>
  </custom-dialog>
</template>

<style scoped></style>
