<script setup>
  import { inject, ref, watch } from 'vue';
  import ButtonComponent from '../../components/buttonComponent.vue';
  import createUserDialog from '../../components/users/dialogs/createUserDialog.vue';

  import { useToast } from 'vue-toastification';

  import PaginationComponent from '../../components/paginationComponent.vue';
  import { useRoute, useRouter } from 'vue-router';
  import FilterUsersDialog from '@/components/users/dialogs/filterUsersDialog.vue';

  const router = useRouter();
  const route = useRoute();

  const toast = useToast();

  const usersService = inject('usersService');

  const currentPage = ref(1);
  const usersList = ref([]);

  const getList = async (filter) => {
    const payload = Object.assign({}, filter);
    const query = {};

    Object.keys(payload).forEach((key) => {
      if (payload[key]) {
        query[key] = payload[key];
      }
    });

    usersList.value = await usersService.getFilteredList(payload);

    await router.push({
      name: 'users',
      query: {
        ...query,
      },
    });
  };

  const showFilterDialog = ref(false);
  const filterData = ref({
    name: '',
    phoneNumber: '',
    email: '',
    statusId: '',
    roleId: '',
    page: 1,
  });

  Object.keys(route.query).forEach((key) => {
    if (filterData.value[key]) {
      filterData.value[key] = route.query[key];
    }
  });

  watch(
    filterData,
    async (value) => {
      const filterData = Object.assign({}, value);
      currentPage.value = 1;
      filterData.page = 1;
      await getList(filterData);
    },
    { immediate: true },
  );

  const toggleFilterDialog = () =>
    (showFilterDialog.value = !showFilterDialog.value);
  const handleFilter = (filter) => {
    filterData.value = filter;
    showFilterDialog.value = false;
  };

  const handlePageSelected = async (page) => {
    currentPage.value = page;
    await getList({
      name: filterData.value.name,
      phoneNumber: filterData.value.phoneNumber,
      email: filterData.value.email,
      statusId: '',
      roleId: filterData.value.roleId,
      page,
    });
  };

  // const selectRoleId = (roleId) => (filterData.roleId = roleId);

  const openUserDetails = (user) => {
    router.push({ name: 'user', params: { id: user.id } });
  };

  const isSavingUserLoading = ref(false);

  const showNewUserDialog = ref(false);

  const toggleNewUserDialog = () => {
    showNewUserDialog.value = !showNewUserDialog.value;
  };
  const handleCreateUser = async (user) => {
    try {
      await usersService.add(user);

      await getList(filterData.value);

      toast.success('New user added');
      showNewUserDialog.value = false;
    } catch (error) {
      console.error('saveUserError: ', error);
      toast.error('Failed to save user');
    } finally {
      isSavingUserLoading.value = false;
    }
  };
</script>

