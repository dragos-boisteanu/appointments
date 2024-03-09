<script setup>

import CustomDialog from "@/components/dialogs/customDialog.vue";
import {reactive} from "vue";
import {useRolesStore} from "@/stores/roles.js";

const rolesStore = useRolesStore()

const emit
const filterData = reactive({
  name: '',
  phoneNumber: '',
  email: '',
  statusId: '',
  roleId: '',
  page: 1,
});

const selectRoleId = (roleId) => (filterData.roleId = roleId);



</script>

<template>
  <custom-dialog @close="close()" width="600px">
    <template #header> Filter users </template>
    <template #content>
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
    </template>
    <custom-dialog/>
</template>

<style scoped>

</style>