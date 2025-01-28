import { User } from "./user";

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmailAndPassword(email: string, password: string): Promise<User | null>;
    save(user: User): Promise<User>;
}