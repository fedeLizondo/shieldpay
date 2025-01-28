import { Router } from "express";
import { createWallet, deleteWallet, getWallet, getWallets, updateWallet } from "./walletController";
import { authenticateJWT } from "../../auth/infraestructure/middleware/authMiddleware";
import { validateWalletMiddleware } from "./middleware/validateWalletMiddleware";

const walletRoutes = Router();

walletRoutes.get('/api/v1/wallets', authenticateJWT, getWallets);
walletRoutes.get('/api/v1/wallets/:id', authenticateJWT, getWallet);
walletRoutes.post('/api/v1/wallets', validateWalletMiddleware, authenticateJWT, createWallet);
walletRoutes.put('/api/v1/wallets/:id', validateWalletMiddleware, authenticateJWT, updateWallet);
walletRoutes.delete('/api/v1/wallets/:id', authenticateJWT, deleteWallet);

export default walletRoutes;