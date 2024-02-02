/**
 * @typedef {Object} Person
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} phoneNumber
 * @property {string} birthDate
 * @property {string} description
 */
export default class UserDetails {
  firstName = '';
  lastName = '';
  phoneNumber = '';
  birthDate = '';
  description = '';

  constructor(
    firstName,
    lastName,
    phoneNumber,
    birthDate,
    description,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.description = description;
  }
}
