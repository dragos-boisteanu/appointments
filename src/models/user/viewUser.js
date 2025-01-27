export default class ViewUser {
  id = '';
  email = '';
  details = null;
  firstName = '';
  lastName = '';
  fullName = '';
  phoneNumber = '';
  birthDate = '';
  description = '';
  statusId = '';
  statusName = '';
  roleId = '';
  roleName = '';
  roleColor = '';
  createdAt = '';
  updatedAt = '';

  constructor(
    id = '',
    email = '',
    firstName = '',
    lastName = '',
    fullName = '',
    phoneNumber = '',
    birthDate = '',
    description = '',
    statusId = '',
    statusName = '',
    roleId = '',
    roleName = '',
    roleColor = '',
    createdAt = '',
    updatedAt = '',
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.description = description;
    this.statusId = statusId;
    this.statusName = statusName;
    this.roleId = roleId;
    this.roleName = roleName;
    this.roleColor = roleColor;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
