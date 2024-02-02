export default class ViewUser {
  id = '';
  email = '';
  details = null;
  status = null;
  role = null;
  createdAt = '';
  updatedAt = '';

  /**
   *
   * @param {string} id
   * @param {string} email
   * @param {UserDetails} details
   * @param {UserStatus} status
   * @param {Role} role
   * @param {string} createdAt
   * @param {string}updatedAt
   */
  constructor(
    id,
    email,
    details,
    status,
    role,
    createdAt,
    updatedAt,
  ) {
    this.id = id;
    this.email = email;
    this.details = details;
    this.status = status;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
