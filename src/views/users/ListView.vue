<script setup>
  import { inject, reactive, ref, watch } from 'vue';
  import ButtonComponent from '../../components/buttonComponent.vue';
  import createUserDialog from '../../components/users/dialogs/createUserDialog.vue';

  import { useRolesStore } from '@/stores/roles';
  import { useToast } from 'vue-toastification';

  import PaginationComponent from '../../components/paginationComponent.vue';
  import { useRoute, useRouter } from 'vue-router';

  const rolesStore = useRolesStore();

  const router = useRouter();
  const route = useRoute();

  const toast = useToast();

  const usersService = inject('usersService');

  const filterData = reactive({
    name: '',
    phoneNumber: '',
    email: '',
    statusId: '',
    roleId: '',
    page: 1,
  });

  Object.keys(route.query).forEach((key) => {
    if (filterData[key]) {
      filterData[key] = route.query[key];
    }
  });

  const usersList = ref([]);
  const showNewUserDialog = ref(false);

  const currentPage = ref(1);

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

  const handlePageSelected = async (page) => {
    currentPage.value = page;
    await getList({
      name: filterData.name,
      phoneNumber: filterData.phoneNumber,
      email: filterData.email,
      statusId: '',
      roleId: filterData.roleId,
      page,
    });
  };

  const selectRoleId = (roleId) => (filterData.roleId = roleId);

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

  const openUserDetails = (user) => {
    router.push({ name: 'user', params: { id: user.id } });
  };

  const isSavingUserLoading = ref(false);
  const toggleNewUserDialog = () => {
    showNewUserDialog.value = !showNewUserDialog.value;
  };
  const handleCreateUser = async (user) => {
    try {
      await usersService.add(user);

      await getList(filterData);

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

    <div class="hidden items-center justify-between gap-x-4 md:flex">
      <form class="flex w-full gap-x-4 gap-y-2 2xl:w-1/2 3xl:w-1/3">
        <textInput
          id="name"
          v-model.trim="filterData.name"
          name="name"
          label="Name"
        />
        <textInput
          id="phoneNumber"
          v-model.trim="filterData.phoneNumber"
          name="phoneNumber"
          label="Phone number"
        />
        <textInput
          id="email"
          v-model.trim="filterData.email"
          name="email"
          label="Email"
        />
        <dropdown-component
          id="role"
          v-model="filterData.roleId"
          key-field="id"
          :values="rolesStore.list"
          :multi-select="false"
          name="role"
          name-field="name"
          label="Role"
          value-field="id"
          @select="selectRoleId"
        />
      </form>

      <button-component
        class="flex-shrink-0 flex-grow-0"
        @click="toggleNewUserDialog"
      >
        <UserPlusIcon class="size-5 text-white" />
      </button-component>
    </div>
    <div class="flex flex-1 flex-col">
      <div
        class="mt-4 flex-1 flex-shrink flex-grow basis-0 overflow-auto lg:flex-none"
      >
        <div
          class="block h-full w-full grid-cols-12 content-start items-center justify-items-center lg:grid"
        >
          <div
            class="col-start-1 col-end-13 hidden grid-cols-12 justify-items-center self-stretch justify-self-stretch border-b-2 p-4 align-middle lg:grid"
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
              {{ user.details.firstName }} {{ user.details.lastName }}
            </div>
            <div
              class="col-start-1 col-end-2 flex h-full w-full items-center justify-center lg:col-start-5 lg:col-end-6"
            >
              <div
                class="w-full rounded px-3 py-1 text-center text-sm font-normal capitalize text-white lg:min-w-16 lg:max-w-28"
                :class="user.role.color"
              >
                {{ user.role.name }}
              </div>
            </div>
            <div
              class="col-start-2 col-end-3 flex h-full w-full items-center justify-center lg:col-start-6 lg:col-end-7"
            >
              <div
                class="w-full rounded-lg p-0.5 text-center text-sm font-normal"
              >
                {{ user.status.name }}
              </div>
            </div>
            <div
              class="col-start-1 col-end-3 flex h-full w-full items-end gap-x-2 justify-self-start lg:col-start-7 lg:col-end-9 lg:pl-4"
            >
              <PhoneIcon class="size-5 text-neutral-700" />
              <div>{{ user.details.phoneNumber }}</div>
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
