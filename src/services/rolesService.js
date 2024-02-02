import { useRolesStore } from '@/stores/roles.js';
import uniqueId from 'lodash/uniqueId.js';
import Role from '@/models/role.js';

export default class RolesService {
  #rolesStore;

  constructor() {
    this.#rolesStore = useRolesStore();
  }

  /**
   *
   * @returns {Role[]}
   */
  getRoles = () => {
    return this.#rolesStore.list;
  };

  /**
   *
   * @param name
   * @returns {string}
   */
  addRole = (name) => {
    let id = uniqueId();
    const role = new Role(id, name);

    this.#rolesStore.add(role);

    return id;
  };
}
