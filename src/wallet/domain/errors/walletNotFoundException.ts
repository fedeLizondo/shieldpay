export class WalletNotFoundException extends Error {
  constructor() {
    super("Wallet not found");
  }
}