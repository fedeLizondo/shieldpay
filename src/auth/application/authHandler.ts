import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { User } from "../domain/user";
import { UserNotFoundError } from "../domain/errors/userNotFoundError";
import { response } from "express";
import { UserAlreadyExist } from "../domain/errors/userAlreadyExist";
import { UserRepository } from "../domain/userRepository";
import TokenRepository from "../domain/tokenRepository";


export function authHandler(userRepository: UserRepository, tokenRepository: TokenRepository) {
    return {
        async signIn(email, password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userRepository.findByEmailAndPassword(email, hashedPassword);
            if (!user) {
                throw new UserNotFoundError();
            }
            return await tokenRepository.generateToken(user.id);
        },

        async signUp(email, password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const registered = await userRepository.findByEmailAndPassword(email, hashedPassword);
            if (!!registered) {
                throw new UserAlreadyExist();
            }

            const user = new User(randomUUID(), email, hashedPassword);
            return await userRepository.save(user);

        },

        async signOut(userId: string, token: string) {
            await tokenRepository.invalidateToken(token, userId);
            return;
        }
    };
}