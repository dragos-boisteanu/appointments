export default class AppointmentsRepository {
  #store;

  constructor(store) {
    this.#store = store;
  }

  getList = () => this.#store.list;
  set = (appointments) => this.#store.set(appointments);
  add = (appointment) => this.#store.add(appointment);
  remove = (appointmentId) => this.#store.remove(appointmentId);
  update = (appointment) => this.#store.update(appointment);
}
