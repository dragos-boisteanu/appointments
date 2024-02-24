export default class AppointmentsService {
  #appointmentsRepository;

  constructor(appointmentsRepository) {
    this.#appointmentsRepository = appointmentsRepository;
  }

  getList = () => this.#appointmentsRepository.getList();

  getFilteredList() {
    return this.#appointmentsRepository.getList();
  }

  set = (appointments) =>
    this.#appointmentsRepository.set(appointments);
  /**
   *
   * @param {Appointment} appointment
   */
  edit(appointment) {
    return this.#appointmentsRepository.update(appointment);
  }
  /**
   *
   * @param {number} id
   */
  delete(id) {
    this.#appointmentsRepository.remove(id);
  }
}
