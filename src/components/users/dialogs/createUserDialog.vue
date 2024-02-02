<script setup>
  import { reactive, toRaw } from 'vue';
  import { useRolesStore } from '@/stores/roles.js';
  import DropdownComponent from '@/components/dropdownComponent.vue';
  import CustomDialog from '../../dialogs/customDialog.vue';

  const rolesStore = useRolesStore();

  const props = defineProps({
    isLoading: { type: Boolean, required: false, default: false },
  });
  const emit = defineEmits(['close', 'create']);

  const close = () => {
    if (!props.isLoading) {
      emit('close');
    }
  };

  const user = reactive({
    id: '',
    email: '',
    details: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      birthDate: '',
      description: '',
    },
    statusId: '1',
    roleId: '',
    createdAt: '',
    updatedAt: '',
  });

  const saveUser = () => {
    // TODO: add validations
    emit('create', toRaw(user));
  };

  const setRoleId = (roleId) => {
    user.roleId = roleId;
  };
</script>

<template>
  <custom-dialog @close="close()">
    <template #header> Create new user </template>
    <template #content>
      <form class="flex flex-col gap-y-4">
        <div class="flex justify-between gap-x-8 align-middle">
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
        <div class="flex justify-between gap-x-8 align-middle">
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

        <div class="flex justify-between gap-x-8 align-middle">
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
            v-model="user.roleId"
            :values="rolesStore.list"
            name-field="name"
            key-field="id"
            value-field="id"
            label="Role"
            name="role"
            :multi-select="false"
            @select="setRoleId"
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
      <buttonComponent :loading="props.isLoading" @click="saveUser()"
        >Add</buttonComponent
      >
    </template>
  </custom-dialog>
</template>
