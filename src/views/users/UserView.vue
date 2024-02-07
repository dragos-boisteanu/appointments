<script setup>
  import { computed, inject, ref, toRaw } from 'vue';
  import { useUsersStore } from '@/stores/users.js';
  import { useRoute, useRouter } from 'vue-router';
  import ViewUserDialog from '../../components/users/dialogs/editUserDialog.vue';
  import { useToast } from 'vue-toastification';

  const usersService = inject('usersService');

  const toast = useToast();
  const usersStore = useUsersStore();
  const route = useRoute();
  const router = useRouter();

  const user = computed(() => {
    let user;
    try {
      user = usersStore.getUserById(route.params.id.toString());
    } catch (error) {
      console.error('userViewUser', error);
    }
    return user;
  });

  const userName = computed(() => {
    let userName;

    if (user.value) {
      userName = `${user.value.details.firstName} ${user.value.details.lastName}`;
    } else {
      userName = 'User not found';
    }

    return userName;
  });

  const userDetails = computed(() => {
    let userDetails = {
      email: 'Not specified',
      phoneNumber: 'Not specified',
      birthDate: 'Not specified',
    };

    if (user.value) {
      userDetails.email = user.value.email;
      userDetails.phoneNumber = user.value.details.phoneNumber;
      userDetails.birthDate = user.value.details.birthDate;
    }

    return userDetails;
  });

  const updateSelectedUser = (payload) => {
    usersService.updateUser(payload);
    toggleEditUser();
    toast.success('User updated');
  };
  const handleDeleteUser = (userId) => {
    usersService.deleteUser(userId);
    toast.success('User deleted');

    router.push({ name: 'users' });
  };

  const showEditUser = ref(false);
  const toggleEditUser = () => {
    showEditUser.value = !showEditUser.value;
  };
</script>

<template>
  <div class="h-full w-full">
    <view-user-dialog
      v-if="showEditUser"
      :ignore-click-outside="true"
      :user="user"
      @close="toggleEditUser"
      @save="updateSelectedUser"
      @delete="handleDeleteUser"
    />

    <div class="flex items-center gap-x-4">
      <div class="rounded-full shadow">
        <UserIcon
          class="h-16 w-16 rounded-full bg-fuchsia-900 p-3 text-white"
        />
      </div>
      <div class="text-left">
        <div
          class="flex items-baseline gap-x-4 text-3xl font-semibold"
        >
          <div>
            {{ userName }}
          </div>

          <button
            v-if="user"
            class="flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-100"
            @click="toggleEditUser"
          >
            <PencilIcon class="h-6 w-6 rounded-full text-gray-400" />
          </button>
        </div>
        <div
          v-if="user"
          class="mt-2 w-fit rounded px-3 py-1 text-sm capitalize text-white shadow"
          :class="[user.role.color]"
        >
          {{ user.role.name }}
        </div>
      </div>
    </div>

    <div
      class="mt-10 flex min-w-32 max-w-60 items-center justify-between gap-x-8"
    >
      <div
        v-for="(item, key, index) in userDetails"
        :key="index"
        class="text-left"
      >
        <div class="font-semibold capitalize">
          {{ key }}
        </div>
        <div class="text-neutral-500">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
