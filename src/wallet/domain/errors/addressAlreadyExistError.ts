export class AddressAlreadyExistError extends Error {
  constructor() {
    super("Address already exist");
  }
}