import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../../../shared/authRequest';
import { TokenPostgresRepository } from '../persistence/postrgres/tokenPostrgresRepository';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

const tokenRepository = new TokenPostgresRepository();

export const authenticateJWT = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Missing Token' });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }

        const tokenInBlacklist = await tokenRepository.verifyToken(token);
        if (!!tokenInBlacklist) {
            return res.status(403).json({ message: 'Invalid Token' });
        }

        req.userId = user.payload;
        req.token = token;

        next();
    });
};