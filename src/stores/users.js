import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUsersStore = defineStore('users', () => {
  const list = ref([]);
  const totalPages = ref(0);

  /**
   *
   * @param {number} value
   */
  const setTotalPages = (value) => {
    totalPages.value = value;
  };

  /**
   *
   * @param  users
   */
  const setUsers = (users) => {
    list.value = users;
  };

  /**
   *
   * @param {ViewUser} user
   */
  const addUser = (user) => {
    console.log('addUser', user);
    list.value.push(user);
  };

  /**
   *
   * @param {ViewUser} payload
   * @returns {ViewUser[]|[]}
   */
  const updateUser = (payload) => {
    let result = [];
    const userIndex = getUserIndexById(payload.id);

    if (userIndex > -1) {
      result = list.value.splice(userIndex, 1, payload);
    }

    return result;
  };

  /**
   *
   * @param  {string } userId
   * @returns {ViewUser[]}
   */
  const removeUser = (userId) => {
    let result = [];
    const userIndex = getUserIndexById(userId);

    if (userIndex > -1) {
      result = list.value.splice(userIndex, 1);
    }

    return result;
  };

  /**
   *
   * @param {string} id
   * @returnss {ViewUser}
   */
  const getUserById = (id) => {
    const user = list.value.find((user) => user.id === id);

    if (!user) {
      throw new Error('No user found');
    }

    return user;
  };

  /**
   *
   * @param {string} userId
   * @returns {number}
   */
  const getUserIndexById = (userId) => {
    return list.value.findIndex((user) => user.id === userId);
  };

  return {
    list,
    setUsers,
    addUser,
    updateUser,
    removeUser,
    totalPages,
    setTotalPages,
    getUserById,
  };
});
