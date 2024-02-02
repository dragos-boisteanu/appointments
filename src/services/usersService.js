import { useUsersStore } from '@/stores/users.js';
import { useRolesStore } from '@/stores/roles.js';
import { useUserStatusesStore } from '@/stores/userStatuses.js';
import uniqueId from 'lodash/uniqueId.js';
import ViewUser from '@/models/user/viewUser.js';
import { toRaw } from 'vue';
export default class UsersService {
  #usersStore;
  constructor() {
    this.#usersStore = useUsersStore();
  }
  /**
   *
   * @param {UsersFilter} filterData
   * @returns {User[]}
   */
  getUsers(filterData) {
    try {
      let limit = 10;
      let offset = 0;
      let users = this.#usersStore.list;

      if (filterData.page > 1) {
        offset = limit * (filterData.page - 1);
        limit += offset;
      }

      if (filterData.phoneNumber.replace(/\s/g, '')) {
        users = users.filter((user) => {
          const noSpacesNumber = filterData.phoneNumber.replace(
            /\s/g,
            '',
          );

          return user.details.phoneNumber
            .replace(/\s/g, '')
            .includes(noSpacesNumber);
        });
      }

      if (filterData.email) {
        const lowerCaseEmail = filterData.email.toLowerCase();
        users = users.filter((user) =>
          user.email.toLowerCase().includes(lowerCaseEmail),
        );
      }

      if (filterData.name) {
        const lowerCaseName = filterData.name.toLowerCase();
        users = users.filter(
          (user) =>
            user.details.lastName
              .toLowerCase()
              .includes(lowerCaseName) ||
            user.details.firstName
              .toLowerCase()
              .includes(lowerCaseName),
        );
      }
      if (filterData.roleId) {
        users = users.filter(
          (user) => filterData.roleId === user.role.id,
        );
      }

      this.#usersStore.setTotalPages(Math.ceil(users.length / 25));

      return users.slice(offset, limit);
    } catch (error) {
      console.error('getUsers error', error);
      throw error;
    }
  }

  /**
   *
   * @param {User} user
   * @returns {Promise<ViewUser>}
   */
  addUser = async (user) => {
    const userId = (Number.parseInt(uniqueId()) + 1).toString();

    try {
      const rolesStore = useRolesStore();
      const userStatusesStore = useUserStatusesStore();

      const role = rolesStore.list.find(
        (role) => role.id === user.roleId,
      );
      const status = userStatusesStore.list.find(
        (status) => status.id === user.statusId,
      );

      const viewUser = new ViewUser(
        userId,
        user.email,
        user.details,
        toRaw(status),
        toRaw(role),
        user.createdAt,
        user.updatedAt,
      );

      console.log('viewUser', viewUser);
      this.#usersStore.addUser(viewUser);
      return viewUser;
    } catch (error) {
      console.error('addUserError', error.message);
      throw error;
    }
  };

  /**
   *
   * @param {string} userId
   * @return {ViewUser[]}
   */
  deleteUser = (userId) => {
    return this.#usersStore.removeUser(userId);
  };

  /**
   *
   * @param user
   * @return {ViewUser[]}
   */
  updateUser = (user) => {
    this.#usersStore.updateUser(user);
  };
}
