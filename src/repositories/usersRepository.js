export default class UsersRepository {
  #store;
  constructor(usersStore) {
    this.#store = usersStore;
  }

  getList = () => this.#store.list;

  add = (user) => this.#store.add(user);

  set = (users) => this.#store.set(users);

  update = (user) => this.#store.update(user);

  removeUser = (userId) => this.#store.removeUser(userId);

  getById = (userId) => this.#store.getById(userId);

  setTotalPages = (value) => this.#store.setTotalPages(value);

  getTotalPages = () => this.#store.totalPages;
}
