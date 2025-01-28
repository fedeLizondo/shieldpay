import TokenRepository from "../../../domain/tokenRepository";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/ormconfig";

import jwt from 'jsonwebtoken';
import { TokenEntity } from "./entity/tokenEntity";
import { randomUUID } from "crypto";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';

export class TokenPostgresRepository implements TokenRepository {
    private repository: Repository<TokenEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(TokenEntity);
    }

    async generateToken(payload: any): Promise<string> {
        return jwt.sign({ payload }, ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });
    }

    async verifyToken(token: string): Promise<any> {
        return await this.repository.findOne({ where: { token } });
    }

    async invalidateToken(token: string, userId: string): Promise<void> {

        const tokenEntity = new TokenEntity();
        tokenEntity.id = randomUUID();
        tokenEntity.deletedAt = new Date()
        tokenEntity.userId = userId
        tokenEntity.token = token

        const tokenNeEntity = await this.repository.save(tokenEntity);
        return;
    }
}