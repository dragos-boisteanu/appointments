export default class UsersFilter {
  name = '';
  phoneNumber = '';
  email = '';
  roleId = '';
  statusId = '';
  page = 0;

  /**
   *
   * @param {string} name
   * @param {string} phoneNumber
   * @param {string} email
   * @param {string} roleId
   * @param {string} statusId
   * @param {number} page
   */
  constructor(name, phoneNumber, email, roleId, statusId, page) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.roleId = roleId;
    this.statusId = statusId;
    this.page = page;
  }
}
