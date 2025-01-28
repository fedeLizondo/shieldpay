import { Response } from "express";
import { AuthRequest } from "../../shared/authRequest";
import { walletHandler } from "../application/walletHandler";
import { WalletPostgresRepository } from "./persistence/postgres/walletPostgresRepository";
import { AddressAlreadyExistError } from "../domain/errors/addressAlreadyExistError";

const walletService = walletHandler(new WalletPostgresRepository());

export async function createWallet(req: AuthRequest, res: Response) {
    const { tag, chain, address } = req.body;
    const { userId } = req;
    try {
        const wallet = await walletService.createWallet(userId || '', tag, chain, address);
        res.status(201).json(wallet);
    } catch (error) {
        if (error instanceof AddressAlreadyExistError) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export async function getWallets(req: AuthRequest, res: Response) {
    const { userId } = req;
    const wallets = await walletService.getWallets(userId || '');
    res.status(200).json(wallets);
}


export async function getWallet(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { userId } = req;

    const wallet = await walletService.getWallet(id);

    if (!wallet || wallet.userId !== userId) {
        res.status(404).json({ message: 'Wallet not found' });
    } else {
        res.status(200).json(wallet);
    }
}

export async function updateWallet(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { tag, chain, address } = req.body;
    const { userId } = req;

    const wallet = await walletService.getWallet(id);

    if (!wallet || wallet.userId !== userId) {
        res.status(404).json({ message: 'Wallet not found' });
    } else {
        await walletService.updateWallet({
            id,
            userId,
            tag,
            chain,
            address
        });
        res.status(204).end();
    }
}

export async function deleteWallet(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { userId } = req;

    const wallet = await walletService.getWallet(id);

    if (!wallet || wallet.userId !== userId) {
        res.status(404).json({ message: 'Wallet not found' });
    } else {
        await walletService.deleteWallet(id);
        res.status(204).end();
    }
}