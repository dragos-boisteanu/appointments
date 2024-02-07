import { useAppointmentsStore } from '@/stores/appointments.js';

export default class AppointmentsService {
  #appointmentsStore;

  constructor() {
    this.#appointmentsStore = useAppointmentsStore();
  }

  getList() {
    return this.#appointmentsStore.list;
  }

  /**
   *
   * @param {Appointment} appointment
   */
  edit(appointment) {
    return this.#appointmentsStore.update(appointment);
  }
  /**
   *
   * @param {number} id
   */
  delete(id) {
    this.#appointmentsStore.remove(id);
  }
}
