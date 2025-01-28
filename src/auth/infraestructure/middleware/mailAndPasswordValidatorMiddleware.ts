import { NextFunction, Request, Response } from "express";

import { z } from 'zod';

const userSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const mailAndPasswordValidator = (req: Request, res: Response, next: NextFunction) => {
    try {
        userSchema.parse(req.body);

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
};