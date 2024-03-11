<script setup>
  import { computed, inject, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import ViewUserDialog from '../../components/users/dialogs/editUserDialog.vue';
  import { useToast } from 'vue-toastification';
  import ViewUser from '@/models/user/viewUser.js';

  const usersService = inject('usersService');

  const toast = useToast();
  const route = useRoute();
  const router = useRouter();

  const dayjs = inject('dayJS');

  // const user = computed(() => {
  let user = computed(() =>
    usersService.getById(route.params.id.toString()),
  ); /*
  try {
    user.value = usersService.getById(route.params.id.toString());
  } catch (error) {
    // console.error('userViewUser', error);
    toast.error('User not found');
  }*/
  // return user;
  // });

  const userName = computed(() => {
    let userName;

    if (user.value) {
      userName = `${user.value.firstName} ${user.value.lastName}`;
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
      userDetails.phoneNumber = user.value.phoneNumber;
      userDetails.birthDate = dayjs(user.value.birthDate)
        .format('DD/MM/YYYY')
        .toString();
    }

    return userDetails;
  });

  const updateSelectedUser = (payload) => {
    console.log('updateSelectedUser', payload);
    usersService.update(
      new ViewUser(
        payload.id,
        payload.email,
        payload.firstName,
        payload.lastName,
        payload.phoneNumber,
        payload.birthDate,
        payload.description,
        payload.statusId,
        payload.statusName,
        payload.roleId,
        payload.roleName,
        payload.roleColor,
        payload.createdAt,
        payload.updatedAt,
      ),
    );
    toggleEditUser();
    toast.success('User updated');
  };
  const handleDelete = (userId) => {
    usersService.delete(userId);

    toggleEditUser();

    toast.success('User deleted');

    router.push({ name: 'users' });
  };

  const showEditUser = ref(false);
  const toggleEditUser = () => {
    showEditUser.value = !showEditUser.value;
  };
</script>

<template>
  <div class="size-full p-4">
    <view-user-dialog
      v-if="showEditUser"
      :ignore-click-outside="true"
      :user="user"
      @close="toggleEditUser"
      @save="updateSelectedUser"
      @delete="handleDelete"
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
          :class="[user.roleColor]"
        >
          {{ user.roleName }}
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
        <div class="min-w-32 text-neutral-500">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
