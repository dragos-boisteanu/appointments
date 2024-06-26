export default class Appointment {
  id = '';
  clientId = '';
  assignedTo = '';
  title = '';
  description = '';
  date = '';
  endDate = '';
  allDay = false;
  color = '';
  duration = '';
  createdBy = '';
  updatedBy = '';
  createdAt = '';
  updatedAt = '';

  /**
   *
   * @param {string} id
   * @param {string} clientId
   * @param {string} assignedTo
   * @param {string} title
   * @param {string?} description
   * @param {string} date
   * @param {string} endDate
   * @param {Boolean} allDay
   * @param {string} color
   * @param {string} duration
   * @param {string} createdBy
   * @param {string} updatedBy
   * @param {string} createdAt
   * @param {string} updatedAt
   */
  constructor(
    id = '',
    clientId = '',
    assignedTo = '',
    title = '',
    description = '',
    date = '',
    endDate = '',
    allDay = false,
    color = '',
    duration = '',
    createdBy = '',
    updatedBy = '',
    createdAt = '',
    updatedAt = '',
  ) {
    this.id = id;
    this.clientId = clientId;
    this.assignedTo = assignedTo;
    this.title = title;
    this.description = description;
    this.allDay = allDay;
    this.date = date;
    this.endDate = endDate;
    this.color = color;
    this.duration = duration;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
