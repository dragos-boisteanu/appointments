import { useRolesStore } from '@/stores/roles.js';
import { useUserStatusesStore } from '@/stores/userStatuses.js';
import uniqueId from 'lodash/uniqueId.js';
import ViewUser from '@/models/user/viewUser.js';
export default class UsersService {
  #usersRepository;

  constructor(usersRepository) {
    this.#usersRepository = usersRepository;
  }

  getList = () => this.#usersRepository.getList();
  set = (users) => this.#usersRepository.set(users);
  /**
   *
   * @param {UsersFilter} filterData
   * @returns {User[]}
   */
  getFilteredList = (filterData) => {
    try {
      let limit = 10;
      let offset = 0;
      let users = this.#usersRepository.getList();

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

          return user.phoneNumber
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
            user.lastName.toLowerCase().includes(lowerCaseName) ||
            user.firstName.toLowerCase().includes(lowerCaseName),
        );
      }
      if (filterData.roleId) {
        users = users.filter(
          (user) => filterData.roleId === user.roleId,
        );
      }

      this.#usersRepository.setTotalPages(
        Math.ceil(users.length / 25),
      );

      return users.slice(offset, limit);
    } catch (error) {
      console.error('getUsers error', error);
      throw error;
    }
  };

  /**
   *
   * @param {string} userId
   * @returns {ViewUser}
   */
  getById = (userId) => this.#usersRepository.getById(userId);
  /**
   *
   * @param {User} user
   * @returns {Promise<ViewUser>}
   */
  add = async (user) => {
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
        user.details.firstName,
        user.details.lastName,
        user.details.phoneNumber,
        user.details.birthDate,
        user.details.description,
        status.id,
        status.name,
        role.id,
        role.name,
        user.createdAt,
        user.updatedAt,
      );

      this.#usersRepository.add(viewUser);
      return viewUser;
    } catch (error) {
      console.error('addError', error.message);
      throw error;
    }
  };

  /**
   *
   * @param {string} userId
   * @return {ViewUser[]}
   */
  delete = (userId) => {
    return this.#usersRepository.removeUser(userId);
  };

  /**
   *
   * @param user
   * @return {ViewUser[]}
   */
  update = (user) => {
    this.#usersRepository.update(user);
  };

  /**
   *
   * @returns {number}
   */
  getTotalPages = () => this.#usersRepository.getTotalPages();

  /**
   *
   * @param {number} pages
   * @returns {void|*}
   */
  setTotalPages = (pages) =>
    this.#usersRepository.setTotalPages(pages);
}
