import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRolesStore = defineStore('roles', () => {
  const list = ref([]);

  /**
   *
   * @param {Array.Role} roles
   */
  const set = (roles) => {
    list.value = roles;
  };

  /**
   *
   * @param {Role} role
   */
  const add = (role) => {
    list.value.push(role);
  };

  return {
    list,
    set,
    add,
  };
});
