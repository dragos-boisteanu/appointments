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

  add = (appointment) => {
    const list = this.#appointmentsRepository.getList();
    let id = 1;
    if (list.length) {
      id = list.at(-1);
    }

    appointment.id = id;
    this.#appointmentsRepository.add(appointment);
  };
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