<template>
  <div class="relative flex h-full w-full flex-col p-4">
    <createUserDialog
      v-if="showNewUserDialog"
      :is-loading="isSavingUserLoading"
      :ignore-click-outside="true"
      @close="toggleNewUserDialog"
      @create="handleCreateUser"
    />

    <filter-users-dialog
      v-if="showFilterDialog"
      :filter-data="filterData"
      @filter="handleFilter"
      @close="toggleFilterDialog"
    />

    <div class="flex items-center justify-end gap-x-1">
      <button-component :icon="true">
        <BarsArrowDownIcon class="size-6 fill-neutral-700" />
      </button-component>
      <button-component :icon="true" @click="toggleFilterDialog">
        <FunnelIcon class="size-6 fill-neutral-700" />
      </button-component>
    </div>
    <div class="relative flex flex-1 flex-col">
      <button
        @click="toggleNewUserDialog"
        class="fixed bottom-5 right-10 z-10 rounded-full bg-sky-600 p-3 shadow hover:bg-sky-500 active:bg-sky-700 active:shadow-inner"
      >
        <UserPlusIcon class="size-5 fill-white" />
      </button>
      <div
        class="mt-4 flex flex-1 flex-shrink flex-grow basis-0 flex-col"
      >
        <div
          class="block h-full w-full flex-1 basis-0 grid-cols-12 content-start items-center justify-items-center overflow-y-auto lg:grid"
        >
          <div
            class="font- sticky top-0 col-start-1 col-end-13 hidden grid-cols-12 justify-items-center self-stretch justify-self-stretch border-b-2 bg-gray-50 p-4 align-middle lg:grid"
          >
            <div
              class="col-start-1 col-end-2 flex h-full w-full items-center pl-4 font-medium"
            >
              #
            </div>
            <div
              class="col-start-2 col-end-5 flex h-full w-full items-center font-medium"
            >
              Name
            </div>
            <div
              class="col-start-5 col-end-6 flex h-full w-full items-center justify-center justify-self-center text-center font-medium"
            >
              Role
            </div>
            <div
              class="col-start-6 col-end-7 flex h-full w-full items-center justify-center justify-self-center text-center font-medium"
            >
              Status
            </div>
            <div
              class="col-start-7 col-end-9 flex h-full w-full items-center justify-self-start pl-4 font-medium"
            >
              Phone Number
            </div>
            <div
              class="col-start-9 col-end-13 flex h-full w-full items-center justify-self-start pl-4 font-medium"
            >
              Email
            </div>
          </div>

          <div
            v-for="(user, index) in usersList"
            :key="user.id"
            class="col-start-1 col-end-13 mt-2 grid h-fit grid-cols-2 grid-rows-[24px_24px_24px_24px] justify-items-center gap-4 justify-self-stretch rounded-lg border-b bg-white p-4 align-middle shadow hover:cursor-pointer hover:shadow-lg lg:mt-0 lg:h-full lg:grid-cols-12 lg:grid-rows-1 lg:rounded-none lg:shadow-none lg:last:border-b-0 lg:even:bg-gray-100 lg:even:font-medium lg:hover:!bg-gray-200 lg:hover:shadow-none"
            @click="openUserDetails(user)"
          >
            <div
              class="col-start-1 col-end-2 hidden h-full w-full items-center justify-self-center pl-4 lg:flex"
            >
              {{ index + 1 }}
            </div>
            <div
              class="col-start-1 col-end-3 flex h-full w-full items-center justify-self-start overflow-hidden overflow-ellipsis whitespace-nowrap font-medium lg:col-start-2 lg:col-end-5 lg:font-normal"
            >
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div
              class="col-start-1 col-end-2 flex h-full w-full items-center justify-center lg:col-start-5 lg:col-end-6"
            >
              <div
                class="w-full rounded px-3 py-1 text-center text-sm font-normal capitalize text-white lg:min-w-16 lg:max-w-28"
                :class="user.roleColor"
              >
                {{ user.roleName }}
              </div>
            </div>
            <div
              class="col-start-2 col-end-3 flex h-full w-full items-center justify-center lg:col-start-6 lg:col-end-7"
            >
              <div
                class="w-full rounded-lg p-0.5 text-center text-sm font-normal"
              >
                {{ user.statusName }}
              </div>
            </div>
            <div
              class="col-start-1 col-end-3 flex h-full w-full items-end gap-x-2 justify-self-start lg:col-start-7 lg:col-end-9 lg:pl-4"
            >
              <PhoneIcon class="size-5 text-neutral-700" />
              <div>{{ user.phoneNumber }}</div>
            </div>
            <div
              class="col-start-1 col-end-3 flex h-full w-full items-end gap-x-2 justify-self-start lg:col-start-9 lg:col-end-13 lg:pl-4"
            >
              <EnvelopeIcon class="size-5 text-neutral-700" />
              <div>{{ user.email }}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="flex: 0 1 auto" class="pt-2">
        <pagination-component
          :total-pages="usersService.getTotalPages()"
          :current-page="currentPage"
          @select="handlePageSelected"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
