import { randomUUID } from "crypto";
import { AddressAlreadyExistError } from "../domain/errors/addressAlreadyExistError";
import { Wallet } from "../domain/wallet";
import { WalletRepository } from "../domain/walletRepository";

export function walletHandler(walletRepository: WalletRepository) {
    return {
        async getWallets(userId: string) {
            return await walletRepository.findByUserId(userId);
        },

        async createWallet(userId: string, tag: string | null, chain: string, address: string) {
            const wallet = await walletRepository.findByAddress(address);
            if (!!wallet && wallet.chain === chain) {
                throw new AddressAlreadyExistError();
            }
            const newWallet = new Wallet(randomUUID(), userId, tag, chain, address);
            return await walletRepository.save(newWallet);
        },

        async getWallet(walletId: string) {
            return await walletRepository.findById(walletId);
        },

        async updateWallet(wallet: Wallet) {
            const walletUser = await walletRepository.findById(wallet.id);
            if (!walletUser) {
                throw new AddressAlreadyExistError();
            }

            return await walletRepository.update({
                id: walletUser.id,
                userId: walletUser?.userId,
                tag: wallet?.tag,
                address: wallet.address,
                chain: wallet.chain
            });
        },
        
        async deleteWallet(wallet: string) {
            return await walletRepository.delete(wallet);
        }
    };

}