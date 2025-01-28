import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../../../shared/authRequest';
import { TokenPostgresRepository } from '../persistence/postrgres/tokenPostrgresRepository';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

const tokenRepository = new TokenPostgresRepository();

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) : void => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
    }

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Missing Token' });
        return;
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err: any, user: any) => {
        if (err) {
            res.status(403).json({ message: 'Invalid Token' });
            return;
        }

        const tokenInBlacklist = await tokenRepository.verifyToken(token);
        if (!!tokenInBlacklist) {
            res.status(403).json({ message: 'Invalid Token' });
            return;
        }

        req.userId = user.payload || '';
        req.token = token || '';

        next();
    });
};