export default class User {
  id = '';
  email = '';
  roleId = '';
  statusId = '';
  details = null;
  createdAt = '';
  updatedAt = '';

  /**
   * @param {string} id
   * @param {string} email
   * @param {string} roleId
   * @param {string} statusId
   * @param {UserDetails} details
   * @param {string} createdAt
   * @param {string} updatedAt
   */
  constructor(
    id,
    email,
    roleId,
    statusId,
    details,
    createdAt,
    updatedAt,
  ) {
    this.id = id;
    this.email = email;
    this.roleId = roleId;
    this.statusId = statusId;
    this.details = details;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
