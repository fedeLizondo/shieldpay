import { Wallet } from "./wallet";

export interface WalletRepository {
    findByUserId(userId: string): Promise<Wallet[]>;
    save(wallet: Wallet): Promise<void>;
    findById(walletId: string): Promise<Wallet | null>;
    findByAddress(address: string): Promise<Wallet | null>;
    update(wallet: Wallet): Promise<void>;
    delete(walletId: string): Promise<void>;
}