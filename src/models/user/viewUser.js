export default class ViewUser {
  id = '';
  email = '';
  details = null;
  firstName = '';
  lastName = '';
  phoneNumber = '';
  birthDate = '';
  description = '';
  statusId = '';
  statusName = '';
  roleId = '';
  roleName = '';
  createdAt = '';
  updatedAt = '';

  constructor(
    id = '',
    email = '',
    firstName = '',
    lastName = '',
    phoneNumber = '',
    birthDate = '',
    description = '',
    statusId = '',
    statusName = '',
    roleId = '',
    roleName = '',
    createdAt = '',
    updatedAt = '',
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.description = description;
    this.statusId = statusId;
    this.statusName = statusName;
    this.roleId = roleId;
    this.roleName = roleName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
