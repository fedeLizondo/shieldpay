import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/ormconfig";
import { User } from "../../../domain/user";
import { UserRepository } from "../../../domain/userRepository";
import { UserEntity } from "./entity/userEntity";
import { UUID } from "crypto";

export class userPostrgresRepository implements UserRepository {
    private repository: Repository<UserEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(UserEntity);
    }

    async findById(id: string): Promise<User | null> {
        return this.repository.findOne({ where: { id } }).then((user) => {
            if (!user) return null;
            return new User(user.id as UUID, user.email, user.password);
        });
    }

    async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } }).then((user) => {
            if (!user) return null;
            return new User(user.id as UUID, user.email, user.password);
        });
    }

    async save(user: User): Promise<User> {
        return this.repository.save(user).then((user) => {
            return new User(user.id, user.email, user.password);
        });
    }
}