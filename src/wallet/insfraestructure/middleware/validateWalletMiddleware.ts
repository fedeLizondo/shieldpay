

import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const walletValidator = z.object({
    tag: z.string().optional(),
    chain: z.string().min(1, 'Blockchain chain is required'),
    address: z.string().min(1, 'Address is required').max(255, 'Address must be less than 256 characters'),
});

export const validateWalletMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        walletValidator.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Invalid input',
                errors: error.errors.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}