import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/ormconfig";
import { WalletRepository } from "../../../domain/walletRepository";
import { WalletEntity } from "./entity/walletEntity";
import { Wallet } from "../../../domain/wallet";

export class WalletPostgresRepository implements WalletRepository {
    private repository: Repository<WalletEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(WalletEntity);
    }

    async findByUserId(userId: string) {
        return (await this.repository.find({ where: { user: userId } })).map(wallet => new Wallet(wallet.id, wallet.user, wallet.tag, wallet.chain, wallet.address));
    }

    async save(wallet: Wallet) {
        const walletEntity = new WalletEntity();
        walletEntity.id = wallet.id;
        walletEntity.user = wallet.userId;
        walletEntity.tag = wallet.tag;
        walletEntity.chain = wallet.chain;
        walletEntity.address = wallet.address;
        await this.repository.save(walletEntity);
    }

    async findById(walletId: string) {
        return this.repository.findOne({ where: { id: walletId } }).then(wallet => {
            if (!wallet) {
                return null
            }
            return new Wallet(wallet.id, wallet.user, wallet.tag, wallet.chain, wallet.address)
        });
    }

    async findByAddress(address: string): Promise<Wallet | null> {
        const wallet = await this.repository.findOne({ where: { address } });
        if (!wallet) {
            return null;
        }
        return new Wallet(wallet.id, wallet.user, wallet.tag, wallet.chain, wallet.address);
    }

    async update(wallet: Wallet) {
        const walletEntity = new WalletEntity();
        walletEntity.id = wallet.id;
        walletEntity.user = wallet.userId;
        walletEntity.tag = wallet.tag;
        walletEntity.chain = wallet.chain;
        walletEntity.address = wallet.address;
        await this.repository.update(wallet.id, walletEntity);
    }

    async delete(walletId: string) {
        if (!await this.repository.findOne({ where: { id: walletId } })) {
            return;
        }

        await this.repository.delete(walletId);
    }
}